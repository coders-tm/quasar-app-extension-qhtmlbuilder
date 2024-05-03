import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'base-pricing-plan'
  const componentName = 'Plan Card'
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
          <div class="base-p_table-head">
            <div class="base-p_table-icon">
              <i class="fa fa-check-square"></i>
            </div>
            <div class="base-p_table-title">
              <h3>Standard Plan!</h3>
              <p>Salary Level Up To $50k</p>
            </div>
            <div class="base-p_table-box-desc"></div>
          </div>
          <ul class="base-list base-list-style-icon base-list-icon-color-darkgrey pt-15 pb-15">
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="base-list-li-content text-left">Unique concept fitness &amp; technology</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="base-list-li-content text-left">Gym franchises &amp; awarded in worlds</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="base-list-li-content text-left">Gym run by Certified &amp; professionals</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right text-left"></i>
              <span class="base-list-li-content">We are running successfully 20 years</span>
            </li>
          </ul>
          <div class="base-p_table-amount">
            <span class="cur_symbol">$</span>
            <span class="base-ptablebox-price">99</span>
            <span class="pac_frequency">/Per Month</span>
          </div>
          <div class="base-p_table-footer">
            <a class="base-btn base-btn-size-md base-btn-shape-square base-btn-style-fill base-icon-btn-right base-btn-color-skincolor text-center mt-30 z-index-1"
              href="javascript:void(0);">GET STARTED</a>
          </div>
        `
      }
    }
  })

  // Create a block for the Blogs component
  Blocks.add(`${type}-block`, {
    label: componentName,
    media:
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/></svg>',
    content: { type: type },
    category: category
  })
}
