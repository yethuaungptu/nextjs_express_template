const dayjs = require('dayjs');

exports.formatResponseDate = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
};

exports.getDate = (fromDate, dayDiff) => {
    return new Date(fromDate + 1000 * 60 * 60 * 24 * dayDiff);
};
