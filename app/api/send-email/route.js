import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
  console.log('Начало обработки запроса');
  
  try {
    const formData = await req.formData();
    console.log('FormData получен');

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const comment = formData.get('comment');
    console.log('Текстовые данные извлечены:', { name, email, phone, comment });

    const files = formData.getAll('files');
    console.log('Получено файлов:', files.length);

    // Логирование информации о файлах
    files.forEach((file, index) => {
      console.log(`Файл ${index + 1}:`, {
        name: file.name,
        size: file.size,
        type: file.type
      });
    });

    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        return {
          filename: file.name,
          content: buffer,
          size: buffer.length
        };
      })
    );
    console.log('Вложения подготовлены');

    console.log('Создание транспорта SMTP...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Проверка подключения к SMTP
    try {
      console.log('Проверка подключения к SMTP...');
      await transporter.verify();
      console.log('Подключение к SMTP успешно');
    } catch (verifyError) {
      console.error('Ошибка проверки SMTP:', verifyError);
      throw new Error('Не удалось подключиться к SMTP серверу');
    }

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
      to: 'mebelmastery@inbox.ru',
      subject: `Новая заявка с сайта #${String(Date.now()).slice(-6)}`,
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
      attachments,
      headers: {
        'Message-ID': `<${Date.now()}@${process.env.SMTP_USER.split('@')[1]}>`,
        'X-Unique-ID': `${Math.random().toString(36).substring(2, 15)}`
      }
    };

    console.log('Отправка письма...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Письмо отправлено:', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Полная ошибка:', {
      message: error.message,
      stack: error.stack,
      raw: error
    });
    return NextResponse.json(
      { error: 'Ошибка при отправке письма', details: error.message },
      { status: 500 }
    );
  }
}