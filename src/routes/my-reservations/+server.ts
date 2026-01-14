import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';
import {
	GOOGLE_PRIVATE_KEY,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	SHEET_ID,
} from '$env/static/private';
import type { RequestHandler } from './$types';
import {getSession} from "../../backend_functions";

const times = [
	`8:00 AM`,
	`8:30 AM`,
	`9:00 AM`,
	`9:30 AM`,
	`10:00 AM`,
	`10:30 AM`,
	`11:00 AM`,
	`11:30 AM`,
	`12:00 PM`,
	`12:30 PM`,
	`1:00 PM`,
	`1:30 PM`,
	`2:00 PM`,
	`2:30 PM`,
	`3:00 PM`,
	`3:30 PM`,
	`4:00 PM`,
	`4:30 PM`,
	`5:00 PM`,
	`5:30 PM`,
	`6:00 PM`,
	`6:30 PM`,
	`7:00 PM`,
	`7:30 PM`,
	`8:00 PM`,
	`8:30 PM`,
	`9:00 PM`,
	`9:30 PM`,
	`10:00 PM`
];

const getSheet = async () => {
	const serviceAccountAuth = new JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
	await doc.loadInfo();
	return doc;
};

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


	const mySchedule = {};
	const doc = await getSheet();
	const contactSheet = doc.sheetsByTitle[`contact information`];
	await contactSheet.loadCells(`D3:G52`);
	const offset = 2;
	let initials;
	for (let i = offset; i < contactSheet.cellStats.loaded - offset; i++) {
		const cell = contactSheet.getCell(i, 6).value;
		if (cell == session.user.email) {
			initials = contactSheet.getCell(i, 3).value
			break;
		}

	}
	if (!initials)
		return json(
			{},
			{
				status: 401,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		);
	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	await scheduleSheet.loadCells(`B1:CR31`);
	const colLen = 96;
	const rowLen = 31;

	let currentStudio = ``;
	for (let column = 1; column < colLen; column++) {
		const day = scheduleSheet.getCell(1, column).value as keyof typeof mySchedule;
		if (!day) continue;
		const studioCell = scheduleSheet.getCell(0, column).value as string;
		if (studioCell) currentStudio = studioCell;

		for (let row = 2; row < rowLen; row++) {
			const cell = scheduleSheet.getCell(row, column);
			const slot = cell.value as string;
			if (slot && slot.split(` `)[0]?.includes(initials)) {
				mySchedule[day] = mySchedule[day] ?? [];
				// @ts-ignore
				mySchedule[day].push({ time: times[row - 2], cell: cell.a1Address, content: slot, studio: currentStudio });
			}
		}
	}

	return json({mySchedule, name: session.user.name}, {
		status: 200,
		headers: {
			'Cache-Control': 'no-cache'
		}
	});
};

export const POST: RequestHandler = async ({ request, locals }) => {
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
	const doc = await getSheet();
	const contactSheet = doc.sheetsByTitle[`contact information`];
	await contactSheet.loadCells(`D3:G52`);
	const offset = 2;
	let initials;
	for (let i = offset; i < contactSheet.cellStats.loaded - offset; i++) {
		const cell = contactSheet.getCell(i, 6).value;
		if (cell == session.user.email) {
			initials = contactSheet.getCell(i, 3).value
			break;
		}

	}
	if (!initials)
		return json(
			{},
			{
				status: 401,
				headers: {
					'Cache-Control': 'no-cache'
				}
			}
		);


	const { cell } = await request.json();


	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	await scheduleSheet.loadCells(cell);
	const studioCell = scheduleSheet.getCellByA1(cell);
	if (studioCell.value.split(` `)[0].toUpperCase() != initials)

		return json(
			{message: `Cell had someone else's initials, could not delete`},
			{status: 403}
		);

	studioCell.value = ``
	try {
		await scheduleSheet.saveCells([studioCell]);

		return json({ message: `Success` }, { status: 200 });
	} catch (e) {
		return json({ message: e }, { status: 500 });
	}
};
