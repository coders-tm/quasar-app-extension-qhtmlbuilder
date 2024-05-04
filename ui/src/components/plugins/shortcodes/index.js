import footer from './footer'
import header from './header'

export default (editor, options = {}) => {
  header(editor, options)
  footer(editor, options)
}
