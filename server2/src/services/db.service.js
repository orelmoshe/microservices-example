import mongoose from 'mongoose';
import Setting from '../models/setting';
import 'babel-polyfill';

export default class DBService {
	static instance;

	constructor() {
		if (DBService.instance) {
			return DBService.instance;
		}
		DBService.instance = this;
	}

	connection(name_db) {
		mongoose.connect(`mongodb://localhost/${name_db}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
	}

	async getSettings() {
		try {
			const settingList = await Setting.find({});
			return settingList;
		} catch (error) {
			throw 'Failed to get all settings';
		}
	}

	async createSetting(setting) {
		try {
			const newSetting = new Setting(setting);
			await newSetting.save();
		} catch (error) {
			throw 'Failed to add setting';
		}
	}

	async deleteSetting(key) {
		try {
			const currentSetting = await Setting.findOne({ key: key });
			await currentSetting.deleteOne();
		} catch (error) {
			throw 'Failed to delete setting';
		}
	}

	async setSetting(setting) {
		try {
			await Setting.updateOne(
				{ key: setting.key },
				{
					$set: setting
				}
			);
		} catch (error) {
			throw 'Failed to set setting';
		}
	}
}
