import sql from '../../postgres.server';
import { json } from '@sveltejs/kit';
import { AUTH } from '$env/static/private';
import type { RequestHandler } from './$types';
import { getSheet, getTeachers, readSheet } from '$lib/server/sheet-functions';
import { getSession, isRoot } from '$lib/server/functions';

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await getSession(locals);

	const isRootUser = isRoot(session);
	if (url.searchParams.get(`auth`) != AUTH && !isRootUser)
		return json(
			{},
			{
				status: 401,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		);

	const openSchedule = await readSheet((slot: any) => !slot);

	return json(openSchedule, {
		status: 200,
		headers: {
			'Cache-Control': 'no-cache'
		}
	});
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await getSession(locals);
	const isRootUser = isRoot(session);

	const { cell, initials, date, permanent, auth } = await request.json();
	const initialsUpper = initials.toUpperCase();
	let status = 401;
	let response = { message: `Wrong Auth or Initials` };
	if (date != `now` && new Date(date).toDateString() == `Invalid Date`) {
		return json({ message: `Invalid Date` }, { status });
	}

	if (!isRootUser && auth != AUTH) return json(response, { status });

	const teachers = await getTeachers();
	const doc = await getSheet();

	if (!teachers.find((teacher) => initialsUpper == teacher.initials))
		return json(response, { status });

	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	await scheduleSheet.loadCells(cell);
	const studioCell = scheduleSheet.getCellByA1(cell);
	if (studioCell.value)
		return json(
			{ message: `Cell was not empty, someone must have gotten it first` },
			{ status: 403 }
		);

	const content = `${initialsUpper}${date == `now` ? `` : `${permanent ? ` start` : ``} ${date}`}`;
	studioCell.value = content;
	try {
		await sql`INSERT INTO schedule_logs (cell, content, initials)
		VALUES (${cell},${content},${initialsUpper})`;
	} catch (e) {
		console.log(`Something went wrong`, e);
	}
	try {
		await scheduleSheet.saveCells([studioCell]);

		return json({ message: `Success` }, { status: 200 });
	} catch (e) {
		return json({ message: e }, { status: 500 });
	}
};
