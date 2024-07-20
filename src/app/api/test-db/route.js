import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query('SELECT 1 as test');
      return NextResponse.json({ success: true, message: 'Database connected successfully', data: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ success: false, message: 'Failed to connect to the database' }, { status: 500 });
  }
}