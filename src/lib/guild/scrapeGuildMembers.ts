import { REALMEYE_URL } from '../../constants';

import type { CheerioAPI, Cheerio, Element } from 'cheerio';
import type { RealmeyeGuildData } from '../types/RealmeyeGuild';
import type { RealmEyePlayerData, TableIndexes } from '../types/RealmeyePlayer';

function buildMember($: CheerioAPI, memberRow: Element, indexes: TableIndexes<RealmEyePlayerData>): RealmEyePlayerData {
	const member: RealmEyePlayerData = {};
	$('td', memberRow).each((j, memberData) => {
		let num;
		switch (j) {
			case indexes.name:
				const starContainer = $('.star-container', memberData).first();
				if (starContainer.length) {
					// @ts-expect-error
					const star: string = /(star-.*)/.exec($('.star', starContainer).first().attr()?.class)[1]; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
					member.star = star?.substring(star?.indexOf('-') + 1); // eslint-disable-line @typescript-eslint/no-unnecessary-condition

					const name = $('a', starContainer).first();
					member.name = name.text();
					member.realmEyeUrl = `${REALMEYE_URL}${name.attr()?.href}`; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
				} else {
					// @ts-expect-error
					member.name = memberData.children[0]?.data;
				}
				break;
			case indexes.guildRank:
				// @ts-expect-error
				member.guildRank = memberData.children[0]?.data;
				break;
			case indexes.fame:
				num = $('a', memberData).first().text();
				member.fame = num ? Number(num) : 0;
				break;
			case indexes.exp:
				// @ts-expect-error
				num = memberData.children[0]?.data;
				member.exp = num ? Number(num) : 0;
				break;
			case indexes.rank:
				// @ts-expect-error
				num = memberData.children[0]?.data;
				member.rank = num ? Number(num) : 0;
				break;
			case indexes.characterCount:
				// @ts-expect-error
				num = memberData.children[0]?.data;
				member.characterCount = num ? Number(num) : 0;
				break;
			case indexes.lastSeen:
				// @ts-expect-error
				let lastSeen = memberData.children[0]?.data;
				if (!lastSeen) {
					lastSeen = $('span', memberData).first().text();
				}
				member.lastSeen = lastSeen;
				break;
			case indexes.server:
				member.server = $('abbr', memberData).first().attr()?.title; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
				break;
			case indexes.avgFameChar:
				// @ts-expect-error
				num = memberData.children[0]?.data; // eslint-disable-line @typescript-eslint/no-unnecessary-condition
				if (num === 'N/A') {
					member.avgFameChar = 0;
				} else {
					member.avgFameChar = num ? Number(num) : 0;
				}
				break;
			case indexes.avgExpChar:
				// @ts-expect-error
				num = memberData.children[0]?.data;
				member.avgExpChar = num ? (num === 'N/A' ? 0 : Number(num)) : num;
				break;
		}
	});
	return member;
}

function buildMemberTableIndexes($: CheerioAPI, membersTable: Cheerio<Element>) {
	const indexes: TableIndexes<RealmEyePlayerData> = {};
	$('thead th', membersTable).each((i, e) => {
		// @ts-expect-error
		let heading: string = e.children[0]?.data;
		// @ts-expect-error
		heading = heading || e.children[0]?.children[0]?.data;
		if (!heading) {
			return;
		}
		switch (heading.toUpperCase()) {
			case 'NAME':
				indexes.name = i;
				break;
			case 'GUILD RANK':
				indexes.guildRank = i;
				break;
			case 'FAME':
				indexes.fame = i;
				break;
			case 'EXP':
				indexes.exp = i;
				break;
			case 'RANK':
				indexes.rank = i;
				break;
			case 'C':
				indexes.characterCount = i;
				break;
			case 'LAST SEEN':
				indexes.lastSeen = i;
				break;
			case 'SRV.':
				indexes.server = i;
				break;
			case 'AF/C':
				indexes.avgFameChar = i;
				break;
			case 'AE/C':
				indexes.avgExpChar = i;
				break;
		}
	});
	return indexes;
}

export function scrapeGuildMembers($: CheerioAPI, container: Cheerio<Element>, guildData: RealmeyeGuildData) {
	const membersTable = $('.col-md-12 > .table-responsive > table.table.table-striped.tablesorter', container);
	if (!membersTable.length) return;

	const memberTableIndexes = buildMemberTableIndexes($, membersTable);
	const members: RealmEyePlayerData[] = [];
	$('tbody > tr', membersTable).each((_, memberRow) => {
		members.push(buildMember($, memberRow, memberTableIndexes));
	});
	guildData.members = members;
}
