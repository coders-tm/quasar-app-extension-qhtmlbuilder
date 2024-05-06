import sectionTitle from './section-title'
import buttonLink from './button-link'
import icon from './icon'
import team from './team'
import widget from './widget'
import widgetMenu from './widget-menu'
import iconBox from './icon-box'
import imageboxServices from './imagebox-services'
import progressSection from './progress-section'
import iconList from './icon-list'
import stepsBox from './steps-box'
import testimonial from './testimonial'
import planCard from './plan-card'
import bannerSlider from './banner-slider'
import pageTitle from './page-title'

export default (editor, options = {}) => {
  pageTitle(editor, options)
  icon(editor, options)
  sectionTitle(editor, options)
  buttonLink(editor, options)
  team(editor, options)
  widget(editor, options)
  widgetMenu(editor, options)
  imageboxServices(editor, options)
  progressSection(editor, options)
  iconList(editor, options)
  stepsBox(editor, options)
  testimonial(editor, options)
  planCard(editor, options)
  iconBox(editor, options)
  bannerSlider(editor, options)
}
