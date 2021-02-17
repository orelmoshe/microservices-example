import jwt from 'jsonwebtoken';
import config from '../config';
import { HttpCodes } from '../shared';
import logger from '../logger';

const verifyToken = (req, res, next) => {
	try {
		const token = req.headers['authorization'] || '';
		if (!token) {
			logger.error(`You need to Login | ${new Date().toUTCString()}`);
			return res.status(HttpCodes.UNAUTHORIZE).json('You need to Login');
		}
		const decrypt = jwt.verify(token, config.secret);
		req.user = { id: decrypt.id };
		next();
	} catch (err) {
		logger.error(`${err.toString()} | ${new Date().toUTCString()}`);
		return res.status(HttpCodes.ERROR).json(err.toString());
	}
};

export default verifyToken;
