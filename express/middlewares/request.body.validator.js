const Joi = require('joi');
const { mm, en } = require('../locales/validation.messages');
const { formatResponseDate } = require('../utils/utils');

const validator = (schema, data) => {
    const { error } = schema.validate(data, {
        messages: i18n.getLocale() === 'mm' ? mm : en,
        dateFormat: 'date'
    });
    if (error == null) return null;
    else {
        const { details } = error;
        const dateRegex = /[a-zA-Z]{3} [a-zA-Z]{3} \d{2} \d{4}/;

        return details
            .map((i) => {
                const dateLimit = i.message.match(dateRegex)?.[0];
                return i.message
                    .replaceAll('"', '')
                    .replaceAll('\\', '')
                    .replaceAll('ref:', '')
                    .replaceAll(dateLimit, formatResponseDate(dateLimit));
            })
            .join(', ');
    }
};

module.exports = validator;
