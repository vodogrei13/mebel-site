import Link from "next/link";
import css from './button-gradient.module.scss'

export const Button_Gradient = () => {
    return (
        <div className={css.button__container}>
            <button><Link href='/'>Все виды производства</Link></button>
        </div>
    );
};