import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import sql from '../../postgres.server';
import { getSession } from '$lib/server/functions';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await getSession(locals);
	if (!session) return json({ Message: `Unauthenticated` }, { status: 401 });

	const { title, key, time, sections, order, action, id, notes } = await request.json();
	const email = session.user.email;
	const sectionsJSON = JSON.stringify(sections);
	const orderJSON = JSON.stringify(order);

	let row;
	try {
		if (action == `create`) {
			row =
				await sql`INSERT INTO songs (title,key_signature,time,sections,section_order, email, notes) 
        VALUES (${title},${key},${time},${sectionsJSON},${orderJSON},${email},${notes}) RETURNING id;`;
		} else if (action == `update`) {
			await sql`UPDATE songs
				SET title = ${title},
				    key_signature = ${key},
				    time = ${time},
				    sections = ${sectionsJSON},
				    section_order = ${orderJSON},
				    notes = ${notes},
						last_updated = NOW()
				WHERE id = ${id} AND email = ${email}`;
		}

		return json({ message: `Success`, id: id || row[0].id }, { status: 200 });
	} catch (error) {
		console.error('Error', error);
		return json({ message: `Error` }, { status: 500 });
	}
};
