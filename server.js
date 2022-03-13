var express = require('express');
var bodyparser = require('body-parser');
var cookieparser = require('cookie-parser');
var multer = require('multer');
const User = require('./models/User');
var Task = require("./models/Task");
const Database = require('./models/Database');
var app = express();

app.use(express.static('public'));
app.use(express.static('Pages'));
app.use(express.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/Pages/login.html");
});

// app.get('/restration', function (req, res) {
//     res.sendFile(__dirname + "/"+ "Pages/registration.html");
// });

app.get('/user', function (req, res) {
    res.sendFile(__dirname + "/Pages/user.html");
});

app.post('/register', async (req, res) => {
    let body = req.body;
    let user = new User.User();
    user.id = 0;
    user.name = body.data.name;
    user.email = body.data.email;
    user.password = body.data.password;
    user.register().then(result => {
        let data = {
            "data": {
                "id": result.insertId,
                "status": "success"
            }
        };
        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
        });
});

app.post('/login', async (req, res) => {
    let body = req.body;
    let user = new User.User();
    user.email = body.data.email;
    user.password = body.data.password;
    user.login().then(result => {
        let data = {
            "status": "fail"
        }
        if (result.length != 0) {
            data = {
                "status": "success",
                "data": result
            }
        }
        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                "status": "fail"
            }
            res.end(JSON.stringify(data));
        });
});

app.post('/savetask', async (req, res) => {
    let body = req.body;
    let tasks = new Task.Task();
    tasks.id = body.data.id;
    tasks.userid = body.data.userid;
    tasks.tdate = body.data.tdate;
    tasks.ttime = body.data.ttime;
    tasks.task = body.data.task;
    tasks.status = body.data.status;
    tasks.save().then(result => {

        let data = {
            "status": "success",
            "data": result
        }

        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
            console.log(err);
        });
});

app.post('/deletetask', async (req, res) => {
    let body = req.body;
    let tasks = new Task.Task();
    tasks.id = body.data.id;
    tasks.delete().then(result => {

        let data = {
            "status": "success"
        }

        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
            console.log(err);
        });
});

app.post('/changestatus', async (req, res) => {
    let body = req.body;
    let tasks = new Task.Task();
    tasks.id = body.data.id;
    tasks.status = body.data.status;
    tasks.change().then(result => {

        let data = {
            "status": "success"
        }

        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
            console.log(err);
        });
});

app.post('/gettask', async (req, res) => {
    let body = req.body;
    let tasks = new Task.Task();
    tasks.id = body.data.id;
    tasks.gettask().then(result => {

        let data = {
            "status": "success",
            "data": result,
            
        }
        console.log(result);
        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
            console.log(err);
        });
});

app.post('/listtask', async (req, res) => {
    let body = req.body;
    let tasks = new Task.Task();
    tasks.userid = body.data.userid;
    tasks.listtask().then(result => {

        let data = {
            "status": "success",
            "data": result,
            
        }
        console.log(result);
        res.end(JSON.stringify(data));
    },
        err => {
            let data = {
                'data': {
                    "status": "fail"
                }
            };
            res.end(JSON.stringify(data));
            console.log(err);
        });
});

app.listen(4000, function () {
    console.log('Website started');
});