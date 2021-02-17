const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
	key: { type: String, required: true, unique: true },
	value: { type: String, required: true }
});

module.exports = new mongoose.model('Setting', settingSchema);
