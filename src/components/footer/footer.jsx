import Link from "next/link";
import css from "./footer.module.scss";

export const Footer = () => {
  return (
    <div className={css.footer__wrapper}>
      <div className={css.footer__container}>
        <section className={css.footer__nav}>
          <ul className={css.nav__list}>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Условия
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                О нас
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Базис салон
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Каталог услуг
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Шкафы-купе
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Калькулятор
                <br />
                витрин
              </Link>
            </li>
          </ul>
          <ul className={css.nav__list}>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Раскрой онлайн
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Доставка
              </Link>
            </li>
            <li className={css.nav__item}>
              <Link href="#" className="container__nav_link">
                Расчет фасадов
                <br />
                онлайн
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
                    width="360"
                    height="214"
                    frameborder="1"
                    allowfullscreen="true"
                    style={{position:'relative'}}
                    ></iframe>
                </div>
          </div>
        </section>
      </div>
    </div>
  );
};
