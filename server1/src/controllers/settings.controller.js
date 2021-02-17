import { HttpCodes } from '../shared';
import joi from '@hapi/joi';
import HttpService from '../services/http.service';
import logger from '../logger';
import CryptoJS from 'crypto-js';
import config from '../config';
import 'babel-polyfill';

class SettingsController {
	static instance;

	constructor() {
		if (SettingsController.instance) {
			return SettingsController.instance;
		}
		SettingsController.instance = this;
	}

	async getSettings(req, res) {
		try {
			const httpService = new HttpService();
			const settings = await httpService.getData();
			if (!settings) {
				throw 'Field get settings';
			}
			logger.info(`get settings | ${new Date().toUTCString()}`);
			res.status(HttpCodes.OK).json(settings);
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async createSetting(req, res) {
		try {
			const schema = joi.object().keys({
				key: joi.string().required(),
				value: joi.string().required()
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}
			const myEncryptJson = CryptoJS.AES.encrypt(JSON.stringify(req.body),config.secret).toString();
			const httpService = new HttpService();
			const response = await httpService.addData(myEncryptJson);
			if (response.message !== 'OK') {
				throw 'Field create setting';
			}
			logger.info(`create new setting | ${new Date().toUTCString()}`);
			res.status(HttpCodes.CREATED).json({ message: 'OK' });
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async updateSetting(req, res) {
		try {
			const schema = joi.object().keys({
				key: joi.string().required(),
				value: joi.string().required()
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}
			const myEncryptJson = CryptoJS.AES.encrypt(JSON.stringify(req.body),config.secret).toString();
			const httpService = new HttpService();
			const response = await httpService.setData(myEncryptJson);
			if (response.message !== 'OK') {
				throw 'Field update setting';
			}
			logger.info(`update setting | ${new Date().toUTCString()}`);

			res.status(HttpCodes.OK).json({ message: 'OK' });
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}

	async deleteSetting(req, res) {
		try {
			if (!req.params.id) {
				throw 'key is required';
			}
			const myEncryptJson = CryptoJS.AES.encrypt(JSON.stringify(req.params.id),config.secret).toString();
			const httpService = new HttpService();
			const response = await httpService.deleteData(myEncryptJson);
			if (response.message !== 'OK') {
				throw 'Field delete setting';
			}
			logger.info(`delete setting | ${new Date().toUTCString()}`);
			res.status(HttpCodes.OK).json({ message: 'OK' });
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}
}

export default SettingsController;
