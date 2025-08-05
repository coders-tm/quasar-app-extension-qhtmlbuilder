export const isComponent = (el, type) => {
  const datasetType = (el) => el.dataset && el.dataset.type === type
  const containsClass = (el) => {
    if (!el.classList) return false
    return Array.from(el.classList).some((cls) => cls.startsWith(type))
  }

  // General return condition for other types
  return el && (datasetType(el) || containsClass(el))
}
