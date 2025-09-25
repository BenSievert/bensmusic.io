import sql from '../../../postgres.server';
import showDown from 'showdown';
import type { PageServerLoad } from './$types';
import path from 'path';

export const load: PageServerLoad = async ({ params }) => {
	const { name, content, date } = (
		await sql`SELECT name, content, TO_CHAR(created,'Month DD, YYYY') date
			  FROM articles
			  WHERE id = ${params.slug}`
	)[0];

	const converter = new showDown.Converter({
		noHeaderId: true
	});

	const html = converter.makeHtml(content);
	return {
		name,
		date,
		html
	};
};
