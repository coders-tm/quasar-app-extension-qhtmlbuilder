const axios = require('axios')
const cheerio = require('cheerio')

// Function to fetch HTML content
async function fetchHTML(url) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching HTML:', error)
    return null
  }
}

// Function to extract CSS styles for a specific HTML element and its children
function extractCSS(url, elementSelector) {
  fetchHTML(url)
    .then((html) => {
      if (!html) return

      const $ = cheerio.load(html)
      const element = $(elementSelector)

      if (element.length === 0) {
        console.error('Element not found')
        return
      }

      // Get CSS styles for the element and its children
      const styles = {}
      element.each((index, el) => {
        const elementStyles = {}
        const children = $(el).find('*')
        children.each((childIndex, child) => {
          const childStyles = $(child).attr('style')
          if (childStyles) {
            elementStyles[child.tagName] = childStyles
          }
        })
        const elementName = $(el).prop('tagName')
        const elementMainStyles = $(el).attr('style')
        if (elementMainStyles) {
          elementStyles[elementName] = elementMainStyles
        }
        styles[elementName] = elementStyles
      })

      console.log('CSS styles:', styles)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

// Example usage
const webpageURL = 'https://themetechmount.com/wordpress/gimmer/about-us/'
const elementSelector = '.elementor-icon-box-wrapper'

extractCSS(webpageURL, elementSelector)
