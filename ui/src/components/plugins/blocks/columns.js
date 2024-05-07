const category = 'Layout'

export default (editor, options = {}) => {
  const { BlockManager } = editor

  BlockManager.add('column1', {
    label: 'One Column',
    media:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.75 5C3.33579 5 3 5.33579 3 5.75C3 6.16421 3.33579 6.5 3.75 6.5H20.25C20.6642 6.5 21 6.16421 21 5.75C21 5.33579 20.6642 5 20.25 5H3.75Z"></path> <path d="M3.75 9C3.33579 9 3 9.33579 3 9.75C3 10.1642 3.33579 10.5 3.75 10.5H20.25C20.6642 10.5 21 10.1642 21 9.75C21 9.33579 20.6642 9 20.25 9H3.75Z"></path> <path d="M3 13.75C3 13.3358 3.33579 13 3.75 13H20.25C20.6642 13 21 13.3358 21 13.75C21 14.1642 20.6642 14.5 20.25 14.5H3.75C3.33579 14.5 3 14.1642 3 13.75Z"></path> <path d="M3.75 17C3.33579 17 3 17.3358 3 17.75C3 18.1642 3.33579 18.5 3.75 18.5H20.25C20.6642 18.5 21 18.1642 21 17.75C21 17.3358 20.6642 17 20.25 17H3.75Z"></path> </g></svg>',
    content: { type: 'row', components: [{ type: 'column' }] },
    select: true,
    category
  })

  BlockManager.add('column2', {
    label: 'Two Columns',
    media:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.75C3 5.33579 3.33579 5 3.75 5H10.25C10.6642 5 11 5.33579 11 5.75C11 6.16421 10.6642 6.5 10.25 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75Z"></path> <path d="M3 9.75C3 9.33579 3.33579 9 3.75 9H10.25C10.6642 9 11 9.33579 11 9.75C11 10.1642 10.6642 10.5 10.25 10.5H3.75C3.33579 10.5 3 10.1642 3 9.75Z"></path> <path d="M3 13.75C3 13.3358 3.33579 13 3.75 13H10.25C10.6642 13 11 13.3358 11 13.75C11 14.1642 10.6642 14.5 10.25 14.5H3.75C3.33579 14.5 3 14.1642 3 13.75Z"></path> <path d="M3 17.75C3 17.3358 3.33579 17 3.75 17H10.25C10.6642 17 11 17.3358 11 17.75C11 18.1642 10.6642 18.5 10.25 18.5H3.75C3.33579 18.5 3 18.1642 3 17.75Z"></path> <path d="M13 5.75C13 5.33579 13.3358 5 13.75 5H20.25C20.6642 5 21 5.33579 21 5.75C21 6.16421 20.6642 6.5 20.25 6.5H13.75C13.3358 6.5 13 6.16421 13 5.75Z"></path> <path d="M13 9.75C13 9.33579 13.3358 9 13.75 9H20.25C20.6642 9 21 9.33579 21 9.75C21 10.1642 20.6642 10.5 20.25 10.5H13.75C13.3358 10.5 13 10.1642 13 9.75Z"></path> <path d="M13 13.75C13 13.3358 13.3358 13 13.75 13H20.25C20.6642 13 21 13.3358 21 13.75C21 14.1642 20.6642 14.5 20.25 14.5H13.75C13.3358 14.5 13 14.1642 13 13.75Z"></path> <path d="M13 17.75C13 17.3358 13.3358 17 13.75 17H20.25C20.6642 17 21 17.3358 21 17.75C21 18.1642 20.6642 18.5 20.25 18.5H13.75C13.3358 18.5 13 18.1642 13 17.75Z"></path> </g></svg>',
    content: {
      type: 'row',
      components: [
        {
          type: 'column',
          attributes: { class: 'col-sm-6' },
          components: `<p>col-sm-6</p>`
        },
        {
          type: 'column',
          attributes: { class: 'col-sm-6' },
          components: `<p>col-sm-6</p>`
        }
      ]
    },
    select: true,
    category
  })

  BlockManager.add('column3', {
    label: 'Three Columns',
    media:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 5.75C3 5.33579 3.33579 5 3.75 5H7.25C7.66421 5 8 5.33579 8 5.75C8 6.16421 7.66421 6.5 7.25 6.5H3.75C3.33579 6.5 3 6.16421 3 5.75Z"></path> <path d="M9.5 5.75C9.5 5.33579 9.83579 5 10.25 5H13.75C14.1642 5 14.5 5.33579 14.5 5.75C14.5 6.16421 14.1642 6.5 13.75 6.5H10.25C9.83579 6.5 9.5 6.16421 9.5 5.75Z"></path> <path d="M16 5.75C16 5.33579 16.3358 5 16.75 5H20.25C20.6642 5 21 5.33579 21 5.75C21 6.16421 20.6642 6.5 20.25 6.5H16.75C16.3358 6.5 16 6.16421 16 5.75Z"></path> <path d="M3 9.75C3 9.33579 3.33579 9 3.75 9H7.25C7.66421 9 8 9.33579 8 9.75C8 10.1642 7.66421 10.5 7.25 10.5H3.75C3.33579 10.5 3 10.1642 3 9.75Z"></path> <path d="M9.5 9.75C9.5 9.33579 9.83579 9 10.25 9H13.75C14.1642 9 14.5 9.33579 14.5 9.75C14.5 10.1642 14.1642 10.5 13.75 10.5H10.25C9.83579 10.5 9.5 10.1642 9.5 9.75Z"></path> <path d="M16 9.75C16 9.33579 16.3358 9 16.75 9H20.25C20.6642 9 21 9.33579 21 9.75C21 10.1642 20.6642 10.5 20.25 10.5H16.75C16.3358 10.5 16 10.1642 16 9.75Z"></path> <path d="M3 13.75C3 13.3358 3.33579 13 3.75 13H7.25C7.66421 13 8 13.3358 8 13.75C8 14.1642 7.66421 14.5 7.25 14.5H3.75C3.33579 14.5 3 14.1642 3 13.75Z"></path> <path d="M9.5 13.75C9.5 13.3358 9.83579 13 10.25 13H13.75C14.1642 13 14.5 13.3358 14.5 13.75C14.5 14.1642 14.1642 14.5 13.75 14.5H10.25C9.83579 14.5 9.5 14.1642 9.5 13.75Z"></path> <path d="M16 13.75C16 13.3358 16.3358 13 16.75 13H20.25C20.6642 13 21 13.3358 21 13.75C21 14.1642 20.6642 14.5 20.25 14.5H16.75C16.3358 14.5 16 14.1642 16 13.75Z"></path> <path d="M3 17.75C3 17.3358 3.33579 17 3.75 17H7.25C7.66421 17 8 17.3358 8 17.75C8 18.1642 7.66421 18.5 7.25 18.5H3.75C3.33579 18.5 3 18.1642 3 17.75Z"></path> <path d="M9.5 17.75C9.5 17.3358 9.83579 17 10.25 17H13.75C14.1642 17 14.5 17.3358 14.5 17.75C14.5 18.1642 14.1642 18.5 13.75 18.5H10.25C9.83579 18.5 9.5 18.1642 9.5 17.75Z"></path> <path d="M16 17.75C16 17.3358 16.3358 17 16.75 17H20.25C20.6642 17 21 17.3358 21 17.75C21 18.1642 20.6642 18.5 20.25 18.5H16.75C16.3358 18.5 16 18.1642 16 17.75Z"></path> </g></svg>',
    content: {
      type: 'row',
      components: [
        {
          type: 'column',
          attributes: { class: 'col-sm-4' },
          components: `<p>col-sm-4</p>`
        },
        {
          type: 'column',
          attributes: { class: 'col-sm-4' },
          components: `<p>col-sm-4</p>`
        },
        {
          type: 'column',
          attributes: { class: 'col-sm-4' },
          components: `<p>col-sm-4</p>`
        }
      ]
    },
    select: true,
    category
  })

  BlockManager.add('column2-48', {
    label: 'Columns 4/8',
    media:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 6C21 5.44772 20.5523 5 20 5H11C10.4477 5 10 5.44772 10 6C10 6.55228 10.4477 7 11 7H20C20.5523 7 21 6.55228 21 6Z" ></path> <path d="M8 6C8 5.44772 7.55228 5 7 5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H7C7.55228 7 8 6.55228 8 6Z" ></path> <path d="M21 10C21 9.44772 20.5523 9 20 9H11C10.4477 9 10 9.44772 10 10C10 10.5523 10.4477 11 11 11H20C20.5523 11 21 10.5523 21 10Z" ></path> <path d="M8 10C8 9.44772 7.55228 9 7 9H4C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11H7C7.55228 11 8 10.5523 8 10Z" ></path> <path d="M21 14C21 13.4477 20.5523 13 20 13H11C10.4477 13 10 13.4477 10 14C10 14.5523 10.4477 15 11 15H20C20.5523 15 21 14.5523 21 14Z" ></path> <path d="M8 14C8 13.4477 7.55228 13 7 13H4C3.44772 13 3 13.4477 3 14C3 14.5523 3.44772 15 4 15H7C7.55228 15 8 14.5523 8 14Z" ></path> <path d="M21 18C21 17.4477 20.5523 17 20 17H11C10.4477 17 10 17.4477 10 18C10 18.5523 10.4477 19 11 19H20C20.5523 19 21 18.5523 21 18Z" ></path> <path d="M8 18C8 17.4477 7.55228 17 7 17H4C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H7C7.55228 19 8 18.5523 8 18Z" ></path> </g></svg>',
    content: {
      type: 'row',
      components: [
        {
          type: 'column',
          attributes: { class: 'col-sm-4' },
          components: `<p>col-sm-4</p>`
        },
        {
          type: 'column',
          attributes: { class: 'col-sm-8' },
          components: `<p>col-sm-8</p>`
        }
      ]
    },
    select: true,
    category
  })

  BlockManager.add('column2-84', {
    label: 'Columns 8/4',
    media:
      '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 6C3 5.44772 3.44772 5 4 5H13C13.5523 5 14 5.44772 14 6C14 6.55228 13.5523 7 13 7H4C3.44771 7 3 6.55228 3 6Z"></path> <path d="M16 6C16 5.44772 16.4477 5 17 5H20C20.5523 5 21 5.44772 21 6C21 6.55228 20.5523 7 20 7H17C16.4477 7 16 6.55228 16 6Z"></path> <path d="M3 10C3 9.44772 3.44772 9 4 9H13C13.5523 9 14 9.44772 14 10C14 10.5523 13.5523 11 13 11H4C3.44771 11 3 10.5523 3 10Z"></path> <path d="M16 10C16 9.44772 16.4477 9 17 9H20C20.5523 9 21 9.44772 21 10C21 10.5523 20.5523 11 20 11H17C16.4477 11 16 10.5523 16 10Z"></path> <path d="M3 14C3 13.4477 3.44772 13 4 13H13C13.5523 13 14 13.4477 14 14C14 14.5523 13.5523 15 13 15H4C3.44771 15 3 14.5523 3 14Z"></path> <path d="M16 14C16 13.4477 16.4477 13 17 13H20C20.5523 13 21 13.4477 21 14C21 14.5523 20.5523 15 20 15H17C16.4477 15 16 14.5523 16 14Z"></path> <path d="M3 18C3 17.4477 3.44772 17 4 17H13C13.5523 17 14 17.4477 14 18C14 18.5523 13.5523 19 13 19H4C3.44771 19 3 18.5523 3 18Z"></path> <path d="M16 18C16 17.4477 16.4477 17 17 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H17C16.4477 19 16 18.5523 16 18Z"></path> </g></svg>',
    content: {
      type: 'row',
      components: [
        {
          type: 'column',
          attributes: { class: 'col-sm-8' },
          components: `<p>col-sm-8</p>`
        },
        {
          type: 'column',
          attributes: { class: 'col-sm-4' },
          components: `<p>col-sm-4</p>`
        }
      ]
    },
    select: true,
    category
  })
}
