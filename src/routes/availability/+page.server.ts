import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
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


export async function load() {
	const openSchedule = {};

	const serviceAccountAuth = new JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const colsToDaysAndStudios: Record<number, { day: string; studio: string }> = {};

	const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
	await doc.loadInfo(); // loads document properties and worksheets
	const scheduleSheet = doc.sheetsByTitle[`schedule`];
	const scheduleFormatted = [];
	await scheduleSheet.loadCells();
	const colLen = scheduleSheet.columnCount;
	const rowLen = scheduleSheet.rowCount;

	for (let column = 1; column < colLen; column++) {
		const maybeStudio = scheduleSheet.getCell(0, column).value;
		if (maybeStudio) scheduleFormatted.push({ studio: maybeStudio });
	}
	let currentStudio;
	for (let column = 1; column < colLen; column++) {
		const day = scheduleSheet.getCell(1, column);
		const studioCell = scheduleSheet.getCell(0, column).value;
		if (studioCell) currentStudio = studioCell;

		if (day.value)
			colsToDaysAndStudios[day.columnIndex] = {
				day: day.value as string,
				studio: currentStudio as string
			};
	}
	for (const [i, time] of times.entries()) {
		for (const [column, { day, studio }] of Object.entries(colsToDaysAndStudios)) {
			const maybeReservation = scheduleSheet.getCell(i + 2, +column).value;
			// @ts-ignore
			if (!maybeReservation) {
				// @ts-ignore
				if (!openSchedule[day]) openSchedule[day] = {};
				// @ts-ignore
				if (!openSchedule[day][studio]) openSchedule[day][studio] = [];
				// @ts-ignore
				openSchedule[day][studio].push(time);
			}
		}
	}

	console.log(openSchedule)

	return {
		openSchedule
	};
}
