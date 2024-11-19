import instance from "./instance";

export async function getChallenges(query) {
	try {
		const result = await instance.get(`/challenges`, {params: query});
		return result?.data;
	} catch (err) {
		console.error(err);
		return err?.response?.data || err;
	}
}

export async function getChallengeWithId(id) {
	try {
		const result = await instance.get(`/challenges/${id}`);
		return result?.data;
	} catch (err) {
		console.error(err);
		return err?.response?.data || err;
	}
}
