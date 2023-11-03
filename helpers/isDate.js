const moment = require("moment");

const isDate = (value) => moment(value).isValid();

module.exports = { isDate };
