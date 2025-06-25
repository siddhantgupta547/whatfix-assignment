import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ success: true });
}

export async function POST(request) {
  const data = await request.json();
  return NextResponse.json({ success: true, data });
}
