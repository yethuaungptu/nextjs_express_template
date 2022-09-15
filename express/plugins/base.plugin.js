const uniqueValidator = require('mongoose-unique-validator');
const _ = require('lodash');
const { formatResponseDate } = require('../utils/utils');

const setToJson = function (schema) {
    schema.set('toJSON', {
        transform: (document, returnedObj) => {
            const resp = {
                id: returnedObj._id.toString(),
                ...returnedObj
            };
            const dateKeys = _.keys(_.pickBy(resp, _.isDate));
            dateKeys.forEach((key) => (resp[key] = formatResponseDate(resp[key])));
            delete resp._id;
            delete resp.__v;
            delete resp.isDeleted;
            delete resp.creator;
            delete resp.updater;
            delete resp.createdAt;
            delete resp.updatedAt;
            delete resp.fileStoragePath;
            return resp;
        }
    });
};

const constrainUnique = function (schema) {
    schema.plugin(uniqueValidator);
};

module.exports = { setToJson, constrainUnique };
