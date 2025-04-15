'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './block-welcome.module.scss'

import { useEffect, useState } from 'react'

//Массив Картинок
const sliderImages = [
    { url: '/mebel-site/png/test.png', alt: 'Фото 1' },
    { url: '/mebel-site/png/test2.png', alt: 'Фото 2' },
    { url: '/mebel-site/png/test3.png', alt: 'Фото 3' },
];

export const Block_Raspil = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
        const [direction, setDirection] = useState('right');
    
        useEffect(() => {
            const interval = setInterval(() => {
                setDirection('right');
                setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
            }, 7000);
    
            return () => clearInterval(interval);
        }, []);

    return (
      <div>
        <section className={css.block_raspil__container}>
        <div className={css.main__blocks}>
          <div className={css.main__info}>
            <div className={css.main__title}>
              <h3>Профессиональный распил, кромление и контрактное производство мебели</h3>
            </div>
            <div className={css.main__text}>
              <p>Идеальные решения для вашего мебельного бизнеса
              <br/>Добро пожаловать на страницу, где ваши идеи воплощаются в жизнь! Мы предлагаем полный спектр услуг для производства мебели, включая распил, кромление, изготовление мебели по контракту и профессиональное проектирование в программе «Базис Мебельщик».</p>
              <br/>            
            </div>
            <div className={css.main__services}>
                <h3>Наши услуги:</h3>
                <ul className={css.main__services_list}>
                    <li className={css.main__services_item}>
                        <span>Распил и кромление</span><br/>Точность и качество — ключевые принципы нашей работы. Мы используем современное оборудование, чтобы обеспечить идеальный распил и надежное кромление деталей. Ваши изделия будут выглядеть безупречно и прослужат долгие годы.
                    </li>
                    <li className={css.main__services_item}>
                        <span>Контрактное производство мебели</span><br/>Экономьте время и ресурсы, доверив нам изготовление мебели на заказ. Мы работаем с любыми объемами и гарантируем высокое качество исполнения. Ваши проекты будут выполнены точно в срок.
                    </li>
                    <li className={css.main__services_item}>
                        <span>Проектирование в программе "Базис Мебельщик"</span><br/>Создавайте мебель с максимальной точностью! Наши специалисты работают в программе «Базис Мебельщик», разрабатывая проекты любой сложности. Вы получите профессиональные чертежи и визуализации, которые помогут воплотить ваши идеи.
                    </li>
                </ul>
            </div>
            <div className={css.main__why_us}>
                <h3>Почему выбирают нас?</h3>
                <ul className={css.main__why_us_list}>
                    <li className={css.main__why_us_item}>
                        <span>Современное оборудование</span><br/>Мы используем передовые технологии для достижения идеального результата
                    </li>
                    <li className={css.main__why_us_item}>
                        <span>Опытная команда</span><br/>Наши специалисты имеют многолетний опыт работы в мебельной индустрии.
                    </li>
                    <li className={css.main__why_us_item}>
                        <span>Индивидуальный подход</span><br/>Мы учитываем все ваши пожелания и требования, чтобы создать продукт, который полностью соответствует вашим ожиданиям.
                    </li>
                </ul>
            </div>
            <div className={css.main__contact}>
                <p><span>Начните сотрудничество уже сегодня!</span><br/>
                Свяжитесь с нами, чтобы обсудить ваш проект, получить консультацию или оформить заказ. Мы готовы помочь вам на каждом этапе — от разработки идеи до готового изделия. Ваш успех — наша цель!</p>
            </div>
          </div>
          <section className={css.block__countertops_slider_image}>
                <div className={css.sliderWrapper}>
                    {sliderImages.map((image, index) => (
                        <div 
                            key={index}
                            className={`${css.slide} ${index === currentSlide ? css.active : ''} ${direction}`}
                            style={{ backgroundImage: `url(${image.url})` }}
                            aria-hidden={index !== currentSlide}
                        />
                    ))}
                </div>
            </section>
        </div>
        <div className={css.main__button}>
              <Button_Gradient
              text="Заказать распил"
              width="11.719vw"
              height="6vh"
              href='/'
              />
            </div>
        </section>
      </div>
    );
};