'use strict';

var repository = require('../../../lib/synonymSearchRepository');

module.exports = {
    get: function SYNONYM_SEARCH_GET(req, res) {
        repository.selectWord(req, res);
    },
    put: function SYNONYM_SEARCH_PUT(req, res) {
        repository.updateWord(req, res);
    }
};