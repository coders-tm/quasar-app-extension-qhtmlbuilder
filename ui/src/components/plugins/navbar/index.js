import component from './component'
import block from './block'

export const navbar = {
  id: 'navbar',
  label: 'Navbar',
  block: {},
  style: '',
  styleAdditional: '',
  classPrefix: 'navbar'
}

export default (editor, options = {}) => {
  component(editor, { ...options, navbar })
  block(editor, { ...options, navbar })
}
