import Link from "next/link";
import css from './button-gradient.module.scss'
import { IconArrow } from "../../../../../public/svg/arrow";

export const Button_Gradient = () => {
    return (
        <div className={css.button__container}>
            <button><Link href='/'>Оставить заявку</Link></button>
        </div>
    );
};