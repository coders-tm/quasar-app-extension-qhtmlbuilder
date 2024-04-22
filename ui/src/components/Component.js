import { styleManager } from './config'
import { h, ref, onMounted, onBeforeUnmount } from 'vue'
import { Dialog } from 'quasar'
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
import pages from 'grapesjs-pages'

const plugin = (editor) => {
  const componentType = 'header' // Type of the component
  const componentName = 'Header' // Name of the component

  // Define the component model
  editor.DomComponents.addType(componentType, {
    // Define HTML template for the component
    model: {
      defaults: {
        traits: [
          // Define traits for logo, menus, and sticky
          { type: 'text', name: 'logoSrc', label: 'Logo URL' },
          {
            type: 'array',
            name: 'menus',
            label: 'Menus',
            // Define the children of the array (menu items)
            childType: 'menu-item',
            // Define labels for the children
            labels: [
              { name: 'label', label: 'Label' },
              { name: 'url', label: 'URL' }
            ]
          },
          { type: 'checkbox', name: 'sticky', label: 'Sticky' }
        ],
        // Define the initial structure of the component
        content: `
          <header>
            <div class="logo"><img src="{[ logoSrc ]}" alt="Logo"></div>
            <nav>
              <ul>
                {[ menus.map((menu) =>'<li><a href="{[ menu.url ]}">{[ menu.label ]}</a></li>').join('') ]}
              </ul>
            </nav>
          </header>
        `
      }
    }
  })

  // Define how the component looks in the editor
  editor.BlockManager.add(componentType, {
    label: componentName,
    content: {
      type: componentType
    }
  })

  // Make the component responsive
  editor.on('component:add', (component) => {
    if (component.get('type') === componentType) {
      // Define responsive rules for the component
      // component.addDevice('desktop')
      // component.addDevice('tablet')
      // component.addDevice('mobile')
      // You can define CSS rules for each device to adjust the layout as needed
    }
  })
}

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
    pages: Array
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
          tooltip,
          imageEditor,
          typed,
          styleBg,
          webpage,
          pages,
          plugin
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

      Pages = editor.Pages

      if (props.config?.layerManager?.appendTo) {
        editor.Panels.removeButton('views', { id: 'open-layers' })
      }

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
        h('div', {
          id: 'htmlbuilder__left-panel',
          class: 'htmlbuilder__left-panel'
        }),
        h('div', {
          id: 'htmlbuilder__editor',
          class: 'htmlbuilder__editor',
          ref: editorRef
        })
      ])
  }
}
