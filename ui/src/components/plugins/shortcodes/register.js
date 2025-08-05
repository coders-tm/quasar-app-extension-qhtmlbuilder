import { isShortcodeComponent } from '../utils'

export default (editor, options = {}) => {
  const { type, name, traits, media, category } = options
  const { Blocks, Components } = editor
  const defaultType = Components.getType('shortcode')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => isShortcodeComponent(el, type),
    extend: 'shortcode',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': name,
        content: `[${type}]`,
        traits: [...traits, ...defaultType.model.prototype.defaults.traits]
      }
    },
    view: defaultType.view.prototype
  })

  // Create a block for the contact form component
  Blocks.add(`${type}-block`, {
    label: name,
    media,
    content: { type: type },
    category
  })
}
