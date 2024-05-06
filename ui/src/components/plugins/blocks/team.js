import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'team'
  const componentName = 'Team'
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
          <div class="featured-imagebox featured-imagebox-team style1">
            <div class="ct-box-view-overlay">
              <div class="featured-thumbnail">
                <img class="img-fluid" src="https://placehold.co/450x470" alt="image">
                <div class="featured-iconbox ct-media-link">
                  <div class="media-block">
                    <ul class="social-icons">
                      <li>
                        <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="facebook"
                          data-tooltip="Facebook" target="_blank"><i class="fab fa-facebook"></i></a>
                      </li>
                      <li>
                        <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="twitter"
                          data-tooltip="Twitter" target="_blank"><i class="fab fa-twitter"></i></a>
                      </li>
                      <li>
                        <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="flickr"
                          data-tooltip="Flickr" target="_blank"><i class="fab fa-flickr"></i></a>
                      </li>
                      <li>
                        <a class="tooltip-top" href="javascript:void(0);" rel="noopener" aria-label="linkedin"
                          data-tooltip="Linkedin" target="_blank"><i class="fab fa-linkedin"></i></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="featured-content">
              <div class="featured-title">
                <h3><a href="javascript:void(0);">David Smitgh</a></h3>
              </div>
              <div class="team-position">Consultant</div>
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
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>',
    content: { type: type },
    category: category
  })
}
