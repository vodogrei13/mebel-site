'use client'
import Link from "next/link";
import css from './button-gradient.module.scss';

export const Button_Gradient = ({ 
    text = "Оставить заявку", // Значение по умолчанию
    width = "11.667vw",       // Значение по умолчанию
    height = "6.042vh",       // Значение по умолчанию
    href = "/",               // Ссылка по умолчанию
    targetId = null,          // Таргет    
}) => {
    const handleClick = (e) => {
        if (targetId) {
            e.preventDefault();
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const yOffset = -190; // Настройте под ваш хедер
                    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
                    window.scrollTo({
                        top: y,
                        behavior: 'smooth'
                    });
                }
            }, 200);
        }
    };
    return (
        <div className={`${css.button__container} ${css.className}`}>
            <button style={{ width, height }} onClick={handleClick}>
                <Link href={href} scroll={false}>
                    {text}
                </Link>
            </button>
        </div>
    );
};