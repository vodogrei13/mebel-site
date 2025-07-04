'use client'
import Link from "next/link";
import css from './navigation.module.scss'
import { useState, useEffect } from "react";
import { IconMenu } from "@/public/svg/IconMenu";


export const Navigation= () => {
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 812);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    useEffect(() => {
        const handleScroll = () => {
            if (menuOpen) {
                setMenuOpen(false);
            }
        };

        if (menuOpen) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [menuOpen]);

    const toggleMenu = () => {
      setMenuOpen(prev => !prev);
    };
    
    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleAboutClick = (e) => {
      e.preventDefault();
      closeMenu();
  
      if (window.location.pathname !== "/") {
        sessionStorage.setItem('shouldScrollToAbout', 'true');
        window.location.href = "/";
        return;
      }
  
      const element = document.getElementById("target-about");
      if (element) {
        const yOffset = -40;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  
    const navList = (
      <ul className={css.nav__list}>
        <li className={css.nav__item}><Link href="/raspil" className={css.nav__link}>Професиональный<br/>распил</Link></li>
        <li className={css.nav__item}><Link href="/fasad-for-kitchen" className={css.nav__link}>Мебельные<br/>фасады</Link></li>
        <li className={css.nav__item}><Link href="/kitchen-module" className={css.nav__link}>Кухонные<br/>модуля</Link></li>
        <li className={css.nav__item}><Link href="/dveri-kupe" className={css.nav__link}>Двери-купе</Link></li>
        <li className={css.nav__item}><Link href="/countertops" className={css.nav__link}>Столешница<br/>для кухни</Link></li>
        <li className={css.nav__item}>
          <Link 
            href="/" 
            className={css.nav__link}
            onClick={(e) => handleAboutClick(e)}
            scroll={false}
          >
            О компании
          </Link>
        </li>
      </ul>
    );
  
    return (
      <div className={css.container__nav}>
        {isMobile ? (
          <>
            <button onClick={toggleMenu} className={css.menu__button}>
              <IconMenu width="100%" height="100%"/>
            </button>
            {menuOpen && <div className={css.mobile__menu}>{navList}</div>}
          </>
        ) : (
          navList
        )}
      </div>
    );
  };