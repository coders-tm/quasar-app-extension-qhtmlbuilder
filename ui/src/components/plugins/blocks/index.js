import heading from './heading'
import iconBox from './icon-box'
import buttonLink from './button-link'

export default (editor, options = {}) => {
  heading(editor, options)
  iconBox(editor, options)
  buttonLink(editor, options)
}
