import type { LayoutServerLoad } from '../$types';
import { ROOT_EMAIL } from '$env/static/private';
import { getSession } from '$lib/server/functions';

export const load: LayoutServerLoad = async (event) => {
	const session = await getSession(event.locals);
	const isRoot = session?.user?.email == ROOT_EMAIL;
	return {
		session,
		isRoot
	};
};
