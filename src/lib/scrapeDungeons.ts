import { load } from 'cheerio';
import { fetch, REALMEYE_URL } from '../constants';

const dungeonCache = new Set<string>();

export async function scrapeDungeons(): Promise<Set<string>> {
	if (dungeonCache.size) return dungeonCache;

	const req = await fetch(`${REALMEYE_URL}/wiki/dungeons`);
	const html = await req.text();
	const $ = load(html);

	const heading = 'h2#realm-dungeons, h2#realm-event-dungeons, h2#oryx-s-castle, h2#mini-dungeons';
	const container = $('.container');
	const headAndTable = $(`${heading}, div.table-responsive`, container);

	for (let i = 0; i < headAndTable.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (headAndTable.get(i)?.name !== 'h2' || headAndTable.get(i + 1)?.name !== 'div') {
			continue;
		}

		$('.table.table-striped > tbody > tr', headAndTable.get(i + 1)).each((_, dungeonRow) => {
			const nameCell = $('td', dungeonRow).get(0);
			const nameData = $('a', nameCell).first();

			const name = nameData.text();
			dungeonCache.add(name);
		});
	}

	return dungeonCache;
}
