import fetch from '../../util/fetch';
import { load } from 'cheerio';

import Fuse from 'fuse.js';

import { REALMEYE_URL } from '../../constants';
import { scrapeDungeons } from '../scrapeDungeons';

import type { DungeonCompletions } from '../types/RealmeyePlayer';

const match = (val: string, list: string[]) => {
	const res = new Fuse(list).search(val);
	if (res.length > 0) return res[0].item;
};

export async function scrapeDungeonCompletions(playerName: string): Promise<DungeonCompletions> {
	const dungeons = await scrapeDungeons();

	const req = await fetch(`${REALMEYE_URL}/graveyard-summary-of-player/${playerName}`);
	const res = await req.send();

	if (!(res.statusCode! >= 200 && res.statusCode! < 300)) {
		throw new Error(`Code '${res.statusCode!}' while scraping dungeon completions for '${playerName}'`);
	}

	const html = await res.text();

	const $ = load(html);
	const dungeonCompletions: DungeonCompletions = {};

	const private_ = $('body > div.container > div:nth-child(3) > div > h3');
	if (private_.text().startsWith('The graveyard of')) {
		throw new Error(`'${playerName}' has privated their graveyard`);
	}

	const completions = $('table.main-achievements');
	$('tbody > tr', completions).each((_, tableRow) => {
		const rowData = $('td', tableRow);
		// @ts-expect-error
		const rowLabel: string = rowData.get(1).children[0]?.data;
		let dungeon;
		if (/.*completed$/i.exec(rowLabel) && !/^quests.*/i.exec(rowLabel)) {
			const name = rowLabel.replace(' completed', '');
			dungeon = match(name, Array.from(dungeons));
		}

		if (dungeon) {
			// @ts-expect-error
			const total = rowData.get(2).children[0]?.data;
			const num = total ? Number(total) : 0;
			dungeonCompletions[dungeon] = num;
		}
	});

	console.log(dungeonCompletions);

	return dungeonCompletions;
}
