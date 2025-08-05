import _default from './default'
import register from './register'

export const shortcodeOptions = {
  loader: undefined,
  items: [
    {
      type: 'header',
      name: 'Header',
      media:
        '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800"><path class="cls-1" d="M800,800V220.2S0,220.2,0,220.2v579.8s800,0,800,0ZM48.5,268.7h703v482.8H48.5v-482.8s0,0,0,0Z"/><rect class="cls-1" x="0" width="800" height="153.5"/></svg>',
      traits: [
        {
          type: 'select',
          name: 'layout',
          label: 'Layout',
          changeProp: 1,
          options: [
            { id: '', label: 'Select' },
            { id: 'default', label: 'Default' }
          ],
          default: ''
        }
      ]
    },
    {
      type: 'footer',
      name: 'Footer',
      media:
        '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 35 35" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M0,0v25.366h35V0H0z M32.879,23.245H2.121V2.121h30.758V23.245z"></path> <rect y="28.283" width="35" height="6.717"></rect> </g> </g> </g></svg>',
      traits: [
        {
          type: 'select',
          name: 'layout',
          label: 'Layout',
          changeProp: 1,
          options: [
            { id: '', label: 'Select' },
            { id: 'default', label: 'Default' }
          ],
          default: ''
        }
      ]
    }
  ]
}

export default (editor, options = {}) => {
  const { items, category, load } = options

  // register default shortcodes
  _default(editor, options)

  /**
   * options.shortcode{items: [], category: string|object}
   * {type: sting, componentName: sting, traits: [], media: string}
   */
  items.forEach((shortcode) => {
    register(editor, {
      ...shortcode,
      category,
      load
    })
  })
}
