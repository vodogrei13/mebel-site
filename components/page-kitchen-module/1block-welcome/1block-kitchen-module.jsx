'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-kitchen-module.module.scss'
import { basePath } from '@/utils/basePath';
import { useEffect, useState } from 'react'

//Массив Картинок
const sliderImages = [
    { url: `${basePath}/png/test.png`, alt: 'Фото 1' },
    { url: `${basePath}/png/test2.png`, alt: 'Фото 2' },
    { url: `${basePath}/png/test3.png`, alt: 'Фото 3' },
];

export const Block_KitchenModule = () => {
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
        <section className={css.block_kitchen__container}>
        <div className={css.main__blocks}>
          <div className={css.main__info}>
            <div className={css.main__title}>
                <h3>Кухонные модули</h3>
            </div>
            <div className={css.main__text}>
                <p>Наша компания специализируется на производстве высококачественных кухонных модулей для мебельных мастеров, дизайнеров и производителей корпусной мебели. Мы предлагаем готовые решения, которые помогут вам быстро и эффективно реализовать любые проекты – от эконом- до премиум-класса.</p>
                <p><span>Широкий ассортимент</span> – стандартные и нестандартные размеры, разнообразие фасадов, материалов и фурнитуры.</p>            
                <p><span>Высокое качество</span> – используем только проверенные материалы и современное оборудование для безупречной геометрии и долговечности.</p>            
                <p><span>Гибкость производства</span> – индивидуальные решения под ваш заказ, включая нестандартные конфигурации и отделку.</p>            
                <p><span>Оперативные сроки</span> – четкое соблюдение сроков без потери качества.</p>            
                <p><span>Выгодные условия</span> – специальные предложения для постоянных клиентов и крупных заказов.</p>            
            </div>
          </div>
          <section className={css.block__kitchen_slider_image}>
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
              text="Заказать кухонные модули"
              width="16.094vw"
              height="6vh"
              href='/'
              />
            </div>
        </section>
      </div>
    );
};