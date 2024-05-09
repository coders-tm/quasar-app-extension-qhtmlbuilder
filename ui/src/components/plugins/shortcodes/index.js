import _default from './default'
import header from './header'
import calendar from './calendar'
import openingTimes from './opening-times'
import announcements from './announcements'
import plans from './plans'
import products from './products'
import blogs from './blogs'
import contactForm from './contact-form'
import footer from './footer'

export default (editor, options = {}) => {
  const has = (type) => {
    if (Array.isArray(options?.shortcodes)) {
      return options.shortcodes.includes(type)
    }
    return Boolean(options?.shortcodes)
  }

  _default(editor, options)

  if (has('header')) {
    header(editor, options)
  }

  if (has('footer')) {
    footer(editor, options)
  }

  if (has('blogs')) {
    blogs(editor, options)
  }

  if (has('products')) {
    products(editor, options)
  }

  if (has('plans')) {
    plans(editor, options)
  }

  if (has('announcements')) {
    announcements(editor, options)
  }

  if (has('opening-times')) {
    openingTimes(editor, options)
  }

  if (has('calendar')) {
    calendar(editor, options)
  }

  if (has('contact-form')) {
    contactForm(editor, options)
  }
}
