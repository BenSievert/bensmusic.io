import type { LayoutServerLoad } from '../$types';
import { getSession } from '../backend_functions';

export const load: LayoutServerLoad = async (event) => {
	return {
		session: await getSession(event.locals)
	};
};
