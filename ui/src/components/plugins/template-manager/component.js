import { Dialog } from 'quasar'
import { fetchBlocks, storeBlocks } from '../utils'

// Utility function to convert a string to slug
export const convertToSlug = (blockName) => {
  return (
    'custom-block-' +
    blockName
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]+/g, '')
  ) // Remove all non-word characters except hyphen
}

export default (editor, options = {}) => {
  const { Commands, Blocks } = editor
  const { category } = options

  const addBlock = (data = {}) => {
    Blocks.add(data.key, data.options)
  }

  Commands.add('add-component', {
    async run(editor) {
      const component = editor.getSelected()
      const name = component.get('custom-name') || component.get('name')

      Dialog.create({
        title: 'Save Block as Custom Block',
        message:
          'Provide a unique name for the block. This block will be saved and available for reuse in your custom block library.',
        prompt: {
          placeholder: 'Enter block name',
          model: name,
          type: 'text',
          dense: true,
          outlined: true
        },
        cancel: true,
        persistent: true
      }).onOk(async (name) => {
        const notif = editor.runCommand('notify', {
          type: 'ongoing',
          message: 'Saving in progress...'
        })

        try {
          // Usage
          const data = this.toBlock(editor, name)

          storeBlocks({ data, id: Date.now() }, options).then(() => {
            // Define a new block in the Blocks manager
            addBlock(data)

            notif({
              type: 'positive',
              message: 'Template Saved Successfully!'
            })
          })
        } catch (error) {
          notif({
            type: 'negative',
            message:
              error.toString() ||
              'An error occurred while saving. Please try again.'
          })
        }
      })
    },

    toBlock(editor, blockName) {
      // Get the selected component's JSON and styles
      const component = editor.getSelected()

      if (!component) {
        console.log('No component selected')
        return
      }

      // Convert blockName to slug and add prefix
      const blockId = convertToSlug(blockName)

      // Create the HTML content by converting the component to HTML
      const html = editor.getHtml({ component })

      // Create the CSS content from the inline styles
      const css = editor.getCss({ component })

      return {
        key: blockId,
        options: {
          label: blockName,
          content: `<style>${css}</style>${html}`,
          category,
          attributes: { class: 'fa fa-cube', name: blockName }
        }
      }
    }
  })

  fetchBlocks(options).then((blocks) => {
    blocks.forEach(({ data }) => {
      addBlock(data)
    })
  })
}
