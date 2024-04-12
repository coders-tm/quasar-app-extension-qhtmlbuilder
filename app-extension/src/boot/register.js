import { boot } from 'quasar/wrappers'
import VuePlugin from 'quasar-ui-qhtmlbuilder'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
