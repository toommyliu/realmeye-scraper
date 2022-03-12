import type { RealmEyePlayerData, Character } from './RealmeyePlayer';

export interface RealmeyeGuildData {
	name?: string;
	realmEyeUrl?: string;
	description?: string;
	members?: RealmEyePlayerData[];
	memberCount?: number;
	characterCount?: number;
	fame?: number;
	fameRank?: number;
	exp?: number;
	expRank?: number;
	server?: string;
	serverRank?: number;
	topCharacters?: Character[];
}
