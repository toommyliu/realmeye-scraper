import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../constants';

import { scrapeDescription } from './player/scrapeDescription';
import { scrapeTopCharacters } from './guild/scrapeTopCharacters';
import { scrapeGuildTable } from './guild/scrapeGuildTable';
import { scrapeGuildMembers } from './guild/scrapeGuildMembers';

import type { RealmeyeGuild } from './types/RealmeyeGuild';

export async function scrapeGuild(guildName: string) {
	guildName = guildName.replace(/\s/g, '%20');

	const url = `${REALMEYE_URL}/guild/${guildName}`;

	const req = await fetch(url);
	const html = await req.text();
	const $ = load(html);

	const container = $('.container');
	const guildNotFound = $('.col-md-12 > h2', container).first();
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (/^sorry.*/i.exec(guildNotFound?.text())) {
		throw new Error('Guild not found');
	}

	const data: RealmeyeGuild = {
		name: guildName,
		realmEyeUrl: url,
	};

	scrapeGuildTable($, container, data);
	scrapeGuildMembers($, container, data);

	try {
		await scrapeTopCharacters(guildName, data);
	} catch {}

	data.description = scrapeDescription($, container);
	return data;
}
