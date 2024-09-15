<template>
  <q-page>
    <QHtmlBuilder
      ref="editor"
      :plugins-opts="pluginsOpts"
      :config="config"
      :remote="remote"
    />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { plugins } from 'ui'

const editor = ref(null)

const loadData = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/pages/${id}`)
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
      .put(`/api/pages/${id}`, data)
      .then(({ data }) => {
        resolve(data.data)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
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
  }
}

const pluginsOpts = {
  [plugins]: {
    projects: '/api/projects',
    blocks: '/api/blocks',
    headers: {
      // 'Content-Type': 'application/json',
    },
    shortcodes: {
      loader: (el, shortcode) => {
        el.innerHTML = `<div style="text-align: center; padding: 20px">Loaded: ${shortcode}</div>`
      }
    }
  }
}
</script>
