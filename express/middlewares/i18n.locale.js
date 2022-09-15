const i18n = require('i18n');
const setLocale = (req, res, next) => {
    const lang = req.get('Accept-Language');
    i18n.setLocale(lang ? (lang == 'mm' ? 'mm' : 'en') : 'en');
    next();
};

module.exports = setLocale;
