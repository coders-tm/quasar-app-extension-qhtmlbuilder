import Component from './components/Component'
import plugins from './components/plugins'

const version = typeof __UI_VERSION__ !== 'undefined' ? __UI_VERSION__ : 'dev'

function install(app) {
  app.component(Component.name, Component)
}

export { version, Component, plugins, install }
