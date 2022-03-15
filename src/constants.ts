import petitio from 'petitio';

export const REALMEYE_URL = 'https://www.realmeye.com';
export const USER_AGENT =
	'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36';

export const fetch = (url: string) => {
	const req = petitio(url);
	req.header('user-agent', USER_AGENT);

	return req;
};
