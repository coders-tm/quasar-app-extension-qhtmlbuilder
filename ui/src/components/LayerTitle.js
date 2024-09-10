
import { h } from 'vue'

export default {
  name: 'LayerTitle',
  setup() {
    return () =>
      h('div', {
        class: 'htmlbuilder__layers-title',
        innerHTML:
          '<div class="flex q-pa-sm"><svg style=display:block;max-width:22px viewBox="0 0 24 24"><path d=M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z fill=currentColor></path></svg> <span class=q-pl-xs>Layers</span></div>'
      })
  }
}
