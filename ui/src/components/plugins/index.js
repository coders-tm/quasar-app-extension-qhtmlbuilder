import _default from './default'
import blocks from './blocks'
import layouts from './layouts'
import navbar from './navbar'
import shortcodes from './shortcodes'
import templateManager from './template-manager'
import notify from './notify'
import styleEditor from './style-editor'

const category = ['Layout', 'Basic', 'Short Codes']

export default (editor, opt = {}) => {
  const options = {
    category: 'Basic',
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

  const { BlockManager } = editor

  notify(editor, options)

  styleEditor(editor, options.styleEditor)

  _default(editor, options)

  if (options.layouts) {
    layouts(editor, options)
  }

  if (options.shortcodes) {
    shortcodes(editor, options)
  }

  if (options.navbar) {
    navbar(editor, options)
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

  // Get all blocks from BlockManager
  const defaultBlocks = BlockManager.getAll()

  // Convert the blocks to an array if they aren't already
  const blocksArray = [...defaultBlocks.models] // Extract block models from the collection

  // Sort blocks based on category array
  const sortedBlocks = blocksArray.sort((a, b) => {
    const indexA = category.indexOf(a.attributes.category.id)
    const indexB = category.indexOf(b.attributes.category.id)

    // If both categories are in the category array, sort by their index
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB
    }

    // If only one of the categories is in the category array, sort it first
    if (indexA !== -1) return -1
    if (indexB !== -1) return 1

    // If neither category is in the array, keep the original order
    return 0
  })

  // updated new blocks to block manager
  editor.config.blockManager.blocks = sortedBlocks

  // BlockManager.constructor(editor)
}
