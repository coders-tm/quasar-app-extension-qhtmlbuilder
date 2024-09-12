import { defaultTraits, isShortcodeComponent } from '../utils'

export default (editor, options = {}) => {
  const { plansTratis, category } = options
  const { Blocks, Components } = editor
  const type = 'plans'
  const componentName = 'Plans'
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
        attributes: {
          class: type
        },
        content: `[${type}]`,
        traits: [
          ...defaultTraits,
          ...plansTratis,
          ...defaultType.model.prototype.defaults.traits
        ]
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

  // Create a block for the Plans component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M256 48c0-26.5 21.5-48 48-48H592c26.5 0 48 21.5 48 48V464c0 26.5-21.5 48-48 48H381.3c1.8-5 2.7-10.4 2.7-16V253.3c18.6-6.6 32-24.4 32-45.3V176c0-26.5-21.5-48-48-48H256V48zM571.3 347.3c6.2-6.2 6.2-16.4 0-22.6l-64-64c-6.2-6.2-16.4-6.2-22.6 0l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L480 310.6V432c0 8.8 7.2 16 16 16s16-7.2 16-16V310.6l36.7 36.7c6.2 6.2 16.4 6.2 22.6 0zM0 176c0-8.8 7.2-16 16-16H368c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V176zm352 80V480c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V256H352zM144 320c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H144z"/></svg>',
    content: { type: type },
    category: category
  })
}
