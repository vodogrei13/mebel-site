import { IconLogo } from "@/public/svg/Logo"
import { Navigation } from "@/components/navigation/navigation"
import { TelandEmail } from "@/components/telandemail/telandemail"
import Link from "next/link";
import css from './header.module.scss'

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div className={css.header__logo}>
                    <Link href='/'><IconLogo/></Link>     
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