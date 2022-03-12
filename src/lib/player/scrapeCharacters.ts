import { scrapeCharacterIndexes } from './scrapeCharacterIndexes';
import { scrapeCharacterModel } from './scrapeCharacterModel';
import { scrapeCharacterEquipment } from './scrapeCharacterEquipment';

import { REALMEYE_URL } from '../../constants';

import type { CheerioAPI, Cheerio, Element } from 'cheerio';
import type { Character, TableIndexes } from '../types/RealmeyePlayer';

function buildCharacter($: CheerioAPI, row: Element, indexes: TableIndexes<Character>) {
	const character: Character = {
		private: false,
		guildCharacter: false,
		class: 'Wizard',
		fame: 0,
		maxedStats: '?/8',
	};
	$('td', row).each((j, charData) => {
		switch (j) {
			case indexes.pet:
				// @ts-expect-error
				character.pet = charData.children[0]?.attribs?.['data-item'];
				break;
			case indexes.owner:
				character.guildCharacter = true;
				// @ts-expect-error
				if (charData.children[0]?.data?.match(/private/i)) {
					character.private = true;
				}
				const nameData = $('a', charData).first();
				const name = nameData.text();
				const ownerUrl = `${REALMEYE_URL}${nameData.attr().href}`;
				character.owner = {
					name: name,
					realmEyeUrl: ownerUrl,
				};
				break;
			case indexes.model:
				const modelAttr = $('.character', charData).first().attr();
				character.model = scrapeCharacterModel(modelAttr);
				break;
			case indexes.class:
				// @ts-expect-error
				character.class = charData.children[0]?.data;
				break;
			case indexes.level:
				// @ts-expect-error
				const level = charData.children[0]?.data;
				character.level = level ? Number(level) : 0;
				break;
			case indexes.fame:
				// @ts-expect-error
				const fame = charData.children[0]?.data;
				character.fame = fame ? Number(fame) : 0;
				break;
			case indexes.exp:
				// @ts-expect-error
				const exp = charData.children[0]?.data;
				character.exp = exp ? Number(exp) : 0;
				break;
			case indexes.place:
				const place = $('a', charData).first().text();
				character.place = place ? Number(place) : 0;
				break;
			case indexes.equipment:
				character.equipment = scrapeCharacterEquipment($, charData);
				break;
			case indexes.stats:
				// TODO: use stats below to check specific maxed stats once RealmEye has the information available again
				// const stats = $('.player-stats', charData).first().attr();

				// @ts-expect-error
				character.maxedStats = charData.children[0]?.children[0]?.data;
				break;
			case indexes.lastSeen:
				// @ts-expect-error
				let lastSeen = charData.children[0]?.data;
				if (!lastSeen) {
					lastSeen = $('span', charData).first().text();
				}
				character.lastSeen = lastSeen;
				break;
			case indexes.server:
				character.server = $('abbr', charData).first().attr()?.title; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
				break;
		}
	});

	if (character.private) {
		return {
			guildCharacter: true,
			fame: 0,
			maxedStats: '?/8',
			private: true,
			owner: {
				name: 'Private',
			},
			class: character.class,
		};
	}

	return character;
}

export function scrapeCharacters($: CheerioAPI, container: Cheerio<Element>, type: 'player' | 'guild') {
	// @ts-expect-error
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if ($('.col-md-12 > h3', container)[0]?.children[0]?.data?.match(/characters are hidden/i)) {
		return;
	}
	const charactersTable = $('.col-md-12 > .table-responsive > table.table.table-striped.tablesorter', container);
	if (!charactersTable.length) {
		return;
	}

	const characterTableIndexes = scrapeCharacterIndexes($, charactersTable, type);
	const characters: Character[] = [];
	$('tbody > tr', charactersTable).each((i, charRow) => {
		characters.push(buildCharacter($, charRow, characterTableIndexes));
	});

	return characters;
}
