import { NextRequest, NextResponse } from 'next/server';
import { telegramBotConfig, checkRequiredEnvVars } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validate input
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if Telegram bot is configured
    if (!checkRequiredEnvVars()) {
      console.error('Telegram bot not configured. Please set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
      // Return success to user but log the error
      return NextResponse.json({ success: true });
    }

    // Get Telegram credentials from config
    const botToken = telegramBotConfig.token;
    const chatId = telegramBotConfig.chatId;


    // Format message for Telegram
    const telegramMessage = `
🆕 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

💬 Message:
${message}
    `.trim();

    // Send to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send to Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

