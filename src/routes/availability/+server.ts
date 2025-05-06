import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';
import {
	GOOGLE_PRIVATE_KEY,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	SHEET_ID,
	PIN
} from '$env/static/private';
import type { RequestHandler } from './$types';

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

const getSheet = async (override?: string) => {
	const serviceAccountAuth = new JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	const doc = new GoogleSpreadsheet(override || SHEET_ID, serviceAccountAuth);
	await doc.loadInfo();
	return doc;
};

export const GET: RequestHandler = async () => {
	const openSchedule = {};
	const doc = await getSheet();
	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	await scheduleSheet.loadCells(`B1:CR31`);
	const colLen = 96;
	const rowLen = 31;

	let currentStudio = ``;
	for (let column = 1; column < colLen; column++) {
		const day = scheduleSheet.getCell(1, column).value as keyof typeof openSchedule;
		if (!day) continue;
		const studioCell = scheduleSheet.getCell(0, column).value as string;
		if (studioCell) currentStudio = studioCell;

		for (let row = 2; row < rowLen; row++) {
			const cell = scheduleSheet.getCell(row, column);
			const slot = cell.value;
			if (!slot) {
				openSchedule[day] = openSchedule[day] ?? {};
				openSchedule[day][currentStudio] = openSchedule[day][currentStudio] ?? [];
				// @ts-ignore
				openSchedule[day][currentStudio].push({ time: times[row - 2], cell: cell.a1Address });
			}
		}
	}

	return json(openSchedule, {
		status: 200,
		headers: {
			'Cache-Control': 'no-cache'
		}
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const { pin, cell, initials, date, permanent } = await request.json();
	let status = 401;
	let response = { message: `Wrong PIN or Initials` };
	if (pin != PIN && (date != `now` || new Date(date).toDateString() == `Invalid Date`))
		return json(response, { status });

	const doc = await getSheet(`1pZwjEFTgxLcY7UgoCUjnUNngieBZVeY748xrZrlzCiI`);
	const contactSheet = doc.sheetsByTitle[`contact information`];
	await contactSheet.loadCells(`D3:D50`);
	const offset = 2;
	let authorized = false;
	for (let i = offset; i < contactSheet.cellStats.loaded - offset; i++) {
		const cell = contactSheet.getCell(i, 3).value;
		if (initials.toUpperCase() == cell) {
			authorized = true;
			break;
		}
	}

	if (!authorized) return json(response, { status });

	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	await scheduleSheet.loadCells(cell);
	const studioCell = scheduleSheet.getCellByA1(cell);
	if (studioCell.value)
		return json(
			{ message: `Cell was not empty, someone must have gotten it first` },
			{ status: 403 }
		);

	studioCell.value = `${initials}${date == `now` ? `` : `${permanent ? ` start` : ``} ${date}`}`;
	await scheduleSheet.saveCells([studioCell]);
	return json({ message: `Success` }, { status: 200 });
};
