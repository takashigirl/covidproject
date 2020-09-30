function insertNewUser(name, email, password, address, phonenumber) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = "insert into user (name,email,password,address,phonenumber) values('";
  var sql2 = name + "','" + email + "','" + password + "','" + address + "','" + phonenumber + "')";
  var sql = sql1 + sql2;
  console.log(sql);

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(fields);
      con.end();
    });

  });
};

function updateNewUserVerified(email, verified) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = 'UPDATE USER SET verified =' + verified;
  var sql2 = " WHERE email = '" + email + "'";
  var sql = sql1 + sql2;
  console.log(sql)
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(fields);
      con.end();
    });

  });
}

function checkPassword(email, password, callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = 'SELECT password FROM USER';
  var sql2 = " WHERE email = '" + email + "'";
  var sql = sql1 + sql2;
  console.log(sql)
  con.connect(function (err) {
    if (err) throw callback(err);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      var rows = JSON.parse(JSON.stringify(result[0]));
      console.log(rows);
      if (rows.password == password) {
        console.log('OK');
        callback(null, 1);
      }
      else {
        console.log('NOK')
        callback(null, 0)
      }
      con.end();
    });

  });


}



//organization//
function insertNewUser(companyname, address, phonenumber, email) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = "insert into orginazationform (companyname,address,phonenumber,email) values('";
  var sql2 = companyname + "','" + address + "','" + phonenumber + "','" + email + "')";
  var sql = sql1 + sql2;
  console.log(sql);

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log('### Inserting into DB - RESULTS',result);
      console.log('FIELDS',fields);
      con.end();
    });
  });
};

//sendlocationID
function getLocationID(companyname, email, sentLocationIDEmail) {
  var mysql = require('mysql');
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = 'SELECT locationID FROM orginazationform ';
  var sql2 = " WHERE companyname = '" + companyname + "'";
  var sql = sql1 + sql2;
  console.log(sql);

  var resultInJSON;
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      resultInJSON = JSON.parse(JSON.stringify(result[0]))
    console.log(result);
      console.log('resultInJSON in DB connect', resultInJSON.locationID);
      sentLocationIDEmail(companyname, email, resultInJSON.locationID);
      con.end();
    });
  });
};

//sendlocationID

function updateNewUserVerified(email, verified) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = 'UPDATE  ORGANIZATIONFORM SET verified =' + verified;
  var sql2 = " WHERE email = '" + email + "'";
  var sql = sql1 + sql2;

  console.log(sql)
  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(fields);
      con.end();
    });

  });
}


// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Passw0rd1",
//   database: "covid"
// });

// var sql1 = "insert into user (name,email,password,address,phonenumber) values('";
// var sql2 = name+"','"+email+"','"+password+"','"+address+"','" + phonenumber +"')";
// var sql = sql1 + sql2;
// console.log(sql); 

// con.connect(function(err) {
//   if (err) throw err;
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     console.log(fields);
//     con.end();
//   });

// });

//checkin
// function checklocationID(locationID,callback) {
//   var mysql = require('mysql');

//   var con = mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "Passw0rd1",
//       database: "covid"
//     });

//     var sql1 = 'SELECT locationID FROM  ORGINAZATIONFORM';
//     var sql2 = " WHERE locationID = '"+ locationID + "'" ;
//     var sql = sql1 + sql2; 
//     console.log(sql)
//     con.connect(function(err) {
//       if (err) throw callback(err);
//       con.query(sql, function (err, result, fields) {
//         if (err) throw err;
//         var rows = JSON.parse(JSON.stringify(result[0]));
//         console.log(rows);
//         if (rows.password == password) {
//           console.log('OK');
//           callback(null,1);
//         } 
//         else {
//           console.log('NOK')
//           callback(null,0)
//         }
//         con.end();
//       });

//     });


// }


function insertCheckIn(locationID, email,callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });
  
  var today = new Date();
  let [month, day, year] = ( today.toLocaleDateString().split('/'))
  let [hour, minutes, second] = ( today.toLocaleTimeString().slice(0,7).split(':'))
  var date = year +'-'+month+'-'+day
  hour = today.getHours();
  
  var time1 = hour +':'+minutes+':'+second
  console.log(date, time1);
  

  var sql1 = "insert into eventtable (locationID,email,time,date) values(";
  var sql2 = locationID + ",'" + email + "','" + time1+ "','" + date + "')";
  
  var sql = sql1 + sql2;
  console.log(sql)
  con.connect(function (err) {
    if (err) throw callback(err);
    con.query(sql, function (err, result, fields) {
      if (err) callback(err);
      else callback(null, 1)
      con.end();
    });

  });


}

//checkinfo

function checkInfo(locationID, time,date,callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });
  
  

  var sql1 = "select from eventtable (locationID,email,time,date) values(";
  var sql2 = locationID + "','" + time+ "','" + date + "')";
  
  var sql = sql1 + sql2;
  console.log(sql)
  con.connect(function (err) {
    if (err) throw callback(err);
    con.query(sql, function (err, result, fields) {
      if (err) callback(err);
      else callback(null, 1)
      con.end();
    });

  });


}

function checkUniqueEmail(email) {
  console.log('checkUniqueEmail');
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Passw0rd1",
    database: "covid"
  });

  var sql1 = 'SELECT * FROM USER';
  var sql2 = " WHERE email= '" + trim(email) + "'";
  var sql = sql1 + sql2;

  con.connect(function (err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      var rows = JSON.parse(JSON.stringify(results[0]));
      console.log(rows);
      if (result) {
        return false;
      }
      else {
        return true;
      }
      con.end();
    });

  });
}

module.exports = {
  insertNewUser,
  updateNewUserVerified,
  // insertOrgUser,
  // updateNewOrgVerified,
  checkUniqueEmail,
  insertCheckIn,
  checkPassword,
  checkInfo,
  getLocationID
}

