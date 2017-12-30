'use strict';

const _     = require('lodash');
const azure = require('azure-storage');

const config = require(__dirname + '/../../config.json');

const blobService = azure.createBlobService(config.azure.account, config.azure.storage_access_key);

function uploadBlobFromStream(content, name, callback) {
    content.pipe(blobService.createWriteStreamToBlockBlob(config.azure.container, name, (err, result) => {
        if (err) {
            throw err;
        }

        if (_.isFunction(callback)) {
            callback(blobService.getUrl(config.azure.container, name));
        }
    }));
}

module.exports = {
    uploadBlobFromStream: uploadBlobFromStream
};
