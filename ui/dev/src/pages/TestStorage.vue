<template>
  <q-page>
    <QHtmlBuilder
      custom
      ref="editor"
      :plugins-opts="pluginsOpts"
      :plugins="pluginsList"
      :config="config"
      :remote="remote"
      @ready="ready"
    />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { plugins } from 'ui'
import blocks from '../plugins/blocks'

const editor = ref(null)

const canvas = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ styles: ['https://example.com/css/app.css'] })
    }, 1000)
  })
}

const ready = (editor) => {
  console.log('ready', editor)
}

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

onMounted(async () => {
  const _editor = editor.value
  const grepes = _editor.render({ canvas: await canvas() })
  console.log('grepes', grepes)
})

const pluginsList = [blocks]
</script>
