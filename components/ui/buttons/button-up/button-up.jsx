'use client'
import css from './button-up.module.scss';
import { useState, useEffect} from "react";
import { basePath } from '@/utils/basePath';


export const Button_Up = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          setIsAtTop(window.scrollY === 0);
          setIsVisible(window.scrollY > 100);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = () => {
      window.scrollTo({
          top: isAtTop ? document.body.scrollHeight : 0,
          behavior: 'smooth'
      });
      // После прокрутки обновляем состояние isAtTop
      setTimeout(() => {
          setIsAtTop(window.scrollY === 0);
      }, 500); // Задержка для завершения анимации прокрутки
  };

    return (
        <div className={`${css.scrollButton} ${isVisible ? css.visible : ''}`}>
        <button 
          onClick={scrollTo}
          aria-label={isAtTop ? 'Scroll down' : 'Scroll to top'}
        >
          <img 
            src={`${basePath}/png/arrow.png`}
            alt="scroll arrow"
            width={24}
            height={24}
            className={`${css.arrow} ${isAtTop ? '' : css.up}`}
          />
        </button>
      </div>
    );
};