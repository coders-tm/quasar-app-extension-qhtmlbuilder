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
  storageManager: false,
  // CSS or a JSON of styles
  style: '.my-el { color: red }',
  // HTML string or a JSON of components
  components: '<div class="my-el">Hello world!</div>'
}

onMounted(() => {
  //
})
</script>
