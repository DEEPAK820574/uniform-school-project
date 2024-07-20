import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';
import pool from '@/lib/db';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('image');

    let imagePath = null;
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Save the file
      const filename = `${Date.now()}-${file.name}`;
      imagePath = `/schoolImages/${filename}`;
      const filepath = path.join(process.cwd(), 'public', 'schoolImages', filename);
      await writeFile(filepath, buffer);
    }

    // Extract other form data
    const name = data.get('name');
    const email = data.get('email');
    const phone = data.get('phone');
    const address = data.get('address');

    
    

    // Insert data into MySQL database
    const connection = await pool.getConnection();
    try {
      const [result] = await connection.execute(
        'INSERT INTO schools (name, email, phone, address, image_path) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, address, imagePath]
      );

      console.log('Inserted school with ID:', result.insertId);

      return NextResponse.json({ success: true, message: 'School added successfully', schoolId: result.insertId });
    } finally {
      connection.release(); // Always release the connection back to the pool
    }
  } catch (error) {
    console.error('Error in POST /api/schools:', error);
    return NextResponse.json({ success: false, message: 'Failed to add school' }, { status: 500 });
  }
}