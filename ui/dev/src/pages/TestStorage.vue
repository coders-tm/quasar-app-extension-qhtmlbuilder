<template>
  <q-page>
    <QHtmlBuilder ref="editor" :config="config" :remote="remote" />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

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
      .get(`http://localhost:3000/projects/${id}`)
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
      .put(`http://localhost:3000/projects/${id}`, data)
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

async function onLoad(payload) {
  return loadTemplates(payload)
}

function onStore(payload) {
  return storeData(payload.id, payload)
    .then(() => {
      return true
    })
    .catch(() => {
      return false
    })
}

function onDelete(payload) {
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
      'https://cdn.coderstm.com/css/styles.min.css'
    ]
  },
  pluginsOpts: {
    templates: {
      onLoad,
      onStore,
      onDelete
    },
    base: {
      headers: [
        { id: 'classic', label: 'Classic' },
        { id: 'overlay', label: 'Overlay' }
      ]
    }
  }
}
</script>
