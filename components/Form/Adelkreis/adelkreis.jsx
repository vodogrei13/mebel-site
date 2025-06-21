"use client"
import css from "./adelkreis.module.scss";
import { basePath } from '@/utils/basePath';
import { useEffect, useState } from "react";
import { Form } from "../base-form/form";

const images = [
  {
    src: `${basePath}/png/fasads/Adelkreis/Adelkreis-1.png`,
    text: " Качество. Качественные характеристики фасадной части мебели главным образом отражаются на оценке качества мебели в целом. Производство, оснащенное передовым технологическим оборудованием, высококлассные специалисты и строгий контроль качества на протяжении всего производственного цикла позволяют нам создавать непревзойденную по качеству и внешним показателям продукцию.",
  },
  {
    src: `${basePath}/png/fasads/Adelkreis/Adelkreis-2.png`,
    text: "Инновации. Мы знаем, что наши клиенты ждут от нас инновационных решений. Тщательный анализ рынка и система инновационного менеджмента служат гарантией того, что наши разработки соответствуют самым изысканным требованиям клиентов.",
  },
  {
    src: `${basePath}/png/fasads/Adelkreis/Adelkreis-7.png`,
    text: " Надежность. Одна из трех основных ценностей компании Adelkreis наряду с качеством и инновациями. Для нас надежность - это надежная продукция с длительным сроком эксплуатации, надежная упаковка, позволяющая осуществлять доставку на большие расстояния, и надежные поставки точно в срок.",
  },
  {
    src: `${basePath}/png/fasads/Adelkreis/Adelkreis-6.png`,
    text: "Продукция компании Adelkreis устойчива к образованию царапин",
  },
  {
    src: `${basePath}/png/fasads/Adelkreis/Adelkreis-5.png`,
    text: "Adelkreis - это большой выбор готовых цветовых решений",
  },
];

export const Adelkreis = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % images.length);
      setIsTransitioning(true);
      
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={css.Adelkreis__container}>
      <img 
        src={`${basePath}/png/fasads/adelkreis.png`} 
        alt="Логотип Arbor Nova" 
        className={css.Adelkreis__logo}
      />
      <div className={css.Adelkreis__slider}>
        {images.map((image, index) => (
          <div 
            key={index}
            className={`${css.Adelkreis__slide} ${
              index === currentIndex || (index === nextIndex && isTransitioning) 
                ? css.active 
                : ''
            }`}
          >
            <img src={image.src} alt="Arbor Nova" className={css.Adelkreis__slideImage} />
            <div className={css.Adelkreis__overlay}>
              <p className={css.Adelkreis__slideText}>
                {index === currentIndex ? image.text : images[nextIndex].text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={css.Adelkreis__blank}>
        <p className={css.Adelkreis__text}>Скачайте бланк по ссылке</p>
        <p className={css.Adelkreis__text}>Заполните его и прикрепите в заявке на расчет</p>
        <div className={css.Adelkreis__button_block}>
          <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа Lite.xls`}
            download="Бланк заказа Lite.xls"
            className={css.Adelkreis__link}
          >
            Бланк заказа Lite
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа IMD urban.xls`}
            download="Бланк заказа IMD urban.xls"
            className={css.Adelkreis__link}
          >
            Бланк заказа IMD urban
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа IMD STONE.xls`}
            download="Бланк заказа IMD STONE.xls"
            className={css.Adelkreis__link}
          >
            Бланк заказа IMD STONE
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа IMD Fenix interline.xls`}
            download="Бланк заказа IMD Fenix interline.xls"
            className={css.Adelkreis__link}
          >
            Бланк заказа IMD Fenix interline
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа Luna_кромка ПВХ.xls`}
            download="Бланк заказа Luna_кромка ПВХ.xls"
            className={css.Adelkreis__link}
          >
            Бланк заказа Luna_кромка ПВХ
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа Brilliantlinie, облицованный с 2-х сторон.xls`}
            download="Бланк заказа Brilliantlinie, облицованный с 2-х сторон"
            className={css.Adelkreis__link}
          >
            Бланк заказа Brilliantlinie, облицованный с 2-х сторон
          </a>
        </button>
        <button className={css.Adelkreis__button}>
            <a
            href={`${basePath}/files/Бланк заказа Brilliantlinie, облицованный с 1-й стороны.xls`}
            download="Бланк заказа Brilliantlinie, облицованный с 1-й стороны"
            className={css.Adelkreis__link}
          >
            Бланк заказа Brilliantlinie, облицованный с 1-й стороны
          </a>
        </button>
        </div>
      </div>
      <div className={css.Adelkreis__form}>
        <Form/>
      </div>
    </div>
  );
};