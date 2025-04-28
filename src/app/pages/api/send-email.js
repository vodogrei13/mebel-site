import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = await new Promise((resolve, reject) => {
      const form = new multiparty.Form();
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const { name, email, phone, comment } = formData.fields;
    const attachments = formData.files?.files?.map(file => ({
      filename: file.originalFilename,
      path: file.path,
    })) || [];

    // Создаем транспорт для отправки почты
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'mp1fdm@mail.ru', // замените на ваш email
        pass: 'LV0y4Lgfa3hqVyehSpaK' // замените на ваш пароль или app password
      }
    });

    // Формируем текст письма
    const mailText = `
      Заполнена заявка на сайте "Контрактное производство"
      
      Имя: ${name}
      E-mail: ${email}
      Тел: ${phone}
      Вопрос: ${comment}
      
      Прикрепленные файлы: ${attachments.length > 0 ? 
        attachments.map(a => a.filename).join(', ') : 'нет'}
    `;

    // Опции письма
    const mailOptions = {
      from: 'your-mail@mail.ru',
      to: 'mp1fdm@mail.ru',
      subject: 'Новая заявка с сайта',
      text: mailText,
      attachments
    };

    // Отправляем письмо
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Error sending email' });
  }
}