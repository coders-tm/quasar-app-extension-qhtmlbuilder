import { styleManager, deviceManager } from './config'
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import LayerTitle from './LayerTitle'
import { Dialog } from 'quasar'

// Dynamic imports for client-side only
let grapesjs = null
let webpage = null
let blocksBasic = null
let countdown = null
let pluginExport = null
let tabs = null
let customCode = null
let touch = null
let imageEditor = null
let typed = null
let styleBg = null
let extendDefault = null
let plugins = null

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

// Function to dynamically load GrapesJS and its plugins (client-side only)
async function loadGrapesJSDependencies() {
  if (typeof window === 'undefined') {
    return false // Skip loading on server-side
  }

  if (grapesjs) {
    return true // Already loaded
  }

  try {
    const [
      grapesModule,
      webpageModule,
      blocksBasicModule,
      countdownModule,
      pluginExportModule,
      tabsModule,
      customCodeModule,
      touchModule,
      imageEditorModule,
      typedModule,
      styleBgModule,
      extendDefaultModule,
      pluginsModule
    ] = await Promise.all([
      import('grapesjs'),
      import('grapesjs-preset-webpage'),
      import('grapesjs-blocks-basic'),
      import('grapesjs-component-countdown'),
      import('grapesjs-plugin-export'),
      import('grapesjs-tabs'),
      import('grapesjs-custom-code'),
      import('grapesjs-touch'),
      import('grapesjs-tui-image-editor'),
      import('grapesjs-typed'),
      import('grapesjs-style-bg'),
      import('./plugins/extend-default'),
      import('./plugins')
    ])

    // Assign to module-level variables
    grapesjs = grapesModule.default
    webpage = webpageModule.default
    blocksBasic = blocksBasicModule.default
    countdown = countdownModule.default
    pluginExport = pluginExportModule.default
    tabs = tabsModule.default
    customCode = customCodeModule.default
    touch = touchModule.default
    imageEditor = imageEditorModule.default
    typed = typedModule.default
    styleBg = styleBgModule.default
    extendDefault = extendDefaultModule.default
    plugins = pluginsModule.default

    return true
  } catch (error) {
    console.error('Failed to load GrapesJS dependencies:', error)
    return false
  }
}

export default {
  name: 'QHtmlBuilder',
  props: {
    config: Object, // Configuration options for GrapesJS
    plugins: { type: Array, default: () => [] },
    pluginsOpts: { type: Object, default: () => ({}) }, // Plugins options for GrapesJS
    pages: Array,
    remote: Object,
    custom: Boolean
  },
  setup(props, { attrs, expose, emit }) {
    const editorRef = ref(null)
    const isLoading = ref(true)
    let editor = null
    let Pages = null

    onMounted(async () => {
      if (!editorRef.value) {
        console.error(
          'The editorRef is not initialized. Make sure the QHtmlBuilder component is mounted before accessing the editor instance.'
        )
        return
      }

      if (!props.custom) {
        await render()
      }
      
      // Set loading to false after render is complete
      isLoading.value = false
    })

    onBeforeUnmount(() => {
      try {
        // Destroy GrapesJS editor when the component is destroyed
        if (editor) {
          editor.destroy()
        }
      } catch (error) {
        console.error(error)
      }
    })

    async function render(config = {}) {
      // Skip rendering on server-side
      if (typeof window === 'undefined') {
        console.warn('QHtmlBuilder: Skipping initialization on server-side')
        return null
      }

      const dependenciesLoaded = await loadGrapesJSDependencies()
      if (!dependenciesLoaded) {
        console.error('QHtmlBuilder: Failed to load dependencies')
        return null
      }

      const imageEditorOpts = props.pluginsOpts?.imageEditorOpts || {}
      editor = grapesjs.init({
        container: editorRef.value,
        ...defaultConfig,
        ...props.config,
        ...config,
        plugins: [
          extendDefault,
          blocksBasic,
          countdown,
          pluginExport,
          tabs,
          customCode,
          touch,
          imageEditor,
          typed,
          styleBg,
          webpage,
          plugins,
          ...props.plugins
        ],
        pluginsOpts: {
          [blocksBasic]: {
            flexGrid: true,
            blocks: ['text', 'link', 'image', 'video', 'map']
          },
          [imageEditor]: {
            script: [
              'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
            ],
            style: [
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css'
            ],
            ...imageEditorOpts
          },
          [tabs]: {
            tabsBlock: { category: 'Extra' }
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

      editor.onReady((editor) => {
        emit('ready', editor)
        // Update loading state when editor is ready
        isLoading.value = false
      })

      emit('update:pages', [...Pages.getAll()])

      return editor
    }

    function getEditor() {
      return editor
    }

    function loadProjectData(data) {
      if (!editor) {
        console.warn('QHtmlBuilder: Editor not initialized')
        return
      }
      editor.loadProjectData(data)
    }

    function addRemote(options) {
      if (!editor) {
        console.warn('QHtmlBuilder: Editor not initialized')
        return
      }
      const { Storage } = editor
      Storage.add('remote', options)
    }

    function isSelected(page) {
      if (!Pages) {
        return false
      }
      return Pages.getSelected().id == page.id
    }

    function renamePage(pageId, name) {
      if (!Pages) {
        console.warn('QHtmlBuilder: Pages not initialized')
        return
      }
      const page = Pages.get(pageId)
      return page.setName(name)
    }

    function selectPage(pageId) {
      if (!Pages) {
        console.warn('QHtmlBuilder: Pages not initialized')
        return
      }
      return Pages.select(pageId)
    }

    function removePage(pageId) {
      if (!Pages) {
        console.warn('QHtmlBuilder: Pages not initialized')
        return
      }
      confirm('Are you sure, you want to delete?').then(() => {
        Pages.remove(pageId)
        const pages = [...Pages.getAll()]
        return Pages.select(pages[0].id)
      })
    }

    function addPage() {
      if (!Pages) {
        console.warn('QHtmlBuilder: Pages not initialized')
        return
      }
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
      render,
      getEditor,
      addRemote,
      addPage,
      removePage,
      isSelected,
      selectPage,
      renamePage,
      loadProjectData
    })

    return () => {
      return h(
        'div',
        {
          class: 'htmlbuilder__container',
          style: { height: props.config?.height || '100%' }
        },
        [
          // Always render the same structure, but conditionally show content
          h(
            'div',
            {
              id: 'htmlbuilder__left-panel',
              class: 'htmlbuilder__left-panel gjs-one-bg gjs-two-color',
              style: isLoading.value ? { display: 'none' } : {}
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
            style: isLoading.value ? { 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '14px',
              color: '#666'
            } : {},
            ...attrs
          }, isLoading.value ? 'Loading HTML Builder...' : [])
        ]
      )
    }
  }
}
