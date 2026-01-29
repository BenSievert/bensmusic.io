import type { RequestHandler } from './$types';
import sql from '../../postgres.server';
import { getSession, isRoot } from '$lib/server/functions';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await getSession(locals);
	const isRootUser = isRoot(session);
	if (!isRootUser) return;

	const { notes, id, isInternal } = await request.json();
	console.log({ isInternal });
	await sql`INSERT INTO student_notes (notes, student_id, internal) VALUES (${notes}, ${id}, ${isInternal})`;

	console.log({ notes, id });

	return json({ message: `Success` }, { status: 200 });
};
