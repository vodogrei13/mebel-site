import css from './button.module.scss'

export const Button = () => {
    return (
        <div className={css.button__container}>
            <button>Заказать расчет</button>
        </div>
    );
};