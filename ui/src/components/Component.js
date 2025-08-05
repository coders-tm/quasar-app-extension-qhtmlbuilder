import { styleManager } from './config'
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import { Dialog } from 'quasar'
import plugins from './plugins'

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
    config: Object, // Configuration options for GrapesJS
    pages: Array,
    remote: Object
  },
  setup(props, { attrs, expose, emit }) {
    const editorRef = ref(null)
    let editor = null
    let Pages = null

    onMounted(async () => {
      // Initialize GrapesJS editor when the component is mounted
      if (!editorRef.value) return

      // Only initialize on client side (browser)
      if (typeof window === 'undefined') return

      // Dynamic imports for client-side only
      const { default: grapesjs } = await import('grapesjs')
      const { default: webpage } = await import('grapesjs-preset-webpage')
      const { default: forms } = await import('grapesjs-plugin-forms')
      const { default: blocksBasic } = await import('grapesjs-blocks-basic')
      const { default: countdown } = await import('grapesjs-component-countdown')
      const { default: pluginExport } = await import('grapesjs-plugin-export')
      const { default: tabs } = await import('grapesjs-tabs')
      const { default: customCode } = await import('grapesjs-custom-code')
      const { default: touch } = await import('grapesjs-touch')
      const { default: imageEditor } = await import('grapesjs-tui-image-editor')
      const { default: typed } = await import('grapesjs-typed')
      const { default: styleBg } = await import('grapesjs-style-bg')
      const { default: templates } = await import('grapesjs-templates')

      // Load GrapesJS CSS dynamically
      if (!document.querySelector('link[href*="grapesjs"]')) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/grapesjs/dist/css/grapes.min.css'
        document.head.appendChild(link)
      }

      editor = grapesjs.init({
        container: editorRef.value,
        ...defaultConfig,
        ...props.config,
        plugins: [
          blocksBasic,
          forms,
          // ckeditor,
          countdown,
          pluginExport,
          tabs,
          customCode,
          touch,
          // postCss,
          // tooltip,
          imageEditor,
          typed,
          styleBg,
          webpage,
          templates,
          plugins
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
          },
          [templates]: { ...pluginOptions('templates') },
          [plugins]: { ...pluginOptions('base') }
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
      // Only destroy if editor exists (client-side only)
      if (editor && typeof window !== 'undefined') {
        editor.destroy()
      }
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

    function pluginOptions(key) {
      try {
        return props.config.pluginsOpts[key]
      } catch (error) {
        return {}
      }
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
        h('div', {
          id: 'htmlbuilder__left-panel',
          class: 'htmlbuilder__left-panel'
        }),
        h('div', {
          id: 'htmlbuilder__editor',
          class: 'htmlbuilder__editor',
          ref: editorRef,
          ...attrs
        })
      ])
  }
}
