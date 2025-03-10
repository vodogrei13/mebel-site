import { IconLogo } from "../../../../public/svg/Logo"
import { Navigation } from "../navigation/navigation"
import { TelandEmail } from "../telandemail/telandemail"
import css from './header.module.scss'

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div className={css.header__logo}>
                    <IconLogo/>
                </div>
                <div className={css.header__nav}>
                    <Navigation/>
                </div>
                <div>
                    <TelandEmail/>
                </div>
            </div>
        </div>
    );
};