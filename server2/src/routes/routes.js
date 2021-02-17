import express from 'express';
import SettingsController from '../controllers/settings.controller.js';
const router = express.Router();

// CRUD API
const settingsController = new SettingsController();

router.get('/get-settings', settingsController.getSettings);
router.post('/add-setting', settingsController.createSetting);
router.put('/set-setting', settingsController.updateSetting);
router.delete('/delete-setting/:id', settingsController.deleteSetting);

export default router;
