import type { RealmeyePlayer } from '../types/RealmeyePlayer';

export function isGraveyardPublic(player: RealmeyePlayer): player is PublicGraveyardType {
	if (player.dungeonCompletions && Object.keys(player.dungeonCompletions).length) return true;

	return false;
}

type PublicGraveyardType = RealmeyePlayer & { dungeonCompletions: Record<string, number> };
