import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'ct-pricing-plan'
  const componentName = 'Plan Card'
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
          <div class="ct-plan-head">
            <div class="ct-plan-icon">
              <i class="fa fa-check-square"></i>
            </div>
            <div class="ct-plan-title">
              <h3>Standard Plan!</h3>
              <p>Salary Level Up To $50k</p>
            </div>
            <div class="ct-plan-box-desc"></div>
          </div>
          <ul class="list list--icon color-darkgrey pt-15 pb-15">
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="list-content text-left">Unique concept fitness &amp; technology</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="list-content text-left">Gym franchises &amp; awarded in worlds</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right"></i>
              <span class="list-content text-left">Gym run by Certified &amp; professionals</span>
            </li>
            <li>
              <i class="fa fa-long-arrow-right text-left"></i>
              <span class="list-content">We are running successfully 20 years</span>
            </li>
          </ul>
          <div class="ct-plan-amount">
            <span class="cur_symbol">$</span>
            <span class="ct-ptablebox-price">99</span>
            <span class="pac_frequency">/Per Month</span>
          </div>
          <div class="ct-plan-footer">
            <a class="btn btn--md btn--square btn--fill btn--icon-right btn--primary text-center mt-30 z-index-1"
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
      '<svg version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path class="puchipuchi_een" d="M26,1H6C4.9,1,4,1.9,4,3v26c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2V3C28,1.9,27.1,1,26,1z M10,23 c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,22.552,10.552,23,10,23z M10,19c-0.552,0-1-0.448-1-1 c0-0.552,0.448-1,1-1s1,0.448,1,1C11,18.552,10.552,19,10,19z M10,15c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1 C11,14.552,10.552,15,10,15z M10,11c-0.552,0-1-0.448-1-1c0-0.552,0.448-1,1-1s1,0.448,1,1C11,10.552,10.552,11,10,11z M22,23h-8 c-0.552,0-1-0.448-1-1s0.448-1,1-1h8c0.552,0,1,0.448,1,1S22.552,23,22,23z M22,19h-8c-0.552,0-1-0.448-1-1s0.448-1,1-1h8 c0.552,0,1,0.448,1,1S22.552,19,22,19z M22,15h-8c-0.552,0-1-0.448-1-1s0.448-1,1-1h8c0.552,0,1,0.448,1,1S22.552,15,22,15z M22,11 h-8c-0.552,0-1-0.448-1-1s0.448-1,1-1h8c0.552,0,1,0.448,1,1S22.552,11,22,11z"></path> </g></svg>',
    content: { type: type },
    category: category
  })
}
