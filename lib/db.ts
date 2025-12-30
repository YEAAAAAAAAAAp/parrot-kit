import { neon } from '@neondatabase/serverless';
import 'server-only';

export const sql = neon(process.env.DATABASE_URL!);