'use client'
import Link from "next/link";
import css from './button-gradient.module.scss';

export const Button_Gradient = ({ 
    text = "Оставить заявку", // Значение по умолчанию
    width = "11.667vw",       // Значение по умолчанию
    height = "6.042vh",       // Значение по умолчанию
    href = "/",               // Ссылка по умолчанию
    targetId = null,          // Таргет    
    target = "_self", // Значение по умолчанию
    rel = "",         // Значение по умолчанию
    onClick,
}) => {
    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }
        
        if (targetId) {
            e.preventDefault();
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) {
                    const yOffset = -190;
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
             {onClick ? (
                <button style={{ width, height }} onClick={handleClick}>
                    {text}
                </button>
            ) : (
                <Link 
                    href={href} 
                    scroll={false} 
                    passHref 
                    legacyBehavior 
                    target={target} 
                    rel={rel}
                >
                    <button style={{ width, height }} onClick={handleClick}>
                        {text}
                    </button>
                </Link>
            )}
        </div>
    );
};