<template>
  <q-page>
    <QHtmlBuilder ref="editor" :config="config" :remote="remote" />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const editor = ref(null)

const loadTemplates = (type) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/${type}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const loadData = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:3000/pages/${id}`)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const storeData = (id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`http://localhost:3000/pages/${id}`, data)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const createProject = (payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`http://localhost:3000/projects`, payload)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

const deleteData = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`http://localhost:3000/projects/${id}`)
      .then(({ data }) => {
        resolve(data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

async function onLoadTemplate(payload) {
  return loadTemplates(payload)
}

function onStoreTemplate(payload) {
  return new Promise((resolve, reject) => {
    createProject(payload)
      .then(() => {
        resolve(true)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function onDeleteTemplate(payload) {
  return deleteData(payload)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

const remote = {
  async load() {
    return await loadData(1)
  },
  async store(data) {
    return await storeData(1, data)
  }
}

const config = {
  height: 'calc(100vh - 50px)',
  storageManager: {
    type: 'remote',
    options: {
      remote: {
        onStore: (data, editor) => {
          const pagesHtml = {
            html: editor.getHtml(),
            css: editor.getCss()
          }
          return { id: 1, data, pagesHtml }
        },
        onLoad: (result) => result.data
      }
    }
  },
  canvas: {
    styles: [
      'https://cdn.coderstm.com/fontawesome/css/all.min.css',
      'https://cdn.coderstm.com/gimmer/css/styles.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap-grid.min.css'
    ]
  },
  pluginsOpts: {
    core: {
      headers: [
        {
          type: 'select',
          name: 'layout',
          label: 'Layout',
          changeProp: 1,
          options: [
            { id: '', label: 'Select' },
            { id: 'classic', label: 'Classic' },
            { id: 'overlay', label: 'Overlay' }
          ],
          default: ''
        },
        {
          type: 'input',
          name: 'menu',
          label: 'Main menu',
          changeProp: 1,
          default: ''
        },
        {
          type: 'input',
          name: 'right',
          label: 'Right menu',
          changeProp: 1,
          default: ''
        }
      ],
      onLoadTemplate,
      onStoreTemplate,
      onDeleteTemplate,
      onLoadShortCode: (el, shortcode) => {
        console.log(el, shortcode)
      }
    }
  }
}
</script>
