import { Navigation } from "@/components/navigation/navigation"
import { TelandEmail } from "@/components/telandemail/telandemail"
import Link from "next/link";
import css from './header.module.scss'
import { IconLogoMain } from "@/public/svg/LogoMain";

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div className={css.header__logo}>
                    <Link href='/'>
                        <IconLogoMain width="100%" height="100%"/>
                    </Link>     
                </div>
                <div className={css.header__nav}>
                    <Navigation/>
                </div>
                <div className={css.header__contact}>
                    <TelandEmail/>
                </div>
            </div>
        </div>
    );
};