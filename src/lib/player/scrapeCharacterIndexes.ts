import type { CheerioAPI, Cheerio, Element } from 'cheerio';
import type { TableIndexes, Character } from '../types/RealmeyePlayer';

export function scrapeCharacterIndexes($: CheerioAPI, charactersTable: Cheerio<Element>): TableIndexes<Character> {
	const indexes: TableIndexes<Character> = {};
	$('thead th', charactersTable).each((i, e) => {
		// @ts-expect-error
		let heading: string = e.children[0]?.data;
		// @ts-expect-error
		heading = heading ? heading : e.children[0]?.children[0]?.data;
		if (!heading) {
			return;
		}
		switch (heading.toUpperCase()) {
			case 'NAME':
				indexes.owner = i;
				break;
			case 'CLASS':
				indexes.pet = i - 2;
				indexes.model = i - 1;
				indexes.class = i;
				break;
			case 'L':
				indexes.level = i;
				break;
			case 'FAME':
				indexes.fame = i;
				break;
			case 'EXP':
				indexes.exp = i;
				break;
			case 'PL.':
				indexes.place = i;
				break;
			case 'EQUIPMENT':
				indexes.equipment = i;
				break;
			case 'STATS':
				indexes.stats = i;
				break;
			case 'LAST SEEN':
				indexes.lastSeen = i;
				break;
			case 'SRV.':
				indexes.server = i;
				break;
		}
	});
	return indexes;
}
