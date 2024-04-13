<template>
  <q-page>
    <QHtmlBuilder ref="editor" :config="config" />
  </q-page>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const editor = ref(null)

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

onMounted(() => {
  editor.value.addRemote({
    async load() {
      return await loadData(1)
    },

    async store(data) {
      return await storeData(1, data)
    }
  })
})
</script>