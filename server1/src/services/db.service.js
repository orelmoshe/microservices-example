import mongoose from 'mongoose';
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
}
