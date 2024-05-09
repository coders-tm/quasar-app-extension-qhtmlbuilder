export default (editor, options = {}) => {
  const { Components } = editor
  const imageType = Components.getType('image')
  Components.addType('image', {
    model: {
      defaults: {
        traits: [
          ...imageType.model.prototype.defaults.traits,
          {
            type: 'button',
            text: 'Select Image',
            command: (editor) => {
              const { AssetManager } = editor
              AssetManager.open({
                select(asset, close) {
                  const selected = editor.getSelected()
                  if (selected && selected.is('image')) {
                    selected.addAttributes({ src: asset.getSrc() })
                    close && AssetManager.close()
                  }
                }
              })
            }
          }
        ]
      }
    }
  })
}
