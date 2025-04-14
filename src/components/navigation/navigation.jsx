import Link from "next/link";
import css from './navigation.module.scss'


export const Navigation= () => {

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
                    <Link href="#" className={css.nav__link}>О нас</Link>
                </li>
            </ul>
        </div>
    )
}