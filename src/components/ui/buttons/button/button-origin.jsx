import Link from "next/link";
import css from './button-origin.module.scss'

export const Button_Origin = ({
    text = "Подробнее", // Значение по умолчанию
    width = "7.917vw",       // Значение по умолчанию
    height = "5.539vh",       // Значение по умолчанию
    href = "/",               // Ссылка по умолчанию
}) => {
    return (
        <div className={`${css.button__container} ${css.className}`}>
            <button type='submit' style={{ width, height }}>
                <Link href={href}>
                    {text}
                </Link>
            </button>
        </div>
    );
};