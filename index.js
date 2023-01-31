const { prompt } = require("enquirer");
var clc = require("cli-color");
const {
  ERR_DOMAIN,
  BANNER,
  QUESTION,
  VALIDATOR,
  INPUT,
  CAPTION,
  FAQ,
} = require("./lib/constant");
const { getAPI } = require("./lib/getAPI");
const { getBacklink } = require("./lib/getBacklink");
const { checkLinks } = require("./lib/checkLink");
const { HTTPRefer } = require("./lib/HTTPRefer");
const cliSpinners = require("cli-spinners");
const Spinners = require("spinnies");
const spinners = new Spinners({
  spinnerColor: "blueBright",
  succeedColor: "greenBright",
  failColor: "redBright",
  spinner: cliSpinners.dots,
});

const question = [
  {
    type: "input",
    name: INPUT,
    message: QUESTION,
    validator: VALIDATOR,
    warning: ERR_DOMAIN,
  },
];

console.log(
  clc.greenBright(BANNER) +
    "\n" +
    clc.blueBright(CAPTION) +
    "\n" +
    clc.yellowBright(FAQ) +
    "\n"
);

(async function startApp() {
  const { [INPUT]: domain } = await prompt(question);
  console.log(clc.whiteBright("\n\n"));
  const data = await getAPI();

  for (let i = 0; i < data.length; i++) {
    const link = getBacklink(data[i]);
    const res = await checkLinks(link, domain);
    spinners.add("success", {
      text: " [+] Starting [+]",
      color: "green",
    });
    switch (res) {
      case 200:
        await HTTPRefer(link, domain);
        let succes = "[+] " + link + domain + " [200]";
        spinners.update("success", {
          text: succes,
          color: "green",
        });
        break;
      case 404:
        let notfound = "[-] " + link + domain + " [404]";
        spinners.add("err", {
          text: notfound,
          color: "red",
        });

        spinners.update("err", {
          text: notfound,
          color: "red",
        });
        break;
      default:
        let unknown = "[?] " + link + domain + " [Unknown]";
        console.log(clc.whiteBright(unknown));
        break;
    }
  }
})();
