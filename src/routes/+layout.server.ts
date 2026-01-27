import type { LayoutServerLoad } from '../$types';
import { getSession } from '$lib/server/functions';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getSession(event.locals)
	};
};
