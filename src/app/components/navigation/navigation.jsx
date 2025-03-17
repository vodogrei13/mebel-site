import css from './navigation.module.scss'


export const Navigation= () => {
    return (
        <div className={css.container__nav}>
            <ul className={css.nav__list}>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Каталог услуг</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Условия</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">О нас</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Базис салон</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Контакты</a></li>
            </ul>
        </div>
    )
}