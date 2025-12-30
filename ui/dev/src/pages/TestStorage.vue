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
import { computed, onMounted, reactive, ref } from 'vue'
import blocks from '../plugins/blocks'

const editor = ref(null)
const shortcodes = reactive({
    loader: (el, shortcode) => {
      el.innerHTML = `<div style="text-align: center; padding: 20px">Loaded: ${shortcode}</div>`
    },
    items: []
  })

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
  },
  assetManager: {
    assets: [],
    embedAsBase64: false,
    uploadName: 'file',
    upload: '/files/upload',
    onUploaded: (editor, response) => {
      editor.assetManager.add(response.data[0])
    }
  }
}

const pluginsOpts = computed(() => ({
  projects: '/api/projects',
  blocks: '/api/blocks',
  headers: {
    // 'Content-Type': 'application/json',
  },
  shortcodes,
  imageEditorOpts: {
    upload: true
  }
}))

onMounted(async () => {
  const _editor = editor.value
  shortcodes.items = [
    {
      type: "header",
      name: "Header",
      media:
        '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800"><path class="cls-1" d="M800,800V220.2S0,220.2,0,220.2v579.8s800,0,800,0ZM48.5,268.7h703v482.8H48.5v-482.8s0,0,0,0Z"/><rect class="cls-1" x="0" width="800" height="153.5"/></svg>',
      traits: [
        {
          type: "select",
          name: "layout",
          label: "Layout",
          changeProp: 1,
          options: [
            { id: "", label: "Select" },
            { id: "classic", label: "Classic" },
            { id: "overlay", label: "Overlay" },
          ],
          default: "",
        },
        {
          type: "select",
          name: "container",
          label: "Container",
          changeProp: 1,
          options: [
            { id: "container", label: "Dense" },
            { id: "container-fluid", label: "Fluid" },
          ],
          default: "container",
        },
        {
          type: "input",
          name: "ctalabel",
          label: "CTA Label",
          changeProp: 1,
          default: "Get Started",
        },
        {
          type: "input",
          name: "ctalink",
          label: "CTA Link",
          changeProp: 1,
          default: "",
        },
      ],
    }
  ]
  const grepes = _editor.render({ canvas: await canvas(), pluginsOpts: pluginsOpts.value })

  console.log('grepes', grepes)
})

const pluginsList = [blocks]
</script>
