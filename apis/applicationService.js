import instance from "./instance.js";

export async function getApplications(query) {
	try {
		const result = await instance.get(`/applications`, { params: query });
		return result?.data;
	} catch (err) {
		console.error(err);
		return err?.response?.data || err;
	}
}

export async function getApplicationWithId(id) {
	try {
		const result = await instance.get(`/applications/${id}`);
		return result?.data;
	} catch (err) {
		console.error(err);
		return err?.response?.data || err;
	}
}
