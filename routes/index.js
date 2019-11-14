const express = require("express");
let router = express.Router();
let User = require("../models/users");

router.get("/", function (req, res, next) {
    res.render("login");
})
    .get("/login", function (req, res) {
        res.render("login",{session:req.session.username});
    })
    .get("/register", function (req, res) {
        res.render("register");
    })
    .post("/login", function (req, res) {
        console.log("req.body", req.body);
        let data={};
        let postData = {
            username: req.body.username,
            password: req.body.password,
        };
        User.findOne({
            username: postData.username,
            password: postData.password,
        }, function (err, data) {
            if (err) {
                res.send("用户不存在")
            }
            if (data) {
                res.send("登录成功")
            } else {
                res.send("账号或密码错误")
            }

        })
    })
    .post("/register", function (req, res) {
        let postData = {
            username: req.body.username,
            password: req.body.password,
        };
        User.findOne({username: postData.username}, function (err, data) {
            if (data) {
                res.send("用户名已经被注册");

            } else {
                User.create(postData, function (err, data) {
                    if (err) throw err;
                    res.send("注册成功");
                    req.session.username=data;
                    console.log(req.session.username);
                })
            }
        })
    })
    .get("/userlist", function (req, res) {
        let userList = User.find({}, function (err, data) {
            if (err) throw err;
            res.send(data)
        });
    });
module.exports =router;
