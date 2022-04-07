import type { RealmeyePlayer } from '../types/RealmeyePlayer';

export function isProfileComplete(player: RealmeyePlayer): player is Required<RealmeyePlayer> {
	const currentKeys = Object.keys(player);
	const requiredKeys = Object.keys({} as Required<RealmeyePlayer>);

	if (currentKeys.filter((key) => requiredKeys.includes(key)).length) return false;

	return true;
}
