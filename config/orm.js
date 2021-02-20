var connection = require("./connection.js");

// pulled from activity 16
function printQuestionMarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}
function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}


// ORMS

var orm = {
    selectAll: function (tableInput, cb) {
        var queryString = "select * from " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function (table, cols, vals, cb) { 
        var queryString = "insert into " + table;

        queryString += " (";
        queryString += cols.tostring();
        queryString += ") ";
        queryString += "values (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) {
                throw err;
        }
        cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        var queryString = "update " + table;

        queryString += "set ";
        queryString += objToSql(objColVals);
        queryString += " where ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result){
            if (err) {
                throw err;
            }
            cb (result);
        });
     },
    deleteOne: function (table, condition, cb) {
        var queryString = "delete from " + table;
        queryString += "wehre ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err){
                throw err
            }
            cb(result);
        });
     }

};

module.exports = orm;