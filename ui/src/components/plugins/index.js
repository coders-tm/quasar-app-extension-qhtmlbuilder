import _default from './default'
import blocks from './blocks'
import layouts from './layouts'
import navbar from './navbar'
import shortcodes from './shortcodes'
import templateManager from './template-manager'

export default (editor, opt = {}) => {
  const options = {
    category: 'Basic',
    headers: [{ id: 'default', label: 'Default' }],
    footers: [{ id: 'default', label: 'Default' }],
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
    ...opt
  }

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
}
