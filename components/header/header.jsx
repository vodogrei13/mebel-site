import { IconLogo1 } from "@/public/svg/Logotest1"
import { Navigation } from "@/components/navigation/navigation"
import { TelandEmail } from "@/components/telandemail/telandemail"
import Link from "next/link";
import { basePath } from '@/utils/basePath';
import css from './header.module.scss'

export const Header = () => {
    return (
        <div className={css.header__wrapper}>
            <div className={css.header__container}>
                <div className={css.header__logo}>
                    <Link href='/'>
                    <img src={`${basePath}/png/Logotest3.png`} alt="logo" className={css.header__logo_item}/>
                    {/* <IconLogo1 width="3.75vw" height="7.1vh"/> */}
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