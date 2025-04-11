// app/api/get-cameras/[id]/route.ts
import { connectMySQL } from "@/lib/mySql_setup";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id

  try {
    const connection = await connectMySQL();

    const [rows] = await connection.execute(
      "SELECT * FROM test.stream_tbl WHERE cam_id = ?",
      [id]
    );

    await connection.end();

    return NextResponse.json({ message: "Success", data: rows });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch data", error: (error as Error).message },
      { status: 500 }
    );
  }
}
