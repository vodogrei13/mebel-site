import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const comment = formData.get('comment');

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

    const mailText = `
      Заполнена заявка на сайте "Контрактное производство"

      Имя: ${name}
      E-mail: ${email}
      Тел: ${phone}
      Вопрос: ${comment}

      Прикрепленные файлы: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'нет'}
    `;

    const mailOptions = {
      from: 'mp1fdm@mail.ru',
      to: 'mp4@fdm76.ru',
      subject: 'Новая заявка с сайта',
      text: mailText,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Новая заявка с сайта "Контрактное производство"</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Телефон:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Вопрос:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${comment}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Файлы:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'нет'}</td>
            </tr>
          </table>
    
          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #007BFF; padding: 10px 20px; color: #fff; text-decoration: none; border-radius: 5px;">Ответить на письмо</a>
          </div>
        </div>
      `,
      attachments
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return NextResponse.json({ error: 'Ошибка при отправке письма' }, { status: 500 });
  }
}
