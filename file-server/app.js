const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir)
  },
  filename: function (req, file, cb) {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    )
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed!'), false)
    }
  }
})

// Set up CORS
const corsOptions = {
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow credentials for CORS
}

app.use(cors(corsOptions))

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'File server is running',
    timestamp: new Date().toISOString()
  })
})

// Image upload endpoint - handle both 'file' and 'file[]' field names
app.post('/files/upload', upload.any(), (req, res) => {
  try {
    console.log('Upload request received at:', new Date().toISOString())
    console.log('Files received:', req.files)
    console.log('Body:', req.body)

    // Handle both single file and array of files
    const file = req.files && req.files.length > 0 ? req.files[0] : null

    if (!file) {
      console.log('No file in request')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileUrl = `http://localhost:3001/uploads/${file.filename}`
    console.log('File uploaded successfully:', fileUrl)

    // Return in the format expected by GrapesJS Asset Manager
    res.json({
      data: [fileUrl]
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed', details: error.message })
  }
})

// Alternative endpoint for API compatibility
app.post('/api/upload', upload.any(), (req, res) => {
  try {
    console.log('API Upload request received at:', new Date().toISOString())
    console.log('Files received:', req.files)

    const file = req.files && req.files.length > 0 ? req.files[0] : null

    if (!file) {
      console.log('No file in request')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileUrl = `http://localhost:3001/uploads/${file.filename}`
    console.log('File uploaded successfully:', fileUrl)

    res.json({
      data: [fileUrl]
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Upload failed', details: error.message })
  }
})

// Error handling middleware for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' })
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        error: 'Unexpected field name',
        details: `Received field: ${error.field}. Expected: file or file[]`
      })
    }
  }

  if (error.message === 'Only image files are allowed!') {
    return res.status(400).json({ error: 'Only image files are allowed' })
  }

  console.error('Server error:', error)
  res.status(500).json({ error: 'Internal server error' })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`File server is running on http://localhost:${PORT}`)
  console.log(`Upload endpoint: http://localhost:${PORT}/files/upload`)
  console.log(`Static files: http://localhost:${PORT}/uploads/`)
  console.log(`Health check: http://localhost:${PORT}/health`)
})
