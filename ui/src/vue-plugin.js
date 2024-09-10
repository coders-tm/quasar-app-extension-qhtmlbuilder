import Component from './components/Component'
import plugins from './components/plugins'

const version = __UI_VERSION__

function install(app) {
  app.component(Component.name, Component)
}

export { version, Component, plugins, install }
