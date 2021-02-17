import express from 'express';
import router from './routes/routes';
import logger from './logger';
import DBService from './services/db.service';

const app = express();
const PORT = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

app.use('/server1', router);

app.listen(process.env.PORT || PORT, () => {
	try {
		console.log(`server listening on port ${PORT}`);
		logger.info(`start server | ${new Date().toUTCString()}`);
		const db = new DBService();
		db.connection('micro-service-example');
		logger.info(`success db connection | ${new Date().toUTCString()}`);
	} catch (ex) {
		console.error(ex);
		logger.error(`${ex} | ${new Date().toUTCString()}`);
		process.exit(1);
	}
});

export default app;
