export default class Api {
	//Get запрос
	getRequest = async (url, method = 'GET') => {
		const res = await fetch(url, { method: method });
		return res.json();
	};

	//Post запрос
	sendFormData = async (url, body) => {
		const res = await fetch(url, {
			method: 'POST',
			body: body,
		});
		return res.json();
	};

	//Json запрос
	sendJson = async (url, body, headers) => {
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(body),
			headers: headers,
		});
		return res.json();
	};

	sendTest = async (data) => {
		return await this.sendFormData(`/Process/Financial/Validate`, data);
	};

	resendCode = async () => {
		return await this.getRequest(`/Identity/ResendCode`);
	};

	getProcessFinancialSendCode = async () => {
		return await this.getRequest(`/Process/Financial/SendCode`, 'POST');
	};

	getFiasAddress = async (data) => {
		const headers = {
			'Content-Type': 'application/json;charset=utf-8',
			Authorization: 'Token da2ae6e7b242425e832c759ba800deb04f219607',
		};

		return await this.sendJson(`https://data.pbprog.ru/api/address/full-address/parse`, data, headers);
	};
}
