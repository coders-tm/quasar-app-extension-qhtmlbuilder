import { styleManager } from './config'
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import grapesjs from 'grapesjs'
import webpage from 'grapesjs-preset-webpage'
import forms from 'grapesjs-plugin-forms'
// import ckeditor from "grapesjs-plugin-ckeditor";
// import postCss from 'grapesjs-parser-postcss';
import blocksBasic from 'grapesjs-blocks-basic'
import countdown from 'grapesjs-component-countdown'
import pluginExport from 'grapesjs-plugin-export'
import tabs from 'grapesjs-tabs'
import customCode from 'grapesjs-custom-code'
import touch from 'grapesjs-touch'
import tooltip from 'grapesjs-tooltip'
import imageEditor from 'grapesjs-tui-image-editor'
import typed from 'grapesjs-typed'
import styleBg from 'grapesjs-style-bg'
import navbar from 'grapesjs-navbar'

export const defaultConfig = {
  fromElement: true,
  showOffsets: true,
  assetManager: {
    embedAsBase64: true,
    assets: []
  },
  selectorManager: { componentFirst: true },
  styleManager
}

export default {
  name: 'QHtmlBuilder',
  props: {
    config: Object // Configuration options for GrapesJS
  },
  setup(props, { attrs, expose }) {
    const editorRef = ref(null)
    let editor = null

    onMounted(() => {
      // Initialize GrapesJS editor when the component is mounted
      if (!editorRef.value) return

      editor = grapesjs.init({
        container: editorRef.value,
        ...defaultConfig,
        ...props.config,
        plugins: [
          blocksBasic,
          forms,
          // ckeditor,
          navbar,
          countdown,
          pluginExport,
          tabs,
          customCode,
          touch,
          // postCss,
          tooltip,
          imageEditor,
          typed,
          styleBg,
          webpage
        ],
        pluginsOpts: {
          [blocksBasic]: { flexGrid: true },
          [tabs]: { tabsBlock: { category: 'Extra' } },
          [imageEditor]: {
            script: [
              'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
            ],
            style: [
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css'
            ]
          },
          [typed]: {
            block: {
              category: 'Extra',
              content: {
                type: 'typed',
                'type-speed': 40,
                strings: ['Text row one', 'Text row two', 'Text row three']
              }
            }
          },
          [webpage]: {
            modalImportTitle: 'Import Template',
            modalImportLabel:
              '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
            modalImportContent: function (editor) {
              return editor.getHtml() + '<style>' + editor.getCss() + '</style>'
            }
          }
        }
      })
    })

    onBeforeUnmount(() => {
      // Destroy GrapesJS editor when the component is destroyed
      editor.destroy()
    })

    const loadProjectData = (data) => {
      editor.loadProjectData(data)
    }

    const addRemote = (options) => {
      const { Storage } = editor
      Storage.add('remote', options)
    }

    expose({
      editor,
      addRemote,
      loadProjectData
    })

    return () => h('div', { ref: editorRef, ...attrs })
  }
}
