'use strict';
var Mockgen = require('../../../mockgen.js');
/**
 * Operations on /send
 */
module.exports = {
    /**
     * summary: 
     * description: 
     * parameters: 
     * produces: application/json, text/json
     * responses: 200
     * operationId: send_get
     */
    /**
     * summary: 
     * description: 
     * parameters: id
     * produces: application/json, text/json
     * responses: 200
     * operationId: send_getById
     */
    get: {
        200: function (req, res, callback) {
            /**
             * Using mock data generator module.
             * Replace this by actual data for the api.
             */
            Mockgen().responses({
                path: '/v1/synonym/search',
                operation: 'get',
                response: '200'
            }, callback);
        }
    },
    put: {
        200: function (req, res, callback) {
            Mockgen().response({
                path: '/v1/synonym/search',
                operation: 'put',
                response: '200'
            }, callback);
        }
    }
    
};
