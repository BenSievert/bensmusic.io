import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { json } from '@sveltejs/kit';
import { GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL, SHEET_ID } from '$env/static/private';

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

export async function GET() {
	const openSchedule = {};

	const serviceAccountAuth = new JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
	await doc.loadInfo();
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
			const slot = scheduleSheet.getCell(row, column).value;
			if (!slot) {
				openSchedule[day] = openSchedule[day] ?? {};
				openSchedule[day][currentStudio] = openSchedule[day][currentStudio] ?? [];
				// @ts-ignore
				openSchedule[day][currentStudio].push(times[row - 2]);
			}
		}
	}

	return json(openSchedule, {
		status: 200,
		headers: {
			'Cache-Control': 'no-cache'
		}
	});
}
