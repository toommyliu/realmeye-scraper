export interface RealmeyePlayer {
	name?: string;
	realmEyeUrl?: string;
	description?: string;
	characters?: Character[];
	characterCount?: number;
	skins?: number;
	exaltations?: number;
	fame?: number;
	exp?: number;
	rank?: number;
	star?: string;
	accountFame?: number;
	guild?: string;
	realmEyeGuildUrl?: string;
	guildRank?: string;
	created?: Date;
	lastSeen?: string;
	server?: string;
	avgFameChar?: number;
	avgExpChar?: number;
	dungeonCompletions?: DungeonCompletions;
}

export interface Character {
	private: boolean;
	guildCharacter: boolean;
	class: string;
	fame: number;
	maxedStats: string;
	owner?: RealmeyePlayer;
	pet?: string;
	model?: CharacterModelInfo;
	level?: number;
	exp?: number;
	place?: number;
	equipment?: EquipmentSet;
	stats?: CharacterStats;
	lastSeen?: string;
	server?: string;
}

export interface CharacterModelInfo {
	charactersWithOutfitUrl?: string;
	renderPosition?: string;
	'data-class'?: string;
	'data-skin'?: string;
	'data-dye1'?: string;
	'data-dye2'?: string;
	'data-accessory-dye-id'?: string;
	'data-clothing-dye-id'?: string;
	'data-count'?: number;
}

export type CharacterStats = {
	[P in StatType]?: CharacterStat;
};

export interface CharacterStat {
	stat: StatType;
	maxed: boolean;
}

export enum StatType {
	HP = 'HP',
	MP = 'MP',
	ATT = 'ATT',
	DEF = 'DEF',
	SPD = 'SPD',
	DEX = 'DEX',
	VIT = 'VIT',
	WIS = 'WIS',
}

export type EquipmentSet = {
	[P in EquipmentSlot]?: Item;
};

export enum EquipmentSlot {
	WEAPON = 'weapon',
	ABILITY = 'ability',
	ARMOR = 'armor',
	RING = 'ring',
	BACKPACK = 'backpack',
}

export interface Item {
	name?: string;
	slot?: EquipmentSlot;
	realmEyeUrl?: string;
	renderPosition?: string;
}

export type TableIndexes<T> = {
	[P in keyof T]?: number;
};

export interface DungeonCompletions {
	[key: string]: number;
}

export interface ClassData {
	[key: string]: ClassDefinition;
}

export interface ClassDefinition {
	id: string;
	name: string;
	pluralName?: string;
	startingStats?: ClassStats;
	avgStatPerLevel?: ClassStats;
	maxStats?: ClassStats;
	skins?: SkinList;
	num?: number;
}

export interface SkinList {
	[key: string]: Skin;
}

export interface Skin {
	id: string;
	name: string;
	num: number;
}

export type ClassStats = {
	[P in StatType]?: number;
};
