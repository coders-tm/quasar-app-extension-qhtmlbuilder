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
          class: type,
          href: 'javascript:void(0);'
        },
        traits: [...defaultType.model.prototype.defaults.traits],
        components: `
          <span class="button-content-wrapper">
            <span class="button-icon align-icon-right">
              <i aria-hidden="true" class="fa fas fa-angle-double-right"></i>
            </span>
            <span class="button-text">view more</span>
          </span>
        `,
        styles: `
          .${type} {
            font-size: 13px;
            line-height: 13px;
            padding: 15px 30px;
            display: inline-block;
            border-radius: 0;
            background-color: #f34e3a;
            font-family: "Muli", Arial, Helvetica, sans-serif;
            font-weight: 800;
            text-transform: uppercase;
            position: relative;
            text-decoration: none;
            color: #fff;
            z-index: 1;
          }
          
          .${type}:hover:before {
            left: 0;
            width: 100%;
            right: auto;
          }
          
          .${type}:before {
            background-color: #29282d;
          }
          
          .${type}:before {
            top: 0;
            width: 0;
            left: auto;
            right: 0;
            z-index: -1;
            bottom: 0;
            content: "";
            position: absolute;
            transition: all 0.3s ease-in-out;
          }
          
          .${type}.size-md {
            font-size: 16px;
            line-height: 16px;
          }
          
          .${type}:focus,
          .${type}:hover,
          .${type}:visited {
            color: #fff;
          }
          
          .button-content-wrapper {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
          }
          
          .${type} .button-icon {
            -webkit-box-flex: 0;
            -ms-flex-positive: 0;
            flex-grow: 0;
            -webkit-box-ordinal-group: 6;
            -ms-flex-order: 5;
            order: 5;
          }
          
          .${type} .align-icon-right {
            margin-left: 10px;
            -webkit-box-ordinal-group: 16;
            -ms-flex-order: 15;
            order: 15;
          }
          
          .${type} span {
            text-decoration: inherit;
          }
          
          .${type} .button-text {
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -webkit-box-ordinal-group: 11;
            -ms-flex-order: 10;
            order: 10;
            display: inline-block;
          }

          .${type}.button-outlined {
            border: 1px solid #29282d;
            color: #29282d;
            background: transparent;
          }
      
          .${type}.button-outlined:hover {
            color: #fff;
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
