import Link from "next/link";
import css from './button-origin.module.scss'

export const Button_Origin = () => {
    return (
        <div className={css.button__container}>
            <button type='submit'><Link href='/'>Подробнее</Link></button>
        </div>
    );
};