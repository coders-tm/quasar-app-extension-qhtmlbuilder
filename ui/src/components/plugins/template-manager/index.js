import html2canvas from 'html2canvas'
import { createPopper } from '@popperjs/core'
import en from './locale/en'
import templates from './templates'
import commands from './commands'
import panels from './panels'

export const makeThumbnail = (el, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      await html2canvas(el, options).then(async function (canvas) {
        const image = await canvas.toDataURL('image/png')
        resolve(image)
      })
    } catch (error) {
      console.error(error)
      resolve(null)
    }
  })
}

export default (editor, opts = {}) => {
  const options = {
    i18n: {},
    templates: null,
    projects: null,
    ...opts
  }

  // Load i18n files
  if (editor.I18n) {
    editor.I18n.addMessages({
      en,
      ...options.i18n
    })
  }

  editor.templates = templates
  editor.makeThumbnail = makeThumbnail
  editor.createPopper = createPopper

  // Add commands
  commands(editor, options)

  // Add panels
  panels(editor, options)
}
