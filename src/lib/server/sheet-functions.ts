import { JWT } from 'google-auth-library';
import {
	GOOGLE_PRIVATE_KEY,
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	SHEET_ID,
	local,
	LOCAL_SHEET
} from '$env/static/private';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { times } from '$lib/shared-functions.ts';

export const getSheet = async () => {
	const serviceAccountAuth = new JWT({
		email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});

	const doc = new GoogleSpreadsheet(local == `true` ? LOCAL_SHEET : SHEET_ID, serviceAccountAuth);
	await doc.loadInfo();
	return doc;
};

export const getTeachers = async () => {
	const doc = await getSheet();
	const contactSheet = doc.sheetsByTitle[`contact information`];
	await contactSheet.loadCells(`D3:G54`);
	const rows = await contactSheet.getRows();
	const teachers = rows
		.map((row) => {
			const rawData = row._rawData;
			return {
				initials: rawData[3],
				email: rawData[6]
			};
		})
		.filter(({ initials }) => initials);

	return teachers;
};

export const readSheet = async (searchFunction: (slot: any) => boolean) => {
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
			if (searchFunction(slot)) {
				openSchedule[day] = openSchedule[day] ?? {};
				openSchedule[day][currentStudio] = openSchedule[day][currentStudio] ?? [];
				// @ts-ignore
				openSchedule[day][currentStudio].push({
					time: times[row - 2],
					cell: cell.a1Address,
					content: slot,
					studio: currentStudio
				});
			}
		}
	}
	return openSchedule;
};
