const axios = require("axios");
module.exports = {
    checkLinks:  async(source,domain) => {
      try {
        const res = await axios.get(source+domain ,{validateStatus: false});
        return res.status;
      } catch (error) {
        return error ? 404 : error.response.status;
      }
    },
  };
  