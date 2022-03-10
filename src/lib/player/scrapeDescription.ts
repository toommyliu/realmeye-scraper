import type { Cheerio, CheerioAPI, Element } from 'cheerio';

export function scrapeDescription($: CheerioAPI, container: Cheerio<Element>) {
	const userDescription = $('.description', container).first();
	let description = '';
	$('.description-line', userDescription).each((i, line) => {
		// @ts-expect-error
		const text: string = line.children[0]?.data || '';
		// eslint-disable-next-line no-negated-condition
		if (description.length) description += `\n${text}`;
		else description += text;
	});

	return description;
}
