import Component from './components/Component'

const version = typeof __UI_VERSION__ !== 'undefined' ? __UI_VERSION__ : 'dev'

// SSR-safe plugins - no-op during server-side rendering
const plugins = (editor, opt) => {
  // Skip plugin registration during SSR
  if (typeof window === 'undefined') {
    return
  }
  
  // Dynamic import will be handled in Component.js
  console.warn('Plugins should be loaded dynamically in Component.js')
}

function install(app) {
  app.component(Component.name, Component)
}

export { version, Component, plugins, install }
