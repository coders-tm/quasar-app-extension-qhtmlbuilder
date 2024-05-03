import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'progress-section'
  const componentName = 'Progress Section'
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
          <div class="base-progress-bar clearfix" data-percent="80%">
            <div class="progressbar-title">Weight Lifting</div>
            <div class="progress-bar-inner">
              <div class="progress-bar progress-bar-color-bar_skincolor" style="width: 80%;"></div>
            </div>
            <div class="progress-bar-percent" data-percentage="95">95%</div>
          </div>
          <div class="base-progress-bar clearfix" data-percent="90%">
            <div class="progressbar-title">General Boxing</div>
            <div class="progress-bar-inner">
              <div class="progress-bar progress-bar-color-bar_skincolor" style="width: 90%;"></div>
            </div>
            <div class="progress-bar-percent" data-percentage="90">90%</div>
          </div>
          <div class="base-progress-bar clearfix" data-percent="70%">
            <div class="progressbar-title">Body Building</div>
            <div class="progress-bar-inner">
              <div class="progress-bar progress-bar-color-bar_skincolor" style="width: 70%;"></div>
            </div>
            <div class="progress-bar-percent" data-percentage="70">70%</div>
          </div>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 160H320V128H448v32zM48 64C21.5 64 0 85.5 0 112v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zM448 352v32H192V352H448zM48 288c-26.5 0-48 21.5-48 48v64c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48H48z"/></svg>',
    content: { type: type },
    category: category
  })
}
