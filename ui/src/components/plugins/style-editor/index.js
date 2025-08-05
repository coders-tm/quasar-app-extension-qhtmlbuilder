const cmdCssEdit = 'css-edit'

export default (editor, opts = {}) => {
  const { Commands, Modal, Panels } = editor
  const { styleLabel, codeViewerConfig } = opts

  Commands.add(cmdCssEdit, {
    codeViewer: null,
    container: null,

    run(editor) {
      const codeViewer = this.getCodeViewer()
      Modal.open({
        title: 'Update Styles',
        content: this.getContainer()
      }).onceClose(() => editor.stopCommand(cmdCssEdit))
      codeViewer.setContent(editor.getCss())
      codeViewer.refresh()
      setTimeout(() => codeViewer.focus(), 0)
    },

    stop() {
      Modal.close()
    },

    getContainer() {
      if (!this.container) {
        const codeViewer = this.getCodeViewer()
        const container = document.createElement('div')
        container.className = `style-container`

        // Style Label
        if (styleLabel) {
          const labelEl = document.createElement('div')
          labelEl.className = `style-label`
          labelEl.innerHTML = styleLabel
          container.appendChild(labelEl)
        }

        container.appendChild(codeViewer.getElement())

        // Style update button
        const btnImp = document.createElement('button')
        btnImp.type = 'button'
        btnImp.innerHTML = 'Update'
        btnImp.className = `gjs-btn-prim gjs-btn-import`
        btnImp.onclick = () => {
          editor.setStyle(codeViewer.getContent().trim())
          Modal.close()
        }
        container.appendChild(btnImp)

        this.container = container
      }

      return this.container
    },

    getCodeViewer() {
      if (!this.codeViewer) {
        this.codeViewer = editor.CodeManager.createViewer({
          codeName: 'css',
          theme: 'hopscotch',
          readOnly: false,
          ...codeViewerConfig
        })
      }

      return this.codeViewer
    }
  })

  Panels.addButton('options', {
    id: cmdCssEdit,
    command: () => editor.runCommand(cmdCssEdit),
    label:
      '<svg style="display: block; max-width: 16px; padding-top: 2px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z"/></svg>',
    attributes: {
      title: 'Modify styles'
    }
  })
}
