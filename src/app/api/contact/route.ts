import { NextRequest, NextResponse } from 'next/server';
import { createContactInquiry } from '@/lib/db/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function sendContactEmail(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  tourInterest?: string;
  rentalInterest?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.FROM_EMAIL;
  const to = process.env.TO_EMAIL;

  if (!apiKey || !from || !to) return;

  const interest = input.tourInterest || input.rentalInterest || 'General inquiry';
  const text = [
    `New NusaBeeTrip inquiry`,
    ``,
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || '-'}`,
    `Interest: ${interest}`,
    ``,
    input.message,
  ].join('\n');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `New inquiry from ${input.name} - NusaBeeTrip`,
      text,
      reply_to: input.email,
    }),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, message, tourInterest, rentalInterest } = body;
    
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long' },
        { status: 400 }
      );
    }
    
    const inquiry = await createContactInquiry({
      name: name.trim().slice(0, 255),
      email: email.trim().slice(0, 255),
      phone: typeof phone === 'string' && phone.trim() ? phone.trim().slice(0, 50) : null,
      message: message.trim(),
      tourInterest:
        typeof tourInterest === 'string' && tourInterest.trim()
          ? tourInterest.trim().slice(0, 255)
          : null,
      rentalInterest:
        typeof rentalInterest === 'string' && rentalInterest.trim()
          ? rentalInterest.trim().slice(0, 255)
          : null,
      status: 'new',
    });

    sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === 'string' ? phone.trim() : undefined,
      message: message.trim(),
      tourInterest: typeof tourInterest === 'string' ? tourInterest.trim() : undefined,
      rentalInterest: typeof rentalInterest === 'string' ? rentalInterest.trim() : undefined,
    }).catch((error) => {
      console.error('Contact email failed:', error);
    });
    
    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry sent successfully',
        data: {
          id: inquiry.id,
          status: inquiry.status,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
