export const isComponent = (el, type) => {
  return (
    el &&
    ((el.dataset && el.dataset.type === type) ||
      (el.classList && el.classList.contains(type)))
  )
}
