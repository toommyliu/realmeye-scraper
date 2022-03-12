import { REALMEYE_URL } from '../../constants';

import type { CharacterModelInfo } from '../types/RealmeyePlayer';

export function scrapeCharacterModel(modelData: Record<string, string>): CharacterModelInfo {
	const modelInfo: CharacterModelInfo = {};
	modelInfo.charactersWithOutfitUrl = `${REALMEYE_URL}${modelData.href}`;
	modelInfo.renderPosition = modelData.style?.split(':')[1]?.trim(); // eslint-disable-line @typescript-eslint/no-unnecessary-condition
	modelInfo['data-class'] = modelData['data-class'];
	modelInfo['data-skin'] = modelData['data-skin'];
	modelInfo['data-dye1'] = modelData['data-dye1'];
	modelInfo['data-dye2'] = modelData['data-dye2'];
	modelInfo['data-accessory-dye-id'] = modelData['data-accessory-dye-id'];
	modelInfo['data-clothing-dye-id'] = modelData['data-clothing-dye-id'];
	modelInfo['data-count'] = Number(modelData['data-count']);
	return modelInfo;
}
