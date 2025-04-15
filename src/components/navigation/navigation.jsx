'use client'
import Link from "next/link";
import css from './navigation.module.scss'

export const Navigation= () => {

    const handleAboutClick = (e) => {
        e.preventDefault();
      
        if (window.location.pathname !== "/mebel-site") {
            router.push(null, "", "/mebel-site");
          // Подождем, пока страница загрузится, затем проскроллим
          setTimeout(() => {
            const element = document.getElementById("target-about");
            if (element) {
              const yOffset = -40;
              const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({ top: y, behavior: "smooth" });
            }
          }, 400); // немного больше времени, чтобы точно загрузился DOM
          return;
        }
      
        const element = document.getElementById("target-about");
        if (element) {
          const yOffset = -40;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };
      
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