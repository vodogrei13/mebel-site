import Link from "next/link";
import css from './button-origin.module.scss'

export const Button_Origin = ({
    text = "Подробнее", // Значение по умолчанию
    width = "calc(7.917vw + 12px)",       // Значение по умолчанию
    height = "calc(60px + 12px)",       // Значение по умолчанию
    href = "/",               // Ссылка по умолчанию
}) => {
    return (
        <div className={`${css.button__container} ${css.className}`}>
            <Link href={href} passHref legacyBehavior>
                <button type="button" style={{ minWidth: width, minHeight: height }}>
                    {text}
                </button>
            </Link>
        </div>
    );
};