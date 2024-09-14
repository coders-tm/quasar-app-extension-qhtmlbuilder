export const PROJECTS_KEY = 'gjs-projects'

export const BLOCKS_KEY = 'gjs-blocks'

export const PROJECTS = 'projects'

export const TEMPLATES = 'templates'

export const thumbnail =
  'https://raw.githubusercontent.com/dipaksarkar/grapesjs-templates/main/assets/placeholder.png'

export const isComponent = (el, type) => {
  const datasetType = (el) => el.dataset && el.dataset.type === type
  const containsClass = (el) => {
    if (!el.classList) return false
    return Array.from(el.classList).some((cls) => cls.startsWith(type))
  }

  // General return condition for other types
  return el && (datasetType(el) || containsClass(el))
}

export const isShortcodeComponent = (el, type) => {
  // Check if `el` is an HTML element with `innerHTML`
  if (el && el.innerHTML && typeof el.innerHTML === 'string') {
    const content = el.innerHTML.trim()
    const shortcodeData = parseShortcode(content)
    if (shortcodeData && shortcodeData.attrs) {
      Object.keys(shortcodeData.attrs).forEach((attr) => {
        el.setAttribute(`data-gjs-${attr}`, shortcodeData.attrs[attr])
      })
    }

    if (shortcodeData && shortcodeData.type === type) {
      return { type }
    }
  }

  return isComponent(el, type)
}

// Utility function to parse shortcode string and extract attributes
export const parseShortcode = (shortcode) => {
  const regex = /\[(\w+)([^\]]*)\]/ // Match shortcode [name attr="value"]
  const match = shortcode.match(regex)
  if (!match) return null

  const type = match[1] // shortcode name/type
  const attrsString = match[2].trim() // attributes string

  // Extract key-value pairs from attributes
  const attrs = {}
  const attrsRegex = /(\w+)="([^"]*)"/g
  let attrMatch
  while ((attrMatch = attrsRegex.exec(attrsString)) !== null) {
    attrs[attrMatch[1]] = attrMatch[2]
  }

  return { type, attrs }
}

export const mapTemplates = (editor, templates, removeable = false) => {
  const list = templates.map(
    (item) => `
      <div class="gjs-xs-12 gjs-sm-4">
        <div class="gjs-template-card">
          <div class="gjs-thumbnail gjs-img gjs-img--menu" role="img">
            <img src="${item?.thumbnail || thumbnail}">
            <div class="gjs-controller">
              <button class="select" data-template="${item.id}">
                ${editor.I18n.t('grapesjs-templates.select')}
              </button>
            </div>
          </div>
          <hr class="gjs-separator gjs-separator--horizontal" aria-orientation="horizontal">
          <div class="gjs-card__section gjs-card__section--vert">
            <div class="gjs-text-subtitle2">${item.name}</div>
            ${
              removeable
                ? `<button data-template="${item.id}" class="gjs-btn-delete remove fa fa-trash"></button>`
                : ''
            }
          </div>
        </div>
      </div>
    `
  )
  return `<div class="gjs-templates gjs-row gjs-col-gutter-md">${list.join(
    ''
  )}</div>`
}

const local = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return null
  }
}

const loadProjects = () => {
  return local(PROJECTS_KEY)
}

const loadBlocks = () => {
  return local(BLOCKS_KEY) || []
}

export function get(endpoint, opts) {
  return fetch(endpoint, {
    method: 'GET',
    headers: opts?.headers || {}
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err))
      }
      return response.json()
    })
    .catch((error) => {
      throw error
    })
}

export function post(endpoint, opts) {
  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(opts?.headers || {})
    },
    body: JSON.stringify(opts?.payload || {})
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err))
      }
      return response.json()
    })
    .catch((error) => {
      throw error
    })
}

export function destroy(endpoint, opts) {
  return fetch(endpoint, {
    method: 'DELETE',
    headers: opts?.headers || {}
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err))
      }
      return response.json()
    })
    .catch((error) => {
      throw error
    })
}

export const fetchTemplates = (type, opts) => {
  return new Promise(async (resolve, reject) => {
    const endpoint = type === PROJECTS ? opts?.projects : opts?.templates

    // If no endpoint is provided, return stored projects for PROJECTS type or null for templates
    if (!endpoint) {
      if (type === PROJECTS) {
        return resolve(loadProjects())
      }
      return resolve(null)
    }

    get(endpoint, opts)
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        console.error(err)
        resolve(null)
      })
  })
}

