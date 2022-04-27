import type { RealmeyePlayer } from '../types/RealmeyePlayer';

/**
 * Checks if a player has a fully public Realmeye Profile
 * @param player The player
 * @returns {boolean}
 */
export function isProfileComplete(player: RealmeyePlayer): player is Required<RealmeyePlayer> {
	const currentKeys = Object.keys(player);
	const requiredKeys = Object.keys({} as Required<RealmeyePlayer>);

	if (currentKeys.filter((key) => requiredKeys.includes(key)).length) return false;

	return true;
}
