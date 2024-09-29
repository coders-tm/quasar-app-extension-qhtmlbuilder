import { QInnerLoading, QSpinnerIos } from 'quasar'
import { h } from 'vue'

export default {
  name: 'Loading',

  props: {
    loading: Boolean
  },
  setup(props) {
    return () =>
      h(
        QInnerLoading,
        {
          showing: props.loading,
          class: 'gjs-one-bg'
        },
        [
          h(QSpinnerIos, { size: '70px', color: 'primary' }),
          h('div', { innerHTML: 'Please wait...', class: 'q-mt-sm text-white' })
        ]
      )
  }
}
