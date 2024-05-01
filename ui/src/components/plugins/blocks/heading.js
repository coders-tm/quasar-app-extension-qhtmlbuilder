import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'heading'
  const componentName = 'Heading'
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
          <h4 class="subtitle">WHY CHOOSE US!</h4>
          <h2 class="title">We Let You Feel The Difference</h2>
        `,
        styles: `
          .${type}{
            padding:10px;
          }
          .${type} .subtitle{
            margin-top:0px;
            margin-bottom:15px;
            line-height:13px;
            font-size:14px;
            font-family:Mulish, Arial, Helvetica, sans-serif;
            color:rgb(63, 136, 232);
            text-transform:uppercase;
            letter-spacing:0.1px;
          }
          .${type} .title{
            margin-top:0px;
            margin-bottom:15px;
            line-height:56px;
            font-size:53px;
            font-family:Teko, Arial, Helvetica, sans-serif;
            color:rgb(41, 40, 45);
            letter-spacing:0.1px;
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