export const storeProjects = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (opts?.projects) {
        post(opts.projects, { ...opts, payload })
          .then((response) => {
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        // If no endpoint, store in local storage
        const projects = loadProjects() || []
        projects.push(payload)
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
        resolve(true) // Resolve as true after storing locally
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const removeProjects = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (opts?.projects) {
        destroy(`${opts.projects}/${payload}`, opts).then((response) => {
          resolve(response)
        })
      } else {
        const projects = loadProjects() || []
        const results = projects.filter((item) => item.id != payload)
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(results))
        resolve(true)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const fetchBlocks = (opts) => {
  return new Promise(async (resolve) => {
    if (!opts?.blocks) {
      return resolve(loadBlocks())
    }

    get(opts?.blocks, opts)
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        console.error(error)
      })
  })
}

export const storeBlocks = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if there's a blocks endpoint provided in opts
      if (opts?.blocks) {
        // Use the post method to send the payload to the blocks endpoint
        const response = await post(opts.blocks, { ...opts, payload })
        resolve(response)
      } else {
        // If no endpoint, load blocks from localStorage, add the new payload, and save it back
        const blocks = loadBlocks() || []
        blocks.push(payload)
        localStorage.setItem(BLOCKS_KEY, JSON.stringify(blocks))
        resolve(true)
      }
    } catch (error) {
      // If any error occurs, reject the Promise
      reject(error)
    }
  })
}

export const removeBlocks = (payload, opts) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (opts?.blocks) {
        destroy(`${opts.blocks}/${payload}`, opts).then((response) => {
          resolve(response)
        })
      } else {
        const blocks = loadBlocks()
        const results = blocks.filter((item) => item.id != payload)
        localStorage.setItem(BLOCKS_KEY, JSON.stringify(results))
        resolve(true)
      }
    } catch (error) {
      reject(error)
    }
  })
}

export const defaultTraits = [
  {
    type: 'select',
    name: 'layout',
    label: 'Layout',
    changeProp: 1,
    options: [
      { id: 'list', label: 'List' },
      { id: 'grid', label: 'Grid' }
    ],
    default: 'grid'
  },
  {
    type: 'number',
    name: 'paginate',
    label: 'Records per page',
    changeProp: 1,
    default: 12
  }
]

export const containerTraits = [
  {
    type: 'select-class',
    name: 'bs-width',
    label: 'Width',
    changeProp: 1,
    options: [
      { id: 'container', label: 'Fixed' },
      { id: 'container-sm', label: 'Small (sm)' },
      { id: 'container-md', label: 'Medium (md)' },
      { id: 'container-lg', label: 'Large (lg)' },
      { id: 'container-xl', label: 'Extra large (xl)' },
      { id: 'container-xxl', label: 'Extra extra large (xxl)' },
      { id: 'container-fluid', label: 'Fluid' }
    ],
    default: 'container'
  }
]

export const gutters = [1, 2, 3, 4, 5]

export const rowTraits = [
  {
    type: 'select-class',
    name: 'bs-align-v',
    label: 'Vertical alignment',
    changeProp: 1,
    options: [
      { id: '', label: 'Select' },
      { id: 'align-items-start', label: 'Start' },
      { id: 'align-items-center', label: 'Center' },
      { id: 'align-items-end', label: 'End' }
    ],
    default: ''
  },
  {
    type: 'select-class',
    name: 'bs-align-h',
    label: 'Horizontal alignment',
    changeProp: 1,
    options: [
      { id: '', label: 'Select' },
      { id: 'justify-content-start', label: 'Start' },
      { id: 'justify-content-center', label: 'Center' },
      { id: 'justify-content-end', label: 'End' },
      { id: 'justify-content-around', label: 'Around' },
      { id: 'justify-content-between', label: 'Between' },
      { id: 'justify-content-evenly', label: 'Evenly' }
    ],
    default: ''
  },
  {
    type: 'select-class',
    name: 'bs-gutters',
    label: 'Gutters',
    changeProp: 1,
    options: [
      {
        id: '',
        label: 'Select'
      },
      ...gutters.map((i) => ({ id: 'g-' + i, label: i }))
    ],
    default: ''
  },
  {
    type: 'select-class',
    name: 'bs-gutters-h',
    label: 'Horizontal gutters',
    changeProp: 1,
    options: [
      {
        id: '',
        label: 'Select'
      },
      ...gutters.map((i) => ({ id: 'gx-' + i, label: i }))
    ],
    default: ''
  },
  {
    type: 'select-class',
    name: 'bs-gutters-v',
    label: 'Vertical gutters',
    changeProp: 1,
    options: [
      {
        id: '',
        label: 'Select'
      },
      ...gutters.map((i) => ({ id: 'gy-' + i, label: i }))
    ],
    default: ''
  }
]

