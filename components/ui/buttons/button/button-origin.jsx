import Link from "next/link";
import css from './button-origin.module.scss'
import { basePath } from '@/utils/basePath';

export const Button_Origin = ({
    text = "Подробнее",
    width = "calc(7.917vw + 12px)",
    height = "calc(60px + 12px)",    
    href,  
    type = "button",
    onClick,       
}) => {
    if (href) {
        return (
            <div className={`${css.button__container} ${css.className}`}>
                <a href={`${basePath}${href}`} className={css.button__link}>
                    <button 
                        type={type}
                        style={{ minWidth: width, minHeight: height }}
                    >
                        {text}
                    </button>
                </a>
            </div>
        );
    }

    return (
        <div className={`${css.button__container} ${css.className}`}>
            <button 
                type={type}
                style={{ minWidth: width, minHeight: height }}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
};