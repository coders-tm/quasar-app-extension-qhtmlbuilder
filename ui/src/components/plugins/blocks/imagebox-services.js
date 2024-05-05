import { isComponent } from '../utils'

export default (editor, options = {}) => {
  const { category } = options
  const { Blocks, Components } = editor
  const type = 'imagebox-services'
  const componentName = 'Image Box'
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
          <div class="featured-imagebox featured-imagebox-services style1">
            <!-- featured-thumbnail -->
            <div class="featured-thumbnail">
              <a href="javascript:void(0);" tabindex="0">
                <img width="742" height="618" class="img-fluid" src="https://placehold.co/742x618" alt="image">
              </a>
              <div class="base-blog-overlay-iconbox">
                <a href="javascript:void(0);" tabindex="0">
                  <i class="ti ti-plus"></i>
                </a>
              </div>
              <div class="cat_block-wrapper">
                <span class="cat_block">
                  <time class="entry-date published" datetime="2020-11-11T04:34:34+00:00">CARDIO</time>
                </span>
              </div>
            </div><!-- featured-thumbnail end-->
            <div class="featured-content featured-content-post">
              <div class="featured-title">
                <h3><a href="javascript:void(0);" tabindex="0">Fitness For Man</a></h3>
              </div>
              <div class="featured-desc">
                <p>Fitness For Man strong interest in gymnastics, training provides stress to the muscles.</p>
              </div>
              <a class="base-btn btn-inline base-btn-md base-btn-color-darkgrey z-index-1" href="javascript:void(0);"
                tabindex="0">Read More</a>
              <div class="base-boxbg-icon">
                <div class="base-service-iconbox">
                  <div
                    class="base-icon base-icon_element-color-skincolor base-icon_element-size-md base-icon_element-style-rounded">
                    <i class="fa fa-check-square-o"></i>
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
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M256 48V64c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H256zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zM160 320h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H96c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"/></svg>',
    content: { type: type },
    category: category
  })
}
