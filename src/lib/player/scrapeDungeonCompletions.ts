import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../../constants';
import Fuse from 'fuse.js';
import { scrapeDungeons } from '../scrapeDungeons';

import type { DungeonCompletions } from '../types/RealmeyePlayer';

const match = (val: string, list: string[]) => {
	const res = new Fuse(list).search(val);
	if (res.length > 0) return res[0].item;
};

export async function scrapeDungeonCompletions(playerName: string): Promise<DungeonCompletions> {
	const dungeons = await scrapeDungeons();

	const req = await fetch(`${REALMEYE_URL}/graveyard-summary-of-player/${playerName}`);
	const html = await req.text();
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
		const rowLabel: string = rowData.get(1)?.children[0]?.data; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
		let dungeon;
		if (/.*completed$/i.exec(rowLabel) && !/^quests.*/i.exec(rowLabel)) {
			const name = rowLabel.replace(' completed', '');
			dungeon = match(name, Array.from(dungeons));
		}

		if (dungeon) {
			// @ts-expect-error
			const total = rowData.get(2)?.children[0]?.data; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
			const num = total ? Number(total) : 0;
			dungeonCompletions[dungeon] = num;
		}
	});

	return dungeonCompletions;
}
