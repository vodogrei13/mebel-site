import Link from "next/link";
import css from './navigation.module.scss'


export const Navigation= () => {

    return (
        <div className={css.container__nav}>
            <ul className={css.nav__list}>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Каталог услуг</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Условия</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">О нас</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Базис салон</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka'className="container__nav_link">Контакты</Link></li>
            </ul>
        </div>
    )
}