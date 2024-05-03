import sectionTitle from './section-title'
import iconBox from './icon-box'
import buttonLink from './button-link'
import icon from './icon'
import team from './team'
import widget from './widget'

export default (editor, options = {}) => {
  sectionTitle(editor, options)
  icon(editor, options)
  iconBox(editor, options)
  buttonLink(editor, options)
  team(editor, options)
  widget(editor, options)
}
