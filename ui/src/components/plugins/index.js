import _default from './default'
import blocks from './blocks'
import layouts from './layouts'
import navbar from './navbar'
import shortcodes, { shortcodeOptions } from './shortcodes'
import templateManager from './template-manager'
import notify from './notify'
import styleEditor from './style-editor'
import { category, categories } from '../config'

const { Layout, Basic, ShortCodes, Extra, CustomBlocks } = category

export default (editor, opt = {}) => {
  const options = {
    category: Basic,
    categoryLayout: Layout,
    layouts: { category: Layout },
    navbar: { category: Extra },
    styleEditor: {
      codeViewerConfig: {},
      styleLabel:
        '<div style="margin-bottom: 10px; font-size: 13px;">Edit your CSS and click Update</div>'
    },
    categories,
    ...opt
  }

  const { Blocks } = editor

  notify(editor, options)

  styleEditor(editor, options.styleEditor)

  _default(editor, options)

  if (options.layouts) {
    layouts(editor, options.layouts)
  }

  if (options.shortcodes) {
    shortcodes(editor, {
      ...shortcodeOptions,
      category: ShortCodes,
      ...options.shortcodes
    })
  }

  if (options.navbar) {
    navbar(editor, { ...options, category: Extra })
  }

  templateManager(editor, { ...options, category: CustomBlocks })

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

  editor.on('block:category:update', ({ category, changes }) => {
    try {
      const current = category.getLabel()
      if ('open' in changes && changes.open) {
        const categories = Blocks.getCategories()
        categories
          .filter((e) => e.get('open') && e.getLabel() !== current)
          .forEach((e) => {
            e.set('open', false)
          })
      }
    } catch (error) {
      console.error(error)
    }
  })

  editor.onReady(() => {
    try {
      const categories = options.categories

      // Get all blocks from BlockManager
      const defaultBlocks = Blocks.getAll()

      // Convert the blocks to an array if they aren't already
      const blocksArray = [...defaultBlocks.models] // Extract block models from the collection

      // Sort blocks based on category array
      const sortedBlocks = blocksArray.sort((a, b) => {
        const indexA = categories.indexOf(a.attributes.category.id)
        const indexB = categories.indexOf(b.attributes.category.id)

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

      Blocks.render(sortedBlocks)

      // change category open based on config
      const Categories = Blocks.getCategories()

      Categories.forEach((element) => {
        const name = element.get('label')
        element.set('open', categories[0] === name || false)
      })
    } catch (error) {
      console.error(error)
    }
  })
}
