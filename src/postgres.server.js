import { config } from 'dotenv';
config({ path: '.env.development.local' });
import { neon } from '@neondatabase/serverless';
const connectionString = process.env.DATABASE_URL;
export default neon(connectionString);
