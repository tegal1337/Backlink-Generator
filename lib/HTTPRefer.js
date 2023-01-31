const axios = require("axios");
module.exports = {
    HTTPRefer:  async(backlink,target) => {
      try {
        await axios.get(backlink+target ,{Headers: {Referer: backlink},validateStatus: false});
        return;
      } catch (error) {
        return error ? 404 : error.response.status;
      }
    },
  };
  