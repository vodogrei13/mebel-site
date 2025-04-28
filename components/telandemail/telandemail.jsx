import css from './telandemail.module.scss'

export const TelandEmail = () => {
    return (
        <div className={css.header__contact}>
            <p>Телефон: <a href="tel:+79201312983">8(920)131-29-83</a></p>
            <p>Email: <a href="mailto:Salefdm@mail.ru&body=Будем рады вам ответить!">Salefdm@mail.ru</a></p>
        </div>
    );
};