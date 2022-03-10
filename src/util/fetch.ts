import petitio from 'petitio';
import { USER_AGENT } from '../constants';

export default (url: string) => {
	const req = petitio(url);
	req.header('user-agent', USER_AGENT);

	return req;
};
