const e = require('express');
var mysql = require('mysql');

module.exports.readData = readData;

var config = {
    host: '127.0.0.1',
    user: 'root',
    password: '@Big000001',
    database: 'emergency',
    port: 3306,
    ssl: true
};


var connection;

// conn.connect(
//     function (err) { 
//     if (err) { 
//         console.log("!!! Cannot connect !!! Error:");
//         throw err;
//     }
//     else{
//        console.log("Connection established.");
//            queryDatabase();
//     }
// });
function readData(database, table, years, callback){
    config['database'] = database;
    connection = new mysql.createConnection(config);
    var range = "(";
    for(var i = 0; i< years.length; i++){
        if(i == years.length-1)
            range += years[i] + ")";
        else
            range += years[i] + ",";
    }

    console.log(range);
    connection.query("select * from " + table + " where year(施工開始日期) in "+range+" or year(施工結束日期) in "+range, years, (err, results, fields) => {
            if (err) throw err;


            console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('案號: ' + results[i][0]);
            }
            callback(err, results);
            console.log('Done.');
        })
    connection.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.');
    });
};