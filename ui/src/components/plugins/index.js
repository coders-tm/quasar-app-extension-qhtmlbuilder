import loadBlocks from './blocks'
import loadShortCodes from './shortcodes'
import updateDefault from './update-default'

export default (editor, opt = {}) => {
  const options = { ...opt, category: 'Basic' }

  updateDefault(editor, options)

  loadShortCodes(editor, options)
  loadBlocks(editor, options)
}
