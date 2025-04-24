'use client'
import Link from "next/link";
import css from "./footer.module.scss";
import { TelandEmail } from "../telandemail/telandemail";
import { IconTelegram } from "../../../public/svg/Telegram";
import { IconWhatsApp } from "../../../public/svg/WhatsApp";
import { IconLogo } from "../../../public/svg/Logo";

export const Footer = () => {
 
  const handleAboutClick = (e) => {
    e.preventDefault();
    
    if (window.location.pathname !== "/mebel-site") {
      // Сохраняем информацию о необходимости скролла после загрузки
      sessionStorage.setItem('shouldScrollToAbout', 'true');
      window.location.href = "/mebel-site";
      return;
    }
    
    // Если уже на нужной странице, выполняем скролл сразу
    scrollToAbout();
  }
  
  const scrollToAbout = () => {
    const element = document.getElementById("target-about");
    if (element) {
      const yOffset = -40;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <div className={css.footer__wrapper}>
      <div className={css.footer__container}>
        <section className={css.footer__nav}>
        <Link href='/'><IconLogo stroke="#fff"/></Link> 
          <ul className={css.nav__list}>
            <li className={css.nav__item}>
              <Link href="/kitchen-module" className="container__nav_link">
                Кухонные<br/>модули
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="/raspil" className="container__nav_link">
                Професиональный<br/>распил
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="/dveri-kupe" className="container__nav_link">
                Двери-купе
              </Link>
            </li>
          </ul>
          <ul className={css.nav__list}>
          <li className={css.nav__item}>
              <Link href="/countertops" className="container__nav_link">
                Столешницы
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="/fasad-for-kitchen" className="container__nav_link">
                Мебельные<br/>фасады
              </Link>
            </li>
            <li className={css.nav__item}>
            <Link 
                href="/mebel-site" 
                className={css.nav__link}
                onClick={(e) => handleAboutClick(e)}
                scroll={false}
            >
                О компании
            </Link>
            </li>
          </ul>
        </section>
        <section className={css.footer__contact}>
            <div className={css.contact__map}>
                <div style={{position:'relative', overflow:'hidden'}}>
                    <a
                    href="https://yandex.ru/maps/16/yaroslavl/?utm_medium=mapframe&utm_source=maps" 
                    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}
                    >
                    ФДМ-Производство
                    </a>
                    <a
                    href="https://yandex.ru/maps/16/yaroslavl/?ll=39.818219%2C57.676388&mode=routes&rtext=57.675755%2C39.815369~57.676084%2C39.817234&rtt=pd&ruri=~&utm_medium=mapframe&utm_source=maps&z=18.33"
                    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}
                    >
                    Мебельная фабрика в Ярославле
                    </a>
                    <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=39.818219%2C57.676388&mode=routes&rtext=57.675755%2C39.815369~57.676084%2C39.817234&rtt=pd&ruri=~&z=18.33"
                    width={360}
                    height={214}
                    frameBorder={1}
                    allowFullScreen={true}
                    style={{position:'relative'}}
                    >
                    </iframe>
                </div>
          </div>
          <div className={css.contact__info}>
            <h3>Контакты:</h3>
              <TelandEmail/>
            <div className={css.social}>
              <p>Социальные сети:</p>
              <div className={css.items}>
                <a href='#' className={css.telegram}><IconTelegram/></a>
                <a href='#' className={css.whatsApp}><IconWhatsApp/></a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <hr className={css.line} align="center" width="100%" size="2" color="#d5c9be" />
      <div className={css.policy}>
                <p>© 2025, Copyright.</p>
                <Link href="/">Политика конфиденциальности</Link>
            </div>
    </div>
  );
};
