import AxiosService from './axios.service';

const prefix = 'http://localhost:3001';
const ApiRoutes = {
	GET_SETTINGS: `${prefix}/get-settings`,
	ADD_SETTING: `${prefix}/add-setting`,
	SET_SETTING: `${prefix}/set-setting`,
	DELETE_SETTING: `${prefix}/delete-setting`,
};

export default class HttpService {
	static instance;
	axiosService;

	constructor() {
		if (HttpService.instance) {
			return HttpService.instance;
		}
		HttpService.instance = this;
		this.axiosService = new AxiosService();
	}

	getData = async () => {
		try {
			const response = await this.axiosService.get(ApiRoutes.GET_SETTINGS, {});
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	};

	addData = async (encryptJson) => {
		try {
			const response = await this.axiosService.post(ApiRoutes.ADD_SETTING, { encryptJson });
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	};

	setData = async (encryptJson) => {
		try {
			const response = await this.axiosService.put(ApiRoutes.SET_SETTING, { encryptJson });
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	};

	deleteData = async (encryptJson) => {
		try {
			const response = await this.axiosService.delete(`${ApiRoutes.DELETE_SETTING}/${encryptJson}`);
			return response;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	};
}
