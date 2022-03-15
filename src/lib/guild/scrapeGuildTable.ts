import type { Cheerio, CheerioAPI, Element } from 'cheerio';
import type { RealmeyeGuildData } from '../types/RealmeyeGuild';

export function scrapeGuildTable($: CheerioAPI, container: Cheerio<Element>, guildData: RealmeyeGuildData) {
	const summaryTable = $('div table.summary', container);
	$('tr', summaryTable).each((_, e) => {
		const td = $('td', e);
		const rowTitle = td.first().text();
		const data = td.get(1);
		let num;
		switch (rowTitle.toUpperCase()) {
			case 'MEMBERS':
				// @ts-expect-error
				num = data.children[0]?.data;
				guildData.memberCount = num ? Number(num) : num;
				break;
			case 'CHARACTERS':
				// @ts-expect-error
				num = data.children[0]?.data;
				guildData.characterCount = num ? Number(num) : num;
				break;
			case 'FAME':
				const fame = $('span', data).first().text();
				// @ts-expect-error
				guildData.fame = fame ? Number(fame) : fame;
				num = $('a', data).first().text();
				// @ts-expect-error
				guildData.fameRank = num ? Number(num) : num;
				break;
			case 'EXP':
				const exp = $('span', data).first().text();
				// @ts-expect-error
				guildData.exp = exp ? Number(exp) : exp;
				num = $('a', data).first().text();
				// @ts-expect-error
				guildData.expRank = num ? Number(num) : num;
				break;
			case 'MOST ACTIVE ON':
				guildData.server = $('a', data).first().text();
				// @ts-expect-error
				num = data.children[1]?.data?.replace(' (', '');
				guildData.serverRank = num ? Number(num) : num;
				break;
		}
	});
}
