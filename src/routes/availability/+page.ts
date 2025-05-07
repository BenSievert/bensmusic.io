
import type { PageLoad } from './$types';

export const load: PageLoad = ({url}) => ({auth: url.searchParams.get(`auth`)});
