'use client'
import Link from "next/link";
import css from "./footer.module.scss";
import { TelandEmail } from "../telandemail/telandemail";
import { IconTelegram } from "../../../public/svg/Telegram";
import { IconWhatsApp } from "../../../public/svg/WhatsApp";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();
  
      const handleAboutClick = (e) => {
          e.preventDefault();
          
          // Если не на главной странице
          if (window.location.pathname !== "/") {
              router.push("/#target-about");
              return;
          }
          setTimeout(() => {
              const element = document.getElementById("target-about");        if (element) {
              const yOffset = -40; // Настройте под ваш хедер
              const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
              window.scrollTo({
                  top: y,
                  behavior: 'smooth'
              });
          }
      }, 200);
  };
  return (
    <div className={css.footer__wrapper}>
      <div className={css.footer__container}>
        <section className={css.footer__nav}>
          <ul className={css.nav__list}>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
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
            <li className={css.nav__item}>
              <Link href="/countertops" className="container__nav_link">
                Столешницы
              </Link>
            </li>
          </ul>
          <ul className={css.nav__list}>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Мебельные<br/>фасады
              </Link>
            </li>
            <li className={css.nav__item}>
            <Link 
                href="/#target-about" 
                className={css.nav__link}
                onClick={handleAboutClick}
                scroll={false}
            >
                О нас
            </Link>
            </li>
          </ul>
        </section>
        <section className={css.footer__contact}>
            <div className={css.contact__map}>
                <div style={{position:'relative', overflow:'hidden'}}>
                    <a
                    href="https://yandex.ru/maps/org/fdm/60072063603/?utm_medium=mapframe&utm_source=maps"
                    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'0px'}}
                    >
                    ФДМ
                    </a>
                    <a
                    href="https://yandex.ru/maps/16/yaroslavl/category/furniture_factory/184106634/?utm_medium=mapframe&utm_source=maps"
                    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'14px'}}
                    >
                    Мебельная фабрика в Ярославле
                    </a>
                    <a
                    href="https://yandex.ru/maps/16/yaroslavl/category/warehouse/160816688334/?utm_medium=mapframe&utm_source=maps"
                    style={{color:'#eee', fontSize:'12px', position:'absolute', top:'28px'}}
                    >
                    Склад в Ярославле
                    </a>
                    <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=39.818495%2C57.676193&mode=poi&poi%5Bpoint%5D=39.816762%2C57.676539&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D60072063603&z=18.38"
                    width={360}
                    height={214}
                    frameBorder={1}
                    allowFullScreen={true}
                    style={{position:'relative'}}
                    ></iframe>
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
    </div>
  );
};
