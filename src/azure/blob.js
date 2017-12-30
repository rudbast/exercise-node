/**
 * Azure Storage blob service helper module.
 */
'use strict';

const _     = require('lodash');
const azure = require('azure-storage');

const config = require(__dirname + '/../../config.json');

const blobService = azure.createBlobService(config.azure.account, config.azure.storage_access_key);

/**
 * Upload blob to azure storage from a stream.
 * ref: https://github.com/Azure/azure-storage-node/issues/319#issue-239093281
 *
 * @param {Stream}   content
 * @param {string}   name
 * @param {Function} [callback]
 */
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
