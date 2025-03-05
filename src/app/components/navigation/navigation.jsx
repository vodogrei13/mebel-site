import css from './navigation.module.scss'


export const Navigation= () => {
    return (
        <div className={css.container__nav}>
            <ul className={css.nav__list}>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Услуги</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Наши клиенты</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Отзывы</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Доставка</a></li>
                <li className={css.nav__item}><a href="!#" className="container__nav_link">Контакты</a></li>
            </ul>
        </div>
    )
}