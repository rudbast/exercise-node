/**
 * Database connection module.
 */
'use strict';

const pgp = require('pg-promise')();

const config = require(__dirname + '/../../config.json');

const conn = pgp(config.database);

module.exports = conn;
