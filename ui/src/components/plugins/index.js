import _default from './default'
import blocks from './blocks'
import layouts from './layouts'
import navbar from './navbar'
import shortcodes from './shortcodes'
import templateManager from './template-manager'
import notify from './notify'
import styleEditor from './style-editor'
import { category } from '../config'

export default (editor, opt = {}) => {
  const options = {
    category: category.Basic,
    categoryLayout: category.Layout,
    headers: [
      {
        type: 'select',
        name: 'layout',
        label: 'Layout',
        changeProp: 1,
        options: [{ id: '', label: 'Select' }],
        default: ''
      }
    ],
    footers: [
      {
        type: 'select',
        name: 'layout',
        label: 'Layout',
        changeProp: 1,
        options: [
          { id: '', label: 'Select' },
          { id: 'default', label: 'Default' }
        ],
        default: ''
      }
    ],
    shortcodes: true,
    layouts: true,
    navbar: true,
    announcementsTraits: [],
    blogsTraits: [],
    productsTraits: [],
    plansTratis: [],
    calendarTraits: [],
    openingTimesTraits: [],
    contactForms: [],
    contactFormsTraits: [],
    styleEditor: {
      codeViewerConfig: {},
      styleLabel:
        '<div style="margin-bottom: 10px; font-size: 13px;">Edit your CSS and click Update</div>'
    },
    ...opt
  }

  notify(editor, options)

  styleEditor(editor, options.styleEditor)

  _default(editor, options)

  if (options.layouts) {
    layouts(editor, { ...options, category: options.categoryLayout })
  }

  if (options.shortcodes) {
    shortcodes(editor, { ...options, category: category.ShortCodes })
  }

  if (options.navbar) {
    navbar(editor, { ...options, category: category.Extra })
  }

  templateManager(editor, options)

  blocks(editor, options)

  editor.I18n.addMessages({
    en: {
      styleManager: {
        properties: {
          'background-repeat': 'Repeat',
          'background-position': 'Position',
          'background-attachment': 'Attachment',
          'background-size': 'Size'
        }
      }
    }
  })
}
