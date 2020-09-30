const http = require('http');
const fs = require('fs');
const url = require('url')
const crypto = require('crypto')
const sendmail = require('./sendmail.js');
const sendLocationIDmail = require('./sendmail');
const db = require('./db.js');
const querystring = require('querystring')
const Cookies = require('cookies')
// const Events = require('events');

const servername = 'localhost';
const port = 8080;

var algorithm = 'aes-256-ctr';
var keys = ['mission ready']

function encrypt(text) {
    var cipher = crypto.createCipher(algorithm, 'hy78TYrwc')
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, 'hy78TYrwc')
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

function doVerifyEmail(req, res) {
    console.log('do verifyEmail');
    var q = url.parse(req.url, true);
    var qdata = q.query;
    console.log(qdata.email);
    db.updateNewUserVerified(qdata.email, 1);
    console.log('data updated');
    res.writeHead(200, {});
    res.write('EMail Verified.');
    res.end();
}

function doApi(req, res) {
    console.log('doApi');
    var q = url.parse(req.url, true);
    console.log(q.href.substring(0, 16));
    if (q.href.substring(0, 16) == '/api/verifyEmail') {
        doVerifyEmail(req, res);
    }
}

function doGetFile(req, res) {
    var q = url.parse(req.url, true);
    fileName = '.' + q.href;
    console.log(fileName);
    if (fileName === './') { fileName = './html/index.html' };
    // read the file
    fs.readFile(fileName, function (err, data) {
        if (err) {
            res.writeHead(404, {});
            res.write(fileName + ' not found');
            res.end();
        } else {
            if (/.*.jpg/.test(fileName)) {
                res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' })
            }
            res.write(data);
            res.end();
        }
    });
}

function doGet(req, res) {
    var q = url.parse(req.url, true);
    if (q.href.substring(0, 5) == '/api/') { doApi(req, res); }
    else doGetFile(req, res);

}

function doRegistration(req, res) {
    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk
    });
    req.on('end', function () {
        console.log(rawData)
        obj = JSON.parse(rawData);
        console.log(obj.name);
        console.log(obj.email);
        console.log(obj.password);
        console.log(obj.address);
        console.log(obj.phonenumber);

        sendmail.sendMail(obj.email, servername, port);
        console.log('email sent to : ' + obj.email);
        encryptedPW = encrypt(obj.password);
        console.log(encryptedPW);
        db.insertNewUser(obj.name, obj.email, encryptedPW, obj.address, obj.phonenumber);
        console.log('record inserted to db');
    });

    res.writeHead(200, {});
    res.write('You are almost done. We have sent you an email to the email address that you use for registration');
    res.end();
}

function doOrganization(req, res) {
    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk
    });
    req.on('end', function () {
        console.log('******rawData', rawData)
        obj = JSON.parse(rawData);
        console.log(obj.companyname);
        console.log(obj.address);
        console.log(obj.phonenumber);
        console.log(obj.email);

        sendmail.sendMail(obj.email, servername, port);
        console.log('email sent to : ' + obj.email);
        // encryptedPW = encrypt(obj.password);
        // console.log(encryptedPW);
        db.insertNewUser(obj.companyname, obj.address, obj.phonenumber, obj.email);
        console.log('record inserted to db');

        console.log('obj.locationID *******', obj.locationID)
        console.log('locationID sent to : ' + obj.email);
        db.getLocationID(obj.companyname, obj.email, sentLocationIDEmail)
        // encryptedPW = encrypt(obj.password);
        // console.log(encryptedPW);
        // {let rawData = '';
        // req.on('data', function(chunk)  {
        //     rawData += chunk
        // });
        // req.on('end', function()  {
        //     obj = JSON.parse(rawData)
        //     console.log(obj.locationID)
        //     console.log(obj.companyname)
        // })
    });
    res.writeHead(200, {});
    res.write('You are almost done. We have sent you an email to the email address that you use for registration');
    res.end();
}

function sentLocationIDEmail (companyname, email, locationID) {
    console.log('sentLocationIDEmail', {companyname, email, locationID})
    sendmail.sendLocationIDmail(companyname, locationID, email);
    console.log('locationID send to: ' + locationID);
}
//dosendlocationID
// function dosendlocationID(req,res) {

