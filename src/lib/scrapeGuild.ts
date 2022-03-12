import fetch from '../util/fetch';
import { load } from 'cheerio';

import { REALMEYE_URL } from '../constants';

import { scrapeDescription } from './player/scrapeDescription';
import { scrapeTopCharacters } from './guild/scrapeTopCharacters';
import { scrapeGuildTable } from './guild/scrapeGuildTable';

import type { RealmeyeGuildData } from './types/RealmeyeGuild';
import { scrapeGuildMembers } from './guild/scrapeGuildMembers';

export async function scrapeGuild(guildName: string) {
	guildName = guildName.replace(/\s/g, '%20');

	const url = `${REALMEYE_URL}/guild/${guildName}`;

	const req = await fetch(url);
	const res = await req.send();

	if (!(res.statusCode! >= 200 && res.statusCode! < 300)) {
		throw new Error(`Code '${res.statusCode!}' while fetching '${guildName}'`);
	}

	const html = await res.text();

	const $ = load(html);
	const container = $('.container');
	const guildNotFound = $('.col-md-12 > h2', container).first();
	if (/^sorry.*/i.exec(guildNotFound.text())) {
		throw new Error(`Guild '${guildName}' could not be found`);
	}

	const data: RealmeyeGuildData = {
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
