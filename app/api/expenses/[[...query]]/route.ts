import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request, context: any) {
  const { params } = context
  console.log(params.query)
  try {
    const result = await sql`
        SELECT *, category.text as category, TO_CHAR(expenses.created_at, 'MM/DD/YYYY') as date
        FROM expenses
        JOIN category ON expenses.category_id = category.id
        WHERE category.text ILIKE ${'%' + (params?.query?.length ? params.query[0] : '') + '%'};      
      `;
    return NextResponse.json({ rows: result.rows, error: null });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ rows: [], error: 'Something went wrong' }, { status: 500 });
  }


}
