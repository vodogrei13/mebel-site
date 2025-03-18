import { Navigation } from '../navigation/navigation';
import css from './footer.module.scss'

export const Footer = () => {
    return (
        <div className={css.footer__wrapper}>
            <div className={css.footer__container}>
                <div className={css.header__nav}>
                    <Navigation/>
                </div>
            </div>
        </div>
    );
};