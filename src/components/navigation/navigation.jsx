'use client'
import Link from "next/link";
import css from './navigation.module.scss'

export const Navigation= () => {

    const handleAboutClick = (e) => {
        e.preventDefault();
        
        if (window.location.pathname !== "/mebel-site") {
          // Сохраняем информацию о необходимости скролла после загрузки
          sessionStorage.setItem('shouldScrollToAbout', 'true');
          window.location.href = "/mebel-site";
          return;
        }
        
        // Если уже на нужной странице, выполняем скролл сразу
        scrollToAbout();
      }
      
      const scrollToAbout = () => {
        const element = document.getElementById("target-about");
        if (element) {
          const yOffset = -40;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
      
    return (
        <div className={css.container__nav}>
            <ul className={css.nav__list}>
                <li className={css.nav__item}>
                    <Link href="#" className={css.nav__link}>Кухонные модуля</Link>
                </li>
                <li className={css.nav__item}>
                    <Link href="#" className={css.nav__link}>Мебельные фасады</Link>
                </li>
                <li className={css.nav__item}>
                    <Link href="/raspil" className={css.nav__link}>Професиональный распил</Link>
                </li>
                <li className={css.nav__item}>
                    <Link href="/dveri-kupe" className={css.nav__link}>Двери-купе</Link>
                </li>
                <li className={css.nav__item}>
                    <Link href="/countertops" className={css.nav__link}>Столешницы</Link>
                </li>
                <li className={css.nav__item}>
                    <Link 
                        href="/mebel-site" 
                        className={css.nav__link}
                        onClick={(e) => handleAboutClick(e)}
                        scroll={false}
                    >
                        О нас
                    </Link>
                </li>
            </ul>
        </div>
    )
}