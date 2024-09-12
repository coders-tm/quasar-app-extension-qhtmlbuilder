import { styleManager, deviceManager } from './config'
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import LayerTitle from './LayerTitle'
import { Dialog } from 'quasar'
import grapesjs from 'grapesjs'
import webpage from 'grapesjs-preset-webpage'
import forms from 'grapesjs-plugin-forms'
import blocksBasic from 'grapesjs-blocks-basic'
import countdown from 'grapesjs-component-countdown'
import pluginExport from 'grapesjs-plugin-export'
import tabs from 'grapesjs-tabs'
import customCode from 'grapesjs-custom-code'
import touch from 'grapesjs-touch'
import imageEditor from 'grapesjs-tui-image-editor'
import typed from 'grapesjs-typed'
import styleBg from 'grapesjs-style-bg'
import plugins from './plugins'
import extendDefault from './plugins/extend-default'

export const defaultConfig = {
  fromElement: true,
  showOffsets: true,
  assetManager: {
    embedAsBase64: true,
    assets: []
  },
  selectorManager: { componentFirst: true },
  layerManager: {
    appendTo: '#htmlbuilder__layers-container'
  },
  styleManager,
  deviceManager
}

export default {
  name: 'QHtmlBuilder',
  props: {
    config: Object, // Configuration options for GrapesJS
    pluginsOpts: { type: Object, default: () => ({}) }, // Plugins options for GrapesJS
    pages: Array,
    remote: Object
  },
  setup(props, { attrs, expose, emit }) {
    const editorRef = ref(null)
    let editor = null
    let Pages = null

    onMounted(() => {
      // Initialize GrapesJS editor when the component is mounted
      if (!editorRef.value) return

      editor = grapesjs.init({
        container: editorRef.value,
        ...defaultConfig,
        plugins: [
          extendDefault,
          blocksBasic,
          forms,
          countdown,
          pluginExport,
          tabs,
          customCode,
          touch,
          imageEditor,
          typed,
          styleBg,
          webpage,
          plugins
        ],
        ...props.config,
        pluginsOpts: {
          [blocksBasic]: {
            flexGrid: true,
            blocks: ['text', 'link', 'image', 'video', 'map']
          },
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
          },
          [styleBg]: {
            styleGradientOpts: {
              colorPicker: (handler) => {
                const el = handler.getEl().querySelector('input')
                editor.$(el).change((event) => {
                  const color = event.target.value
                  handler.setColor(color)
                })
              }
            }
          },
          ...props.pluginsOpts
        }
      })

      if (props.remote) {
        addRemote(props.remote)
      }

      Pages = editor.Pages

      editor.on('page', () => {
        emit('update:pages', [...Pages.getAll()])
      })

      emit('update:pages', [...Pages.getAll()])
    })

    onBeforeUnmount(() => {
      // Destroy GrapesJS editor when the component is destroyed
      editor.destroy()
    })

    function loadProjectData(data) {
      editor.loadProjectData(data)
    }

    function addRemote(options) {
      const { Storage } = editor
      Storage.add('remote', options)
    }

    function isSelected(page) {
      return Pages.getSelected().id == page.id
    }

    function renamePage(pageId, name) {
      const page = Pages.get(pageId)
      return page.setName(name)
    }

    function selectPage(pageId) {
      return Pages.select(pageId)
    }

    function removePage(pageId) {
      confirm('Are you sure, you want to delete?').then(() => {
        Pages.remove(pageId)
        const pages = [...Pages.getAll()]
        return Pages.select(pages[0].id)
      })
    }

    function addPage() {
      const len = Pages.getAll().length
      Pages.add({
        name: `Page ${len + 1}`,
        component: ''
      })
    }

    function confirm(message = 'Would you like to process?') {
      return new Promise((resolve) => {
        Dialog.create({
          title: 'Confirm',
          message,
          cancel: true,
          persistent: true
        }).onOk(() => {
          resolve(true)
        })
      })
    }

    expose({
      editor,
      addRemote,
      addPage,
      removePage,
      isSelected,
      selectPage,
      renamePage,
      loadProjectData
    })

    return () =>
      h('div', { class: 'htmlbuilder__container' }, [
        h(
          'div',
          {
            id: 'htmlbuilder__left-panel',
            class: 'htmlbuilder__left-panel gjs-one-bg gjs-two-color'
          },
          [
            h(LayerTitle, { class: 'htmlbuilder__layers-title' }),
            h('div', {
              id: 'htmlbuilder__layers-container',
              class: 'htmlbuilder__layers-container'
            })
          ]
        ),
        h('div', {
          id: 'htmlbuilder__editor',
          class: 'htmlbuilder__editor',
          ref: editorRef,
          ...attrs
        })
      ])
  }
}
