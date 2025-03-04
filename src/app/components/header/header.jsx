import { IconLogo } from "../../../../public/svg/Logo"

const Header = () => {
    return (
        <div className="header__container">
            <div>
                <IconLogo/>
            </div>
            <div className="header__nav">
                <ul className="header__list">
                    <li className="header__item"><a href="!#" className="header__nav_link">Услуги</a></li>
                    <li className="header__item"><a href="!#" className="header__nav_link">Наши Клиенты</a></li>
                    <li className="header__item"><a href="!#" className="header__nav_link">Отзывы</a></li>
                    <li className="header__item"><a href="!#" className="header__nav_link">Доставка</a></li>
                    <li className="header__item"><a href="!#" className="header__nav_link">Контакты</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;