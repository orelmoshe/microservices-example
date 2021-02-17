const express = require('express');
const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/.'));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use('/ping', (req,res)=>{
    res.status(200).json('pong')
});

app.use('/server1', function(req, res) {
    console.log('redirecting to Server1');
    apiProxy.web(req, res, {target: `http://localhost:3001/server1`});
});

app.use('/server2', function(req, res) {
    console.log('redirecting to Server2');
    apiProxy.web(req, res, {target: `http://localhost:3002/server2`});
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});