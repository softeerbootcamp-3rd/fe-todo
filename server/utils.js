function getIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) return i;
  }
  return undefined;
}

module.exports = { getIndexById };
