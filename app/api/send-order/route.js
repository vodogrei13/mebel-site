import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name = formData.get('name');
    const surname = formData.get('surname');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const comment = formData.get('comment');
    const files = formData.getAll('files');
    const formName = formData.get('formName') || 'Без названия';

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
      Заполнена заявка на расчет, сайт "Контрактное производство"

      Имя: ${name}
      Фамилия: ${surname}
      E-mail: ${email}
      Тел: ${phone}
      Комментарий: ${comment}

      Прикрепленные файлы: ${attachments.length > 0 ? attachments.map(a => a.filename).join(', ') : 'нет'}
    `;

    const mailOptions = {
      from: 'mp1fdm@mail.ru',
      to: 'mebelmastery@inbox.ru',
      subject: `Заявка на расчет ${formName} #${String(Date.now()).slice(-6)}`,
      text: mailText,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2>Новый заказ с сайта "Контрактное производство"</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Имя:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Фамилия:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${surname}</td>
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
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Комментарий:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${comment || 'нет'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px;">Детали заказа в прикрепленном PDF-файле(при наличии).</p>
        </div>
      `,
      attachments,
      headers: {
        'Message-ID': `<${Date.now()}@${process.env.SMTP_USER.split('@')[1]}>`,
        'X-Unique-ID': `${Math.random().toString(36).substring(2, 15)}`
      }
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки письма:', error);
    return NextResponse.json({ error: 'Ошибка при отправке письма' }, { status: 500 });
  }
}