'use strict';

const _     = require('lodash');
const azure = require('azure-storage');

const config = require(__dirname + '/../config.json');

const blobService = azure.createBlobService(config.azure.account, config.azure.storage_access_key);

function uploadBlobFromText(content, name, callback) {
    blobService.createBlockBlobFromText(config.azure.container, name, content, function(err, result, response) {
        if (!err) {
            if (_.isFunction(callback)) {
                callback(blobService.getUrl(result.container, result.name));
            }
        }
    });
}

module.exports = uploadBlobFromText;
