import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../../constants';
import { scrapeCharacters } from '../player/scrapeCharacters';

import type { RealmeyeGuild } from '../types/RealmeyeGuild';

export async function scrapeTopCharacters(guildName: string, guildData: RealmeyeGuild) {
	const req = await fetch(`${REALMEYE_URL}/top-characters-of-guild/${guildName}`);
	const res = await req.send();

	const html = await res.text();
	const $ = load(html);

	const container = $('.container');
	guildData.topCharacters = scrapeCharacters($, container, 'guild');
}
