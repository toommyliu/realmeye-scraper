import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../constants';

import { scrapeCharacters } from './player/scrapeCharacters';
import { scrapeDungeonCompletions } from './player/scrapeDungeonCompletions';
import { scrapeDescription } from './player/scrapeDescription';

import type { RealmeyePlayer } from './types/RealmeyePlayer';

export async function scrapePlayer(playerName: string) {
	const url = `${REALMEYE_URL}/player/${playerName}`;

	const req = await fetch(url);
	const html = await req.text();

	const $ = load(html);
	const container = $('.container');

	const notFound = $('.player-not-found', container);
	if (notFound.length) {
		throw new Error('Player not found');
	}

	const name = $('div h1 .entity-name', container).text();

	const data: RealmeyePlayer = {
		name: name,
		realmEyeUrl: url,
	};

	try {
		data.dungeonCompletions = await scrapeDungeonCompletions(playerName);
		data.characters = await scrapeCharacters($, container, 'player');
	} catch {}

	data.description = scrapeDescription($, container);
	return data;
}
