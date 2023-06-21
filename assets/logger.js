const chalk = require("chalk");
const moment = require("moment");

module.exports = class Logger {
  static log(content, type = "log") {
    const date = moment().format("DD-MM-YYYY hh:mm:ss");

    const logTypeColors = {
      log: {color : (color) => chalk.hex("#ffffff")(color), display : "LOG"},
      warn: {color : (color) => chalk.hex("#ffaa00")(color), display : "WARN"},
      error: {color : (color) => chalk.hex("#ff2200")(color), display : "ERROR"},
      debug: {color : (color) => chalk.hex("#eeee55")(color), display : "DEBUG"},
      cmd: {color : (color) => chalk.hex("#77ff22")(color), display : "COMND"},
      event: {color : (color) => chalk.hex("#e1f507")(color), display : "EVENT"},
      ready: {color : (color) => chalk.hex("#ff55aa")(color), display : "READY"},
    };

    const log = logTypeColors[type] || bgBlue;

    const logMessage = chalk.bold(`${log.color(log.display+" ".repeat(7-type.length))} => ${chalk.blue(content)}`);

    console.log(logMessage);
  }
}; 
        