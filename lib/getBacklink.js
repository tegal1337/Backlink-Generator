module.exports = {
  getBacklink:  (source) => {
    try {
      const ex = /(http[s]?:\/\/[^\s]+)/g;
      const result = source.match(ex);
      return result[0];
    } catch (error) {
      return error;
    }
  },
};
