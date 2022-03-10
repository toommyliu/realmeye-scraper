import fetch from '../util/fetch';
import { load } from 'cheerio';

import { REALMEYE_URL } from '../constants';

import { scrapeCharacters } from './player/scrapeCharacters';
import { scrapeDungeonCompletions } from './player/scrapeDungeonCompletions';
import { scrapeDescription } from './player/scrapeDescription';

import type { RealmEyePlayerData } from './types/RealmeyePlayer';

export async function scrapePlayer(playerName: string) {
	const url = `${REALMEYE_URL}/player/${playerName}`;

	const req = await fetch(url);
	const res = await req.send();

	if (!(res.statusCode! >= 200 && res.statusCode! < 300)) {
		throw new Error(`Code '${res.statusCode!}' while fetching '${playerName}'`);
	}

	const html = await res.text();

	const $ = load(html);
	const container = $('.container');

	const notFound = $('.player-not-found', container);
	if (notFound.length) {
		throw new Error(`'${playerName}' has a private profile or does not exist`);
	}

	const name = $('div h1 .entity-name', container).text();

	const data: RealmEyePlayerData = {
		name: name,
		realmEyeUrl: url,
	};

	try {
		data.dungeonCompletions = await scrapeDungeonCompletions(playerName);
		data.characters = await scrapeCharacters($, container);
	} catch {}

	data.description = scrapeDescription($, container);
	return data;
}
