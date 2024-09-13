import _default from './default'
import blocks from './blocks'
import layouts from './layouts'
import navbar from './navbar'
import shortcodes, { shortcodeOptions } from './shortcodes'
import templateManager from './template-manager'
import notify from './notify'
import styleEditor from './style-editor'
import { category } from '../config'

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
    ...opt
  }

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
    navbar(editor, { ...options, category: category.Extra })
  }

  templateManager(editor, { ...options, category: category.CustomBlocks })

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
