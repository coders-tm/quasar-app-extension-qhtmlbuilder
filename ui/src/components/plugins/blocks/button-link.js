import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'button-link'
  const componentName = 'Button Link'
  const defaultType = Components.getType('link')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type }
      }
    },
    extend: 'link',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        tag: 'a',
        'custom-name': componentName,
        attributes: {
          class:
            type +
            ' base-btn base-btn-size-md base-btn-shape-square base-btn-style-fill base-btn-color-skincolor z-index-1',
          href: 'javascript:void(0);'
        },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <span>VIEW MORE</span>
          <i class="fa fa-angle-double-right ml-10"></i>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>',
    content: { type: type },
    category: category
  })
}
