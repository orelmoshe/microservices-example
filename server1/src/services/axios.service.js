import axios from 'axios';
import { HttpCodes } from '../shared';

export default class AxiosService {
	static instance;

	constructor() {
		if (AxiosService.instance) {
			return AxiosService.instance;
		}
		AxiosService.instance = this;
	}

	defaultOnError = (err) => {
		if (!err) {
			return;
		}
		let ex = '';
		if (err.status === HttpCodes.BAD_REQUEST) {
			ex = 'got status 400 - bad request';
			console.error(ex);
			throw ex;
		} else if (err.status === HttpCodes.UNAUTHORIZE) {
			ex = 'got status 401 - unauthorized';
			console.error(ex);
			throw ex;
		} else if (err.status === HttpCodes.NOT_FOUND) {
			ex = 'got status 404 - not found';
			console.error(ex);
			throw ex;
		}
		console.error('Error: ', err);
		throw ex;
	};

	defaultOnSuccess = (response) => {
		// console.log('response ?', response);
		return response;
	};

	get = async (route, params, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		try {
			const response = await axios.get(route, params);
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};

	post = async (route, params, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		const options = {
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await axios.post(route, params, options || {});
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};

	put = async (route, params, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		const options = {
			headers: { 'Content-Type': 'application/json' },
		};
		try {
			const response = await axios.put(route, params, options || {});
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};

	delete = async (route, onSuccess, onError) => {
		if (!onSuccess) {
			onSuccess = this.defaultOnSuccess;
		}
		if (!onError) {
			onError = this.defaultOnError;
		}
		try {
			const response = await axios.delete(route);
			return onSuccess(response.data);
		} catch (error) {
			onError(error);
		}
	};
}
