// Query blob file from database, upload to cloud storage & update uploaded url.
'use strict';

const _ = require('lodash');

const util = require(__dirname + '/src/util/buffer.js');

const dbConn    = require(__dirname + '/src/database/connection.js');
const azureBlob = require(__dirname + '/src/azure/blob.js');

/**
 * Upload company logo.
 *
 * @param   {number}  companyID
 * @param   {Buffer}  logo
 * @returns {Promise}
 */
function uploadCompanyLogo(companyID, logo) {
    // Use primary key for naming (unique) with prefix.
    let name = `logo_tenant_company_${companyID}`;

    return new Promise((resolve, reject) => {
        azureBlob.uploadBlobFromStream(util.bufferToStream(logo), name, (url) => {
            resolve(companyID, url);
        });
    });
}

/**
 * Update logo url in database of given company.
 *
 * @param   {number} companyID
 * @param   {string} url
 * @returns {Promise}
 */
function updateCompanyLogoURL(companyID, url) {
    return dbConn.none('UPDATE tenant_company SET logo_url = $1 WHERE company_id = $2', [url, companyID]);
}

/**
 * Get list of company logos.
 *
 * @param {Function} [callback]
 */
function getCompanyLogos(callback) {
    dbConn.any('SELECT company_id, logo FROM tenant_company', [])
        .then(result => {
            if (_.isFunction(callback)) {
                callback(result);
            }
        })
        .catch(err => {
            console.log(`[ERROR] Query tenant company list - ${err}`);
        });
}

// Main script.

getCompanyLogos(result => {
    result.forEach(row => {
        let companyID   = row.company_id;
        let logoContent = row.logo;

        uploadCompanyLogo(companyID, logoContent)
            .then(updateCompanyLogoURL)
            .then(() => {
                console.log(`[INFO] Update logo url success for id: ${companyID}`);
            })
            .catch(err => {
                console.log(`[ERROR] Update logo url error for id: ${companyID} - ${err}`);
            });
    });
});
