# File Server

A dedicated file upload server for QHtmlBuilder that handles image uploads and serves static files.

## Features

- Image file uploads with validation
- Automatic file naming with timestamps
- Static file serving
- CORS support
- Error handling
- Health check endpoint

## Installation

```bash
yarn install
```

## Usage

### Development
```bash
yarn dev
```

### Production
```bash
yarn start
```

## Endpoints

- `POST /api/upload` - Upload files
- `GET /uploads/:filename` - Serve uploaded files
- `GET /health` - Health check

## Configuration

- **Port**: 3001 (configurable via PORT environment variable)
- **Upload directory**: `./uploads`
- **File size limit**: 10MB
- **Allowed file types**: Images only
- **CORS origin**: http://localhost:8080

## Environment Variables

- `PORT` - Server port (default: 3001)

## File Structure

```
file-server/
├── app.js          # Main server file
├── package.json    # Dependencies and scripts
├── uploads/        # Uploaded files directory (auto-created)
└── README.md       # This file
```
