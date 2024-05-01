import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'icon-box-wrapper'
  const componentName = 'Icon Box'
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
          <div class="icon-box-icon">
            <span class="icon">
              <i aria-hidden="true" class="fa far fa-check-square"></i>
            </span>
          </div>
          <div class="icon-box-content">
            <h4 class="icon-box-title">
              <span>Trustworthy</span>
            </h4>
            <p class="icon-box-description">Bacs-approved Bureau with a robust reputation</p>
          </div>
        `,
        styles: `
          @media (min-width: 768px) {
            .icon-box-wrapper,
            .icon-box-wrapper {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
            }

            .icon-box-wrapper .icon-box-icon,
            .icon-box-wrapper .icon-box-icon {
              display: -webkit-inline-box;
              display: -ms-inline-flexbox;
              display: inline-flex;
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
            }

            .icon-box-wrapper {
              text-align: left;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              -ms-flex-direction: row;
              flex-direction: row;
            }
          }

          .icon-box-wrapper .icon-box-icon {
            margin-right: 15px;
            font-size: 25px;
            color: #007bff
          }

          .icon-box-content {
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
          }

          .icon-box-title {
            margin: 0px;
            font-family: "Teko", Arial, Helvetica, sans-serif;
            font-weight: 600;
            font-size: 25px;
            line-height: 35px;
            color: #29282d;
          }

          .icon-box-description {
            margin: 0;
            font-family: "Teko", Arial, Helvetica, sans-serif;
          }

          .icon-box-wrapper.position-left {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }

          .icon-box-wrapper.icon-md .icon {
            font-size: 35px;
          }

          .icon-box-wrapper.icon-lg .icon {
            font-size: 45px;
          }
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
