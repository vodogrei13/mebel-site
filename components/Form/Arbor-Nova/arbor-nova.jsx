"use client"
import css from "./arbor-nova.module.scss";
import { basePath } from '@/utils/basePath';
import { useEffect, useState } from "react";
import { Form } from "../base-form/form";

const images = [
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-1.png`,
    text: "Стремление к естественной красоте и совершенству – это идея и движущая сила развития нашего бизнеса. Это то, как мы видим и выстраиваем работу с нашими партнерами и заказчиками.",
  },
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-2.png`,
    text: "Arbor Nova располагает собственным производством и складской базой в Ленинградской области.",
  },
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-3.png`,
    text: "Мы изготавливаем мебельные фасады, а также элементы мебели, в числе которых  столешницы, барные стойки, консоли, полки, карнизы, угловые элементы и т.д. Наша продукция используется для изготовления корпусной, кухонной и офисной мебели, а также в оформлении интерьера.",
  },
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-4.png`,
    text: "Arbor Nova сотрудничает с ведущими дизайн-студиями и проектными бюро и предлагает выполнение как индивидуальных, так и типовых проектов «под ключ». Наши специалисты постоянно отслеживают последние тенденции в области дизайна мебели и учитывают их при создании новых коллекций.",
  },
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-5.png`,
    text: "Arbor Nova предлагает выполнение как индивидуальных, так и типовых проектов «под ключ».",
  },
  {
    src: `${basePath}/png/fasads/Arbor-Nova/Arbor-Nova-6.png`,
    text: "Arbor Nova является эксклюзивным дистрибьютором итальянского шпона ALPI.",
  },
];

export const ArborNova = () => {
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
      }, 1000); // Должно совпадать с длительностью перехода в CSS
    }, 8000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={css.ArborNova__container}>
      <img 
        src={`${basePath}/png/fasads/arbor-nova.png`} 
        alt="Логотип Arbor Nova" 
        className={css.ArborNova__logo}
      />
      <div className={css.ArborNova__slider}>
        {images.map((image, index) => (
          <div 
            key={index}
            className={`${css.ArborNova__slide} ${
              index === currentIndex || (index === nextIndex && isTransitioning) 
                ? css.active 
                : ''
            }`}
          >
            <img src={image.src} alt="Arbor Nova" className={css.ArborNova__slideImage} />
            <div className={css.ArborNova__overlay}>
              <p className={css.ArborNova__slideText}>
                {index === currentIndex ? image.text : images[nextIndex].text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={css.ArborNova__blank}>
        <p className={css.ArborNova__text}>Скачайте бланк по ссылке</p>
        <p className={css.ArborNova__text}>Заполните его и прикрепите в заявке на расчет</p>
        <button className={css.ArborNova__button}>
            <a
            href={`${basePath}/files/arbor-nova-blank.XLSX`}
            download="Бланк_заполнения_Arbor_Nova.XLSX"
            className={css.ArborNova__link}
          >
            Скачать бланк
          </a>
        </button>
      </div>
      <div className={css.ArborNova__form}>
        <Form/>
      </div>
    </div>
  );
};