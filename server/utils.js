function getIndexById(list, id) {
  if (isNaN(id)) return list.length;
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return i;
  }
  return undefined;
}

module.exports = { getIndexById };
