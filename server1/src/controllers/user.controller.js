import { HttpCodes } from '../shared';
import joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/users';
import logger from '../logger';
class UserController {
	static instance;

	constructor() {
		if (UserController.instance) {
			return UserController.instance;
		}
		UserController.instance = this;
	}

	register(req, res) {
		try {
			const schema = joi.object().keys({
				username: joi.string().required(),
				password: joi.string().required()
			});

			const result = schema.validate(req.body);
			if (result.error) {
				throw result.error.message;
			}

			User.create(
				{
					username: req.body.username,
					password: req.body.password
				},
				function(err, user) {
					if (err) throw 'There was a problem registering the user`.';

					var token = jwt.sign({ id: user._id }, config.secret, {
						expiresIn: 86400 // expires in 24 hours
					});
					res.setHeader('authorization', token);
					logger.info(`${req.body.username} register | ${new Date().toUTCString()}`);
					res.status(HttpCodes.OK).json({ massage: 'OK' });
				}
			);
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	login(req, res) {
		try {
			const schema = joi.object().keys({
				username: joi.string().required(),
				password: joi.string().required()
			});

			const result = schema.validate(req.body);
			if (result.error) {
				throw result.error.message;
			}

			User.findOne({ username: req.body.username }, async (err, user) => {
				if (err) throw 'Error on the server.';
				if (!user) throw 'No user found.';

				const passwordIsValid = await user.checkPassword(req.body.password);
				if (!passwordIsValid) {
					logger.error(`Wrong password | ${new Date().toUTCString()}`);
					return res.status(HttpCodes.UNAUTHORIZE).json({ auth: false, token: null });
				}

				const token = jwt.sign({ id: user._id }, config.secret, {
					expiresIn: 86400 // expires in 24 hours
				});
				res.setHeader('authorization', token);
				logger.info(`${req.body.username} login | ${new Date().toUTCString()}`);
				res.status(HttpCodes.OK).json({ massage: 'OK' });
			});
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}
}

export default UserController;
