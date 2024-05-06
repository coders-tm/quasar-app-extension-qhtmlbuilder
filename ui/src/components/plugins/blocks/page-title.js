import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'page-title'
  const componentName = 'Page Title'
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
        attributes: { class: type + ' ct-page-title-row-6' },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <div class="ct-page-title-row-inner">
              <div class="container">
                  <div class="row align-items-center">
                      <div class="col-lg-12">
                          <div class="page-title-heading">
                              <h2 class="title">Page Title</h2>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1920 332v1257H0V332h1920Zm-115 114H115v1032h1690V446Zm-574 683v113H409v-113h822Zm275-226v113H409V903h1097Zm-275-226v113H409V677h822Z" fill-rule="evenodd"></path> </g></svg>',
    content: { type: type },
    category: category
  })
}
