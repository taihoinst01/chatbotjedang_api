'use strict';

var repository = require('../../../lib/synonymSearchRepository');

module.exports = {
    get: function WORD_SYNON_LIST_SEARCH_GET(req, res) {
        repository.selectWordSynonList(req, res);
    },
    post: function WORD_SYNON_SCORE_INSERT_POST(req, res) {
        repository.insertWordSynonScore(req, res);
    },
    put: function WORD_SYNON_SCORE_UPDATE_PUT(req, res) {
        repository.updateWordSynonScore(req, res);
    }
};