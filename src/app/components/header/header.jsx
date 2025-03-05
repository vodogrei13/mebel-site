import { IconLogo } from "../../../../public/svg/Logo"
import { Navigation } from "../navigation/navigation"
import { TelandEmail } from "../telandemail/telandemail"
import css from './header.module.scss'

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div>
                    <IconLogo/>
                </div>
                <div>
                    <Navigation/>
                </div>
                <div>
                    <TelandEmail/>
                </div>
            </div>
        </div>
    );
};