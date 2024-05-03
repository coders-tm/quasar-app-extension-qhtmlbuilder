import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'widget-menu'
  const componentName = 'Widget Menu'
  const defaultType = Components.getType('default')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => {
      if (isComponent(el, type)) {
        return { type }
      }
    },
    extend: 'default',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': componentName,
        attributes: { class: type },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <div class="widget widget_nav_menu clearfix">
            <h3 class="widget-title">Information</h3>
            <ul id="menu-footer-quick-links" class="menu">
              <li>
                <a href="javascript:void(0);">About Us</a>
              </li>
              <li>
                <a href="javascript:void(0);">Privacy Policy</a>
              </li>
              <li>
                <a href="javascript:void(0);">Pricing Plans</a>
              </li>
              <li>
                <a href="javascript:void(0);">Courses</a>
              </li>
              <li>
                <a href="javascript:void(0);">Weight Loss</a>
              </li>
              <li>
                <a href="javascript:void(0);">Clients</a>
              </li>
              <li>
                <a href="javascript:void(0);">Customers</a>
              </li>
              <li>
                <a href="javascript:void(0);">Our Trainers</a>
              </li>
              <li>
                <a href="javascript:void(0);">Diet Chart</a>
              </li>
            </ul>
          </div>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
    content: { type: type },
    category: category
  })
}
