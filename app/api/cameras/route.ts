import { NextResponse } from 'next/server';
import { connectMySQL } from '@/lib/mySql_setup';

export async function GET() {
  try {

    const connection = await connectMySQL();

    const [rows] = await connection.execute(
      'SELECT * FROM test.stream_tbl'
    );

    await connection.end();

    return NextResponse.json({ message: 'Fetched data successfully!', data: rows });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to connect to MySQL or fetch data', error: (error as Error).message },
      { status: 500 }
    );
  }
}
