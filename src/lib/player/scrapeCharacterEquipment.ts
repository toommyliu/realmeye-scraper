import { REALMEYE_URL } from '../../constants';
import { EquipmentSlot } from '../types/RealmeyePlayer';

import type { CheerioAPI, Element } from 'cheerio';
import type { EquipmentSet, Item } from '../types/RealmeyePlayer';

export function scrapeCharacterEquipment($: CheerioAPI, charData: Element): EquipmentSet {
	const equipmentSet: EquipmentSet = {};
	const items = $('span.item-wrapper', charData);
	items.each((i, itemData) => {
		const item: Item = {};
		const itemInfo = $('.item', itemData).first().attr() as unknown as Record<string, string> | undefined;
		const itemName = itemInfo?.title ?? 'Empty Slot';
		item.name = itemName.replace(/ (UT|T[\d]+)$/g, '');
		if (!/empty slot/i.exec(item.name)) {
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			const link = $('a', itemData).first().attr()?.href;
			// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
			item.realmEyeUrl = `${REALMEYE_URL}${link}`;
			item.renderPosition = itemInfo?.style?.split(':')[1]?.trim(); // eslint-disable-line @typescript-eslint/no-unnecessary-condition
		}

		switch (i) {
			case 0:
				item.slot = EquipmentSlot.WEAPON;
				equipmentSet.weapon = item;
				break;
			case 1:
				item.slot = EquipmentSlot.ABILITY;
				equipmentSet.ability = item;
				break;
			case 2:
				item.slot = EquipmentSlot.ARMOR;
				equipmentSet.armor = item;
				break;
			case 3:
				item.slot = EquipmentSlot.RING;
				equipmentSet.ring = item;
				break;
			case 4:
				item.slot = EquipmentSlot.BACKPACK;
				equipmentSet.backpack = item;
				break;
		}
	});
	return equipmentSet;
}
