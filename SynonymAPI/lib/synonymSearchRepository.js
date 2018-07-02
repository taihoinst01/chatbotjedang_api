'use strict';

var dbHelper = require('./dbHelper');
var dbConfig = require('./dbConfig');
var sql = require('mssql');
var convert = require('json2xml');

module.exports = {
    // 스웨거 스팩상 라우터에서 패스 파라미터는 단일항목만 지원함

    // TODO : 삭제 (사용안함)
    selectWord: function (req, res) {
        //var args = dbHelper.sqlSelectParameters(req);
        var sqlText =
            "       SELECT WORD \n"
            + "            ,SYNONYM \n"
            + "     FROM TBL_SYNONYM \n"
            + "     WHERE WORD = '" + req.query.word + "' \n";
        //console.log(res);
        return dbHelper.sqlSelect(sqlText, res);
    },
    // TODO : 삭제 (사용안함)
    updateWord: function (req, res) {
        var sqlText =
            "   SELECT WORD \n" +
            "   FROM TBL_SYNONYM \n" +
            "   WHERE WORD LIKE '%" + req.body[0].word + "%' \n";

        dbHelper.sqlSelect(sqlText, res)


        console.log(res);

        var sqlText =
            "       UPDATE TBL_SYNONYM SET "
            + "     SYNONYM = " + req.query.synonym + "\n"
            + "     WHERE WORD LIKE '%" + req.query.word + "%' \n";

        return dbHelper.sqlExecute(sqlText, res);
    },
    /**
    * summary: 유의어 목록 조회
    */
    selectWordSynonList: function (req, res) {
        //var wordParam = req.query.word;
        //var sqlText =
        //    //"       SELECT ISNULL(VBELN,' ') AS VBELN, ISNULL(VBELN_SEQ,' ') AS VBELN_SEQ, KUNNR, KNAME1,KUNN2, KNAME2, VDATU, ISNULL(REPLACE(INFORM,'', ' '),' ') AS INFORM, MATNR, MAKTX, KWMENGE, VRKME, ISNULL(EMP_NO,' ') AS EMP_NO, ISNULL(REGDATE,' ') AS REGDATE FROM VOS_ORDER \n";
        //    "SELECT	VBELN, KUNNR, KNAME1, KUNN2, KNAME2, VDATU, INFORM, MATNR, MAKTX, KWMENGE, VRKME, EMP_NO, REGDATE, API_FLAG \n"
        //    + " FROM	VOS_ORDER \n"
        //    + " FOR XML AUTO, ELEMENTS  \n";

        //return dbHelper.sqlSelect(sqlText, res);

        process.on('uncaughtException', function (err) {
            //예상치 못한 예외 처리
            console.log('uncaughtException 발생 : ' + err);
        });

        sql.close();

        var result = sql.connect(dbConfig, function (err) {
            if (err) console.log(err);
            // create Request object
            var request = new sql.Request();
            // query to the database and execute procedure 
            let query = "exec sp_jedang_api 1 ";
            console.log(query)
            request.query(query, function (err, recordset) {
                if (err) {
                    console.log(err);
                    sql.close();
                }
                sql.close();
                var jsonToXml = convert({ 'items': recordset.recordsets[0] }, { header: true });
                //var jsonToXml = convert({ 'items': val }, { header: true });
                jsonToXml = jsonToXml.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");

                res.send(jsonToXml);
                //return dbHelper.sqlSelect(sqlText, recordset);
            });
        });

    },
    /**
    * summary: 유의어 스코어 수정 (+1)
    */
    updateWordSynonScore: function (req, res) {
        var sqlText = [];
        sqlText.push(
            "       UPDATE  TBL_WORD_SYNON_SCORE \n"
            + "     SET     WORD_SYNON_SCORE = (WORD_SYNON_SCORE + 1) \n"
            + "     WHERE   WORD = '" + req.body[0].word + "' \n"
            + "     AND     WORD_SYNON = '" + req.body[0].wordSynon + "' \n"
        );

        return dbHelper.sqlExecute(sqlText, res)
    },
    /**
    * summary: 유의어 등록
    */
    insertWordSynonScore: function (req, res) {
        var sqlText = [];

        process.on('uncaughtException', function (err) {
            //예상치 못한 예외 처리
            console.log('uncaughtException 발생 : ' + err);
        });

        sql.close();

        var result = sql.connect(dbConfig, function () {
            var request = new sql.Request();

            //parameter input
            request.input('word', req.body[0].word);
            request.input('synonym', req.body[0].wordSynon);
            //parameter output
            request.output('outValue', sql.VarChar(100));
            //procedure exec
            request.execute('sp_insertSynonym', (err, result) => {
                if (err) console.log(err);

                console.log(result.output.outValue)
                sqlText.push("SELECT '" + result.output.outValue + "' AS OUTVALUE");
                return dbHelper.sqlSelect(sqlText, res);
            });
        });
    }
};