import type { RealmeyePlayer, Character } from './RealmeyePlayer';

export interface RealmeyeGuild {
	name?: string;
	realmEyeUrl?: string;
	description?: string;
	members?: RealmeyePlayer[];
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
