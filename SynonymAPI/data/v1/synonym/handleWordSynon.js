'use strict';
var Mockgen = require('../../../mockgen.js');
/**
 * Operations on /send
 */
module.exports = {
    /**
     * summary: 유의어 목록 조회
     * description: 
     * parameters: 
     * produces: application/json, text/json
     * responses: 200
     * operationId: WORD_SYNON_LIST_SEARCH_GET
     */
    get: {
        200: function (req, res, callback) {
            Mockgen().responses({
                path: '/v1/synonym/handleWordSynon',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: 유의어 등록
     * description: 
     * parameters: 
     * produces: application/json, text/json
     * responses: 200
     * operationId: WORD_SYNON_SCORE_INSERT_POST
     */
    post: {
        200: function (req, res, callback) {
            Mockgen().response({
                path: '/v1/synonym/handleWordSynon',
                operation: 'post',
                response: '200'
            }, callback);
        }
    },
    /**
     * summary: 유의어 스코어 수정 (+1)
     * description: 
     * parameters: 
     * produces: application/json, text/json
     * responses: 200
     * operationId: WORD_SYNON_SCORE_UPDATE_PUT
     */
    put: {
        200: function (req, res, callback) {
            Mockgen().response({
                path: '/v1/synonym/handleWordSynon',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
    
};
