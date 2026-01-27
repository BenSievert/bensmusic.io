import sql from '../../../postgres.server';
import type { PageServerLoad } from './$types';
import { getSession } from '$lib/server/functions';

export const load: PageServerLoad = async ({ params, locals }) => {
	const session = await getSession(locals);

	if (params.slug == `new` || !session) return {};

	const row = (
		await sql`SELECT id, title, key_signature, time, sections, section_order, notes
			  FROM songs
			  WHERE id = ${params.slug} AND email=${session.user.email}`
	)[0];

	return row;
};
