'use client'
import React, { useState, useEffect } from 'react';
import { Button_Origin } from '../../components/ui/buttons/button/button-origin';
import css from './form.module.scss'

export const Form = () => {

    const [comment, setComment] = useState('');

    useEffect(() => {
        // Получаем комментарий из localStorage только на стороне клиента
        const storedComment = localStorage.getItem('commentDraft') || '';
        setComment(storedComment);
    }, []); // Запускаем только один раз при монтировании

    const handleChange = (event) => {
        const newComment = event.target.value;
        setComment(newComment);
        localStorage.setItem('commentDraft', newComment);  // Устанавливаем комментарий при изменении в useEffect, чтобы обеспечить его выполнение только на стороне клиента
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Отправьте комментарий на сервер или выполните другие действия
        localStorage.removeItem('commentDraft'); // Удалите черновик из localStorage
        setComment(''); // Очистите поле
    };

    return (
        <div className={css.form__container}>
            <div className={css.form__title}>
                <h2>Оставьте заявку на расчет</h2>
            </div>
            <div className={css.form__items}>
                <form method='post' onSubmit={handleSubmit}>
                    <input type="text" id="name" name="name" placeholder='ИМЯ' required/>

                    <input type="email" id="email" name="email" placeholder='E-MAIL' required/>

                    <input type="tel" id="phone" name="phone"placeholder='ТЕЛЕФОН' required/>

                    <textarea onChange={handleChange} value={comment} id="message" name="message" spellCheck='true' placeholder='ВАШЕ СООБЩЕНИЕ'/>

                    <Button_Origin/>
                </form>
            </div>
        </div>
    );
};