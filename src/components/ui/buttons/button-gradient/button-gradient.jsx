import Link from "next/link";
import css from './button-gradient.module.scss';

export const Button_Gradient = ({ 
    text = "Оставить заявку", // Значение по умолчанию
    width = "11.667vw",       // Значение по умолчанию
    height = "6.042vh",       // Значение по умолчанию
    href = "/",               // Ссылка по умолчанию
    className = ""            // Дополнительные классы
}) => {
    return (
        <div className={`${css.button__container} ${className}`}>
            <button style={{ width, height }}>
                <Link href={href}>
                    {text}
                </Link>
            </button>
        </div>
    );
};