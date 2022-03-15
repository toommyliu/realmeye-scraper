import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../../constants';
import { scrapeCharacters } from '../player/scrapeCharacters';

import type { RealmeyeGuildData } from '../types/RealmeyeGuild';

export async function scrapeTopCharacters(guildName: string, guildData: RealmeyeGuildData) {
	const req = await fetch(`${REALMEYE_URL}/top-characters-of-guild/${guildName}`);
	const res = await req.send();

	if (!(res.statusCode! >= 200 && res.statusCode! < 300)) {
		throw new Error(`Code '${res.statusCode!}' while fetching '${guildName}' top characters`);
	}

	const html = await res.text();
	const $ = load(html);

	const container = $('.container');
	guildData.topCharacters = scrapeCharacters($, container, 'guild');
}
