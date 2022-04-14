import type { RealmeyePlayer } from '../types/RealmeyePlayer';

export function isGraveyardAvailable(player: RealmeyePlayer): player is RealmeyePlayerWithGraveyard {
	if (player.dungeonCompletions && Object.keys(player.dungeonCompletions).length) return true;

	return false;
}

type RealmeyePlayerWithGraveyard = RealmeyePlayer & { dungeonCompletions: Record<string, number> };
