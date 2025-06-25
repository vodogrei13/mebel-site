'use client'
import Link from "next/link";
import css from './button-gradient.module.scss';
import { ArrowIcon } from '@/public/svg/button_arrow.js';

export const Button_Gradient = ({ 
    text = "Оставить заявку",
    width = "219px",
    height = "60px",
    href = "/",
    targetId = null,
    target = "_self",
    rel = "",
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

    const buttonContent = (
        <>
            <span>{text}</span>
            <ArrowIcon className={css.arrow} />
        </>
    );

    return (
        <div className={`${css.button__container} ${css.className}`}>
             {onClick ? (
                <button style={{ '--width': width, '--height': height }} onClick={handleClick}>
                    {buttonContent}
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
                        {buttonContent}
                    </button>
                </Link>
            )}
        </div>
    );
};