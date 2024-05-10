import { Notify } from 'quasar'

export default (editor, opts) => {
  const { Commands } = editor

  Commands.add('notify', {
    run(editor, sender, options = {}) {
      return Notify.create({ position: 'bottom-right', ...options })
    }
  })
}
