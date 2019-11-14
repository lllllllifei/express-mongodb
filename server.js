const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/index");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoStore = require("connect-mongo")(session);
let app = express();
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/capsuleDiary");
let db = mongoose.connection;
db.on("open", function () {
    console.log("MongoDB Connection Successed");
});
db.on("error", function () {
    console.log("MongoDB Connection Error")
});
let store=new mongoStore({
    mongooseConnection:db,
    ttl:7*24*60*60,
    host:"localhost"
});
app.use(cookieParser("testapp"));
app.use(session({
    resave: true, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'admin', //密钥
    name: 'testapp', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    isFirst:1,
    cookie: {
        maxAge: 80000,
        httpOnly:true
    }, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    store:store
}));


//解析表单的插件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));
app.use(cors());

app.set('view engine', 'ejs');
app.use("/", routes);
app.listen(8000, function (err, data) {
    if (err) {
        console.log(err)
    }
    console.log("服务器已经启动")
});