//     let rawData = '';
//     req.on('data', function(chunk)  {
//         rawData += chunk
//     });
//     req.on('end', function()  {
//         let parsedData = querystring.decode(rawData)
//         console.log(parsedData); 
//         obj = JSON.parse(rawData);
//         console.log(obj.companyname);
//         console.log(obj.locationID);

//         db.getLocationID(obj.companyname,obj.locationID, function (err1,result) {
//             console.log('get locationID'+obj.locationID);
//             sendmail.sendLocationIDmail(obj.companyname,obj.locationID)
//             console.log('locationID send to: '+ obj.locationID);
//         });
//     });
// } 



//




function doCheckIn(req, res, cookies) {
    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk
    });
    req.on('end', function () {
        console.log('rawData',rawData)
        obj = JSON.parse(rawData)
        console.log('+++++++locationID ' + obj.locationID)
        var email = cookies.get('email', { signed: true })
        console.log(email);

        db.insertCheckIn(obj.locationID,email, function (err, result) {
            if (err) {
                console.log("NOK");
                res.writeHead(500,{})
            };
            if (result) {
                console.log('OK 1')
                res.writeHead(200, {});
                res.write(JSON.stringify({ "status": "200" }))
            }
            else {
                console.log('NOK 1')
                res.writeHead(500, {});
                res.write(JSON.stringify({ "status": "500" }))
            }
            res.end();
        })
    });
}

function doLogin(req, res, cookies) {

    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk
    });
    req.on('end', function () {
        let parsedData = querystring.decode(rawData)
        console.log(parsedData);
        obj = JSON.parse(rawData);
        console.log(obj.email);
        console.log(obj.password);
        encryptedPW = encrypt(obj.password)
        console.log(encryptedPW)
        db.checkPassword(obj.email, encryptedPW, function (err1, result) {
            if (err1) throw err1;
            if (result) {
                cookies.set('email', obj.email, { signed: true })
                console.log('OK 1')
                res.writeHead(200, {});
                res.write(JSON.stringify({ "status": "200" }))
            }
            else {
                console.log('NOK 1')
                res.writeHead(401, {});
                res.write(JSON.stringify({ "status": "401" }))
            }
            res.end();
        });
    });
}


function docheckinSubmit(req, res) {

    let rawData = '';
    req.on('data', function (chunk) {
        rawData += chunk
    });
    req.on('end', function () {
        let parsedData = querystring.decode(rawData)
        console.log(parsedData);
        obj = JSON.parse(rawData);
        console.log(obj.locationID);
        console.log(obj.date);
        console.log(obj.time)
        
        db.checkInfo(obj.locationID,date,time, function (err, result) {
            if (err) {
                console.log("NOK");
                res.writeHead(500,{})
            };
            if (result) {
                console.log('OK 1')
                res.writeHead(200, {});
                res.write(JSON.stringify({ "status": "200" }))
            }
            else {
                console.log('NOK 1')
                res.writeHead(500, {});
                res.write(JSON.stringify({ "status": "500" }))
            }
            res.end();
        })
    });
}
function doPost(req, res, cookies) {
    console.log('received a post');
    if (req.url == '/registration') { doRegistration(req, res) }
    if (req.url == '/organization') { doOrganization(req, res) }
    if (req.url == '/checkIn') { doCheckIn(req, res, cookies) }
    if (req.url == '/login') { doLogin(req, res, cookies) }
    if (req.url == '/checkinSubmit') { docheckinSubmit(req, res, cookies) }
    // if (req.url == '/organization') {dosendlocationID(req,res,cookies)}


};

// create server
const server = http.createServer(function (req, res) {
    // Create a cookies object
    var cookies = new Cookies(req, res, { keys: keys })
    if (req.method === 'GET') { doGet(req, res, cookies) };
    if (req.method === 'POST') { doPost(req, res, cookies) };
});

server.listen(port, function () {
    console.log('server started at ' + servername + ':' + port);
});
