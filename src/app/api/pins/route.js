import { addpin, getpins } from '@/prisma-db';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const pins = await getpins();
  return NextResponse.json({ pins });
}

export async function POST(request) {
  const body = await request.json();
  const { x, y, feedback } = body;

  const pin = await addpin(x, y, feedback);
  return NextResponse.json(pin, {
    headers: { 'Content-Type': 'application/json' },
  });
}
