'use strict';

const Stream = require('stream');

const chai   = require('chai');
const expect = chai.expect;

const utilBuffer = require(__dirname + '/buffer.js');

describe('bufferToStream', () => {
    it('result should be instance of Stream', function() {
        let buf = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
        let result = utilBuffer.bufferToStream(buf);
        expect(result).to.be.an.instanceof(Stream);
    });
});
