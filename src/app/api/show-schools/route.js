import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  
  try {
    const connection = await pool.getConnection();
    try {
      console.log('Fetching schools...');
      const [rows] = await connection.query('SELECT id, name, address, image_path FROM schools');
      console.log('Schools fetched:', rows);
      return NextResponse.json({ success: true, schools: rows });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch schools' }, { status: 500 });
  }
}