import type { RealmeyePlayer } from '../types/RealmeyePlayer';

/**
 * Check if a Realmeye player has an available Realmeye graveyard to read
 * @param player The player
 * @returns {boolean}
 */
export function isGraveyardAvailable(player: RealmeyePlayer): player is RealmeyePlayerWithGraveyard {
	if (player.dungeonCompletions && Object.keys(player.dungeonCompletions).length) return true;

	return false;
}

type RealmeyePlayerWithGraveyard = RealmeyePlayer & { dungeonCompletions: Record<string, number> };
