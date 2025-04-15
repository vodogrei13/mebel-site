import { IconLogo } from "../../../public/svg/Logo"
import { Navigation } from "../navigation/navigation"
import { TelandEmail } from "../telandemail/telandemail"
import Link from "next/link";
import css from './header.module.scss'

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div className={css.header__logo}>
                    <Link href='/mebel-site'><IconLogo/></Link>     
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