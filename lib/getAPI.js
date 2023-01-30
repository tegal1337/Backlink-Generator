const { CURRENT_API } = require("./constant");
const axios = require("axios");
module.exports = {
  getAPI: async () => {
    try {
      const res = await axios.get(CURRENT_API);
      return res.data.split("\n");
    } catch (error) {
      return error;
    }
  },
};
