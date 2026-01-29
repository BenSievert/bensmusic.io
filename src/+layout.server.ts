import type { LayoutServerLoad } from './$types';
import { getStudentByEmail } from '$lib/server/functions';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();
	return {
		session,
		student: session && (await getStudentByEmail(session))
	};
};
