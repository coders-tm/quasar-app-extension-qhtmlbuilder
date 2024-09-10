import { isComponent } from '../../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'icon-box5'
  const componentName = 'Icon Box 5'
  const defaultType = Components.getType('default')

  // Define custom component properties and traits
  Components.addType(type, {
    // You can update the isComponent logic or leave the one from `some-component`
    isComponent: (el) => isComponent(el, type),
    extend: 'default',
    model: {
      defaults: {
        ...defaultType.model.prototype.defaults,
        'custom-name': componentName,
        attributes: { class: type },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <div class="featured-icon-box left-icon icon-align-top style11 bg-white">
            <div class="featured-icon">
              <div class="ct-icon ct-icon--onlytxt ct-icon--primary ct-icon--lg">
                <i class="fa fa-check-square"></i>
              </div>
            </div>
            <div class="featured-content">
              <div class="featured-title pb-15">
                <h2 class="title">653</h2>
              </div>
            </div>
            <div class="featured-desc">Best Abs Ever, and more in the club with room to move for safety or on-demand on the
              Gimmer app.</div>
            <a class="btn btn-inline btn--md btn--primary mt-15" href="javascript:void(0);"
              tabindex="0">VIEW MORE<i class="fa fa-angle-double-right ml-10"></i></a>
          </div>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>',
    content: { type: type },
    category: category
  })
}
