import express from 'express';
import SettingsController from '../controllers/settings.controller.js';
import UserController from '../controllers/user.controller.js';
import verifyToken from '../middleware/verifyToken';
const router = express.Router();
// users
const userController = new UserController();

router.post('/register', userController.register);
router.post('/login', userController.login);

// CRUD API
const settingsController = new SettingsController();

router.get('/get-settings', verifyToken, settingsController.getSettings);
router.post('/add-setting', verifyToken, settingsController.createSetting);
router.put('/set-setting', verifyToken, settingsController.updateSetting);
router.delete('/delete-setting/:id', verifyToken, settingsController.deleteSetting);

export default router;