export const spans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const gridWidth = ['', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

export const grids = () => {
  const results = {}
  spans.forEach((item) => {
    gridWidth.forEach()
  })
}

export const colTraits = [
  {
    type: 'select-class',
    category: 'Grid Width',
    name: 'bs-grid-xs',
    label: 'Extra small',
    changeProp: 1,
    options: [
      { id: 'col', label: 'Equal' },
      { id: 'col-auto', label: 'Auto' },
      ...spans.map((i) => ({ id: 'col-xs-' + i, label: i + '/12' }))
    ]
  },
  {
    type: 'select-class',
    category: 'Grid Width',
    name: 'bs-grid-sm',
    label: 'Small',
    changeProp: 1,
    options: [
      { id: 'col-sm', label: 'Equal' },
      { id: 'col-sm-auto', label: 'Auto' },
      ...spans.map((i) => ({ id: 'col-sm-' + i, label: i + '/12' }))
    ]
  },
  {
    type: 'select-class',
    category: 'Grid Width',
    name: 'bs-grid-md',
    label: 'Medium',
    changeProp: 1,
    options: [
      { id: 'col-md', label: 'Equal' },
      { id: 'col-md-auto', label: 'Auto' },
      ...spans.map((i) => ({ id: 'col-md-' + i, label: i + '/12' }))
    ]
  },
  {
    type: 'select-class',
    category: 'Grid Width',
    name: 'bs-grid-lg',
    label: 'Large',
    changeProp: 1,
    options: [
      { id: 'col-lg', label: 'Equal' },
      { id: 'col-lg-auto', label: 'Auto' },
      ...spans.map((i) => ({ id: 'col-lg-' + i, label: i + '/12' }))
    ]
  },
  {
    type: 'select-class',
    category: 'Grid Width',
    name: 'bs-grid-xl',
    label: 'Extra large',
    changeProp: 1,
    options: [
      { id: 'col-xl', label: 'Equal' },
      { id: 'col-xl-auto', label: 'Auto' },
      ...spans.map((i) => ({ id: 'col-xl-' + i, label: i + '/12' }))
    ]
  },
  {
    type: 'select-class',
    category: 'Offset',
    name: 'offset-xs',
    changeProp: 1,
    options: [
      { id: '', label: 'None' },
      ...spans.map(function (i) {
        return { id: 'offset-' + i, label: i + '/12' }
      })
    ],
    label: 'Extra small'
  },
  {
    type: 'select-class',
    category: 'Offset',
    name: 'offset-sm',
    changeProp: 1,
    options: [
      { id: '', label: 'None' },
      ...spans.map(function (i) {
        return { id: 'offset-sm-' + i, label: i + '/12' }
      })
    ],
    label: 'Small'
  },
  {
    type: 'select-class',
    category: 'Offset',
    name: 'offset-md',
    changeProp: 1,
    options: [
      { id: '', label: 'None' },
      ...spans.map(function (i) {
        return { id: 'offset-md-' + i, label: i + '/12' }
      })
    ],
    label: 'Medium'
  },
  {
    type: 'select-class',
    category: 'Offset',
    name: 'offset-lg',
    changeProp: 1,
    options: [
      { id: '', label: 'None' },
      ...spans.map(function (i) {
        return { id: 'offset-lg-' + i, label: i + '/12' }
      })
    ],
    label: 'Large'
  },
  {
    type: 'select-class',
    category: 'Offset',
    name: 'offset-xl',
    changeProp: 1,
    options: [
      { id: '', label: 'None' },
      ...spans.map(function (i) {
        return { id: 'offset-xl-' + i, label: i + '/12' }
      })
    ],
    label: 'Extra large'
  }
]

export const getComponentWithStyles = (component, cssComposer) => {
  const componentJson = component.toJSON()

  // Get inline styles
  const style = component.getStyle()

  // Process child components recursively
  const childComponents = component
    .components()
    .map((child) => getComponentWithStyles(child, cssComposer))

  return {
    ...componentJson,
    style: style,
    components: childComponents
  }
}
