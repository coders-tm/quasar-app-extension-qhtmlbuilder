import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'widget'
  const componentName = 'Widget'
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
        attributes: { class: type + ' widget_text clearfix' },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <div class="footer-logo">
            <img id="footer-logo-img" class="img-center" src="https://placehold.co/311x92" alt="">
          </div>
          <div class="textwidget widget-text">
            <p class="pb-10 pr-30">After you decide to start training we will make sure you get the best fitness
              program.</p>
          </div>
          <div class="order-3">
            <div class="social-icons square">
              <ul class="social-icons list-inline">
                <li>
                  <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="facebook"
                    data-tooltip="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="twitter" data-tooltip="Twitter"
                    target="_blank"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="flickr" data-tooltip="Flickr"
                    target="_blank"><i class="fa fa-flickr"></i></a>
                </li>
                <li>
                  <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="linkedin"
                    data-tooltip="Linkedin" target="_blank"><i class="fa fa-linkedin"></i></a>
                </li>
              </ul>
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
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 64C0 46.3 14.3 32 32 32H80h48c17.7 0 32 14.3 32 32s-14.3 32-32 32H112V208H336V96H320c-17.7 0-32-14.3-32-32s14.3-32 32-32h48 48c17.7 0 32 14.3 32 32s-14.3 32-32 32H400V240 416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H368 320c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V272H112V416h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H80 32c-17.7 0-32-14.3-32-32s14.3-32 32-32H48V240 96H32C14.3 96 0 81.7 0 64z"/></svg>',
    content: { type: type },
    category: category
  })
}
