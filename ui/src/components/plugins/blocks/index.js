import columns from './columns'
import section from './section'

export default (editor, options = {}) => {
  options = {
    category: 'Basic',
    categoryLayout: 'Layout',
    ...options
  }
  section(editor, options)
  columns(editor, options)
}
