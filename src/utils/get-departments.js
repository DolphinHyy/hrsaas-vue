const getDepartments = (list, id = '') => {
  const tree = []
  list.forEach(e => {
    if (e.pid === id) {
      const children = getDepartments(list, e.id)
      if (children.length) {
        e.children = children
      }
      tree.push(e)
    }
  })
  return tree
}

export default getDepartments
