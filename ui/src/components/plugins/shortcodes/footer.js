import { isShortcodeComponent } from '../utils'

export default (editor, options = {}) => {
  const { footers, category } = options
  const { Blocks, Components } = editor
  const type = 'footer'
  const componentName = 'Footer'
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
        traits: [...footers, ...defaultType.model.prototype.defaults.traits]
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
      '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35 35" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,0v25.366h35V0H0z M32.879,23.245H2.121V2.121h30.758V23.245z"></path> <rect y="28.283" width="35" height="6.717"></rect> </g> </g> </g></svg>',
    content: { type: type },
    category: category
  })
}
