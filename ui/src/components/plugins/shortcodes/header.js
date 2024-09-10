import { isShortcodeComponent } from '../utils'

export default (editor, options = {}) => {
  const { headers } = options
  const { Blocks, Components } = editor
  const type = 'header'
  const componentName = 'Header'
  const defaultType = Components.getType('shortcode')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => isShortcodeComponent(el, type),
    extend: 'shortcode',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': componentName,
        content: `[${type}]`,
        traits: [...headers, ...defaultType.model.prototype.defaults.traits]
      },
      handlePropChange() {
        const attributes = this.getShortCodeProps().join(' ')
        const shortcode = `[${type}${attributes ? ` ${attributes}` : ''}]`
        this.set('content', shortcode)
        this.set('shortcode', shortcode)
      }
    },
    view: defaultType.view.prototype
  })

  // Create a block for the contact form component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800"><path class="cls-1" d="M800,800V220.2S0,220.2,0,220.2v579.8s800,0,800,0ZM48.5,268.7h703v482.8H48.5v-482.8s0,0,0,0Z"/><rect class="cls-1" x="0" width="800" height="153.5"/></svg>',
    content: { type: type },
    category: 'Short Codes'
  })
}
