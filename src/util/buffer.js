'use strict';

const Duplex = require('stream').Duplex;

/**
 * Convert buffer to stream.
 * ref: http://derpturkey.com/buffer-to-stream-in-node/
 *
 * @param   {Buffer} buffer
 * @returns {Stream}
 */
function bufferToStream(buffer) {
    let stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

module.exports = {
    bufferToStream: bufferToStream
};
