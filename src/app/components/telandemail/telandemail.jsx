import css from './telandemail.module.scss'

export const TelandEmail = () => {
    return (
        <div className={css.header__contact}>
            <p>Телефон: <a href="tel:+78005758599">8(800)5758599</a></p>
            <p>Email: <a href="mailto:Salefdm@mail.ru&body=Будем рады вам ответить!">Salefdm@mail.ru</a></p>
        </div>
    );
};