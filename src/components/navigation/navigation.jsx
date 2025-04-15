'use client'
import Link from "next/link";
import css from './navigation.module.scss'
import { useRouter } from "next/navigation";


export const Navigation= () => {
    const router = useRouter();

    const handleAboutClick = (e) => {
        e.preventDefault();
        
        // Если не на главной странице
        if (window.location.pathname !== "/") {
            router.push("/#target-about");
            return;
        }
        setTimeout(() => {
            const element = document.getElementById("target-about");        if (element) {
            const yOffset = -40; // Настройте под ваш хедер
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
    }, 200);
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
                        href="/#target-about" 
                        className={css.nav__link}
                        onClick={handleAboutClick}
                        scroll={false}
                    >
                        О нас
                    </Link>
                </li>
            </ul>
        </div>
    )
}