import css from './form.module.scss'

export const Form = () => {
    return (
        <div className={css.form__container}>
            <div className={css.form__title}>
                <h2>Оставьте заявку на расчет</h2>
            </div>
            <div className={css.form__items}>
                <form action="#" method='post'>
                    <input type="text" id="name" name="name" placeholder='ИМЯ' required/>

                    <input type="email" id="email" name="email" placeholder='E-MAIL' required/>

                    <input type="tel" id="phone" name="phone"placeholder='ТЕЛЕФОН' required/>

                    <textarea  id="message" name="message" placeholder='ВАШЕ СООБЩЕНИЕ' required/>

                    <button className={css.form__button} type="submit">Подробнее</button>
                </form>
            </div>
        </div>
    );
};