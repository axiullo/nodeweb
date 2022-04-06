const express = require('express')
const app = express()

//app.use(express.bodyParser());
//app.use(express.urlencoded());

let env = app.get('env')
console.log("env is %s", env)

// 只用于开发环境
if ('development' == env) {
  app.set('title', 'My Site dev');
}

// 只用于生产环境
if ('production' == env) {
  app.set('title', 'My Site');
}

app.use(express.static(__dirname + '/public')); //设置根目录

app.use(function(req, res, next){
	console.log("%s %s", req.method, req.url);
	next();
});


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use("/title", function(req, res){
	let title = app.get("title")
	res.send("cur title " + title)
})

const port = 3000
app.listen(port)
console.log("web server start port %s", port);
