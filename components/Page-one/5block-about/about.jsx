'use client'
import css from './about.module.scss'
import { useEffect, useState } from 'react'
import { basePath } from '@/utils/basePath';

//Массив Картинок
const sliderImages = [
    { url: `${basePath}/png/about1.png`, alt: 'О нас 1' },
    { url: `${basePath}/png/about2.png`, alt: 'О нас 2' },
    { url: `${basePath}/png/about3.png`, alt: 'О нас 3' },
    { url: `${basePath}/png/about4.png`, alt: 'О нас 4' },
    { url: `${basePath}/png/about5.png`, alt: 'О нас 5' },
];

export const Block_About = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
        const [direction, setDirection] = useState('right');
    
        useEffect(() => {
            const interval = setInterval(() => {
                setDirection('right');
                setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
            }, 5000);
    
            return () => clearInterval(interval);
        }, []);
    return (
      <div>
        <section className={css.block_about__container}>
        <div className={css.main__title}>
            <h3>Наша компания</h3>
        </div>
        <div className={css.main__blocks}>
          <div className={css.main__info}>
            <div className={css.main__text}>
                <p>Наша компания специализируется на комплексном обслуживании производителей корпусной мебели. Мы предлагаем полный цикл услуг — от распила материалов до контрактного производства мебели, а также реализуем качественную фурнитуру и комплектующие от ведущих поставщиков.
                <br/><br/>Мы работаем с клиентами любого масштаба — от небольших мастерских до крупных мебельных предприятий. Наши преимущества — это точность, сроки и индивидуальный подход к каждому заказу.</p>
                <br/>
                <p>Мы контролируем каждый этап производства: от выбора высококачественных материалов до тщательной проверки готовой продукции. Это позволяет нам гарантировать высокое качество всех изделий.</p>
                <p>Благодаря собственному производству, мы предлагаем клиентам индивидуальные решения, включая:</p>
                <ul>
                    <li>Разработку и изготовление продукции по спецификациям заказчика</li>
                    <li>Адаптацию под уникальные требования</li>
                </ul>    
                <p>Мы быстро реагируем на изменения спроса и выпускаем новые продукты в соответствии с требованиями рынка. Это делает нас конкурентоспособными и актуальными.</p>
                <p>Мы выступаем как надежный партнер для производителей мебели:</p>
                <ul>
                    <li>Можем стать резервной площадкой в случае форс-мажоров.</li>
                    <li>Выполняем функции основной производственной площадки для определенных задач (например, изготовление алюминиевых витрин).</li>
                </ul>
                <p>Наши возможности позволяют взять на себя весь производственный цикл:</p>
                <ul>
                    <li>От разработки 3D-моделей, до изготовления комплексного заказа с присадкой под нужную фурнитуру.</li>
                </ul>
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
        </section>
      </div>
    );
};