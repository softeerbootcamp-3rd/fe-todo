function getIndexById(list, id) {
  if (isNaN(id)) return list.length;
  return list.findIndex((item) => item.id === id);
}

module.exports = { getIndexById };
