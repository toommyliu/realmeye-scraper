import type { RealmeyePlayer } from '../types/RealmeyePlayer';

export function isGraveyardAvailable(player: RealmeyePlayer): player is GraveyardAvailable {
	if (player.dungeonCompletions && Object.keys(player.dungeonCompletions).length) return true;

	return false;
}

type GraveyardAvailable = RealmeyePlayer & { dungeonCompletions: Record<string, number> };
