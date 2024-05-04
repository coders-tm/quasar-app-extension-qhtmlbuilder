import loadBlocks from './blocks'
import loadShortCodes from './shortcodes'
import updateDefault from './update-default'

export default (editor, opt = {}) => {
  const options = {
    category: 'Basic',
    headers: [{ id: 'default', label: 'Default' }],
    footers: [{ id: 'default', label: 'Default' }],
    ...opt
  }

  updateDefault(editor, options)

  loadShortCodes(editor, options)
  loadBlocks(editor, options)
}
