import { HttpCodes } from '../shared';
import joi from '@hapi/joi';
import logger from '../logger';
import CryptoJS from 'crypto-js';
import config from '../config';
import DBService from '../services/db.service';
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
			const db = new DBService();
			const settings = await db.getSettings();
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
				encryptJson: joi.string().required()
			});
			const result = schema.validate(req.body);
			if (result.error) {
				throw result.error.message;
			}
			const bytes = CryptoJS.AES.decrypt(req.body.encryptJson, config.secret);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			const db = new DBService();
			await db.createSetting(decryptedData);
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
				encryptJson: joi.string().required()
			});
			const result = schema.validate(req.body);
			if (result.error) {
				throw result.error.message;
			}
			const bytes = CryptoJS.AES.decrypt(req.body.encryptJson, config.secret);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			const db = new DBService();
			await db.setSetting(decryptedData);
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
			const bytes = CryptoJS.AES.decrypt(req.params.id, config.secret);
			const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
			const db = new DBService();
			await db.deleteSetting(decryptedData);
			logger.info(`delete setting | ${new Date().toUTCString()}`);
			res.status(HttpCodes.OK).json({ message: 'OK' });
		} catch (ex) {
			logger.error(`${ex} | ${new Date().toUTCString()}`);
			res.status(HttpCodes.ERROR).json({ message: ex });
		}
	}
}

export default SettingsController;
