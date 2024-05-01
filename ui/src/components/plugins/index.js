import loadBlocks from './blocks'
import loadShortCodes from './shortcodes'

export default (editor, opt = {}) => {
  const options = { ...opt, category: 'Basic' }

  loadShortCodes(editor, options)
  loadBlocks(editor, options)
}
