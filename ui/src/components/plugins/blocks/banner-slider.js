import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'banner-slider'
  const componentName = 'Banner Slider'
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
          <div class="slide" style="background: grey; display:flex; justify-content:space-around;">
            <div class="slide-content text-white main-display text-right banner-slider--style1">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="slide-content--headings d-md-flex d-block text-md-left text-center padding-left-space">
                      <div data-animation="fadeInLeft" class="fade-main bg-white"></div>
                      <div data-animation="fadeInLeft" class="fade-in-main bg-primary">
                      </div>
                      <div class="pt-10 pb-10">
                        <h3 data-animation="fadeInDown" class="text-md-left text-center">Different
                          From Others!
                        </h3>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">Book
                          Appointment
                        </h2>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">To Join Our
                          Online
                        </h2>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">Health
                          Courses.
                        </h2>
                        <div class="mt-30 align-items-center xs--mt-20" data-animation="fadeInUp text-md-left text-center"
                          data-delay="1.4">
                          <a class="btn btn--md btn--square btn--fill btn--icon-right btn--primary"
                            href="javascript:void(0);">GET STARTED</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slide" style="background: grey; display:flex; justify-content:space-around;">
            <div class="slide-content text-white text-left banner-slider--style1">
              <div class="container">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="slide-content--headings d-md-flex d-block text-md-left text-center">
                      <div data-animation="fadeInLeft" class="fade-main bg-white"></div>
                      <div data-animation="fadeInLeft" class="fade-in-main bg-primary">
                      </div>
                      <div class="pt-10 pb-10">
                        <h3 data-animation="fadeInDown" class="text-md-left text-center">The Best
                          Fitness Studio.
                        </h3>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">Making
                          Different
                        </h2>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">From Other
                          Builds
                        </h2>
                        <h2 data-animation="fadeInDown" class="text-md-left text-center">Perfect
                          Health.
                        </h2>
                        <div class="mt-30 align-items-center xs--mt-20 text-md-left text-center" data-animation="fadeInUp"
                          data-delay="1.4">
                          <a class="btn btn--md btn--square btn--fill btn--icon-right btn--primary"
                            href="javascript:void(0);">CONTACT US</a>
                        </div>
                      </div>
                    </div>
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
      '<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,4.88A2.88,2.88,0,0,1,4.88,2H47.12A2.88,2.88,0,0,1,50,4.88V47.12A2.88,2.88,0,0,1,47.12,50H4.88A2.88,2.88,0,0,1,2,47.12ZM9.2,22.16a2.39,2.39,0,0,1,2.4-2.4H39.44a2.4,2.4,0,1,1,0,4.8H11.6A2.39,2.39,0,0,1,9.2,22.16Zm8.16,5.28a2.4,2.4,0,1,0,0,4.8H33.68a2.4,2.4,0,0,0,0-4.8Z" fill-rule="evenodd"></path></g></svg>',
    content: { type: type },
    category: category
  })
}
