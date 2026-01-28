import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getSession } from '$lib/server/functions';
import { getTeachers, readSheet, getSheet } from '$lib/server/sheet-functions';

export const GET: RequestHandler = async ({ url, locals }) => {
	const session = await getSession(locals);
	if (!session)
		return json(
			{},
			{
				status: 401,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		);

	const myInitials = (await getTeachers()).find(
		({ email }) => email == session.user.email
	)?.initials;

	if (!myInitials)
		return json(
			{},
			{
				status: 401,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		);
	const mySchedule = await readSheet(
		(slot: string | null) => !!(slot && slot.split(` `)[0]?.includes(myInitials))
	);

	return json(
		{ mySchedule, name: session.user.name },
		{
			status: 200,
			headers: {
				'Cache-Control': 'no-cache'
			}
		}
	);
};

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await getSession(locals);
	if (!session)
		return json(
			{},
			{
				status: 401
			}
		);

	const { email, initials } = (await getTeachers()).find(
		({ email }) => email == session.user.email
	);
	if (!initials) {
		return json({ message: `Not a teacher at Hip Cat` }, { status: 403 });
	}

	const doc = await getSheet();
	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	const { cell } = await request.json();
	await scheduleSheet.loadCells(cell);
	const studioCell = scheduleSheet.getCellByA1(cell);
	if (studioCell.value.split(` `)[0].toUpperCase() != initials)
		return json({ message: `Cell had someone else's initials, could not delete` }, { status: 403 });

	studioCell.value = null;
	try {
		await scheduleSheet.saveCells([studioCell]);

		return json({ message: `Success` }, { status: 200 });
	} catch (e) {
		return json({ message: e }, { status: 500 });
	}
};
