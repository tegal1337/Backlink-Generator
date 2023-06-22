const { default: axios } = require("axios");
const { load } = require("cheerio");

module.exports = {
  getMoz: async (url) => {
    try {
        const options = {
            method: 'POST',
            url: 'https://www.aravalibharat.com/domain-authority-checker.php',
            headers: {
              'user-agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0',
              accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
              'content-type': 'application/x-www-form-urlencoded',
              te: 'trailers'
            },
            data: {domain: url, 'lookup-submit': 'Check'}
          };
      const { data } = await axios.request(options);
      var $ = load(data);
      var res = [];
      $("table tbody tr").each(function (i, elem) {
        if (i != 0) {
            res.push({
            url: $(this).find("td").eq(0).text().trim(),
            da: $(this).find("td").eq(1).text().trim(),
            pa: $(this).find("td").eq(2).text().trim(),
          });
        }
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};
