import Link from "next/link";
import css from './navigation.module.scss'


export const Navigation= () => {

    return (
        <div className={css.container__nav}>
            <ul className={css.nav__list}>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Кухонные модуля</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Мебельные фасады</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Мебель для мебельщика</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Двери-купе</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">Столешницы</Link></li>
                <li className={css.nav__item}><Link href="#" id='ssilka' className="container__nav_link">О нас</Link></li>
            </ul>
        </div>
    )
}