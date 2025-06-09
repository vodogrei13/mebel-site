import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const email = formData.get('email');
    const files = formData.getAll('files');

    const attachments = await Promise.all(
      files.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: 'mp1fdm@mail.ru',
      to: email,
      subject: 'Ваш заказ с сайта Контрактное производство',
      text: 'Ваш заказ успешно отправлен! Детали заказа в прикрепленном PDF-файле.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Ваш заказ успешно отправлен!</h2>
          <p>Мы свяжемся с вами в ближайшее время для уточнения деталей.</p>
          <p>Детали вашего заказа в прикрепленном PDF-файле.</p>
        </div>
      `,
      attachments
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки письма клиенту:', error);
    return NextResponse.json({ error: 'Ошибка при отправке письма клиенту' }, { status: 500 });
  }
}