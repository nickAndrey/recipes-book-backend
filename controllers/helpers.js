exports.setAsArray = (list) => {
  return JSON.stringify(list).replace('[', '{').replace(']', '}').replace("'", '"');
};
