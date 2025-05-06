'use client'
import css from './1block-countertops.module.scss'
import { useEffect, useState } from 'react'
import { basePath } from '@/utils/basePath';

//Массив Картинок
const sliderImages = [
    { url: `${basePath}/png/countertops-2.png`, alt: 'Столешница 1' },
    { url: `${basePath}/png/countertops-1.png`, alt: 'Столешница 2' },
    { url: `${basePath}/png/countertops-3.png`, alt: 'Столешница 3' },
];

export const Block_Countertops = () => {
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
        <div className={css.block__countertops_container}>
            <section className={css.block__countertops_heroInfo}>
                <div className={css.block__countertops_title}>
                    <h3>Производство столешниц</h3>
                </div>
                <div className={css.block__countertops_text}>
                    <p>Наша компания предлагает широкий выбор столешниц для кухонь, ванных комнат и других помещений, которые станут стильным и функциональным дополнением вашего интерьера. Мы производим столешницы из высококачественных материалов, обеспечивая их долговечность, устойчивость к нагрузкам и эстетическую привлекательность.</p>
                </div>
                <div className={css.block__countertops_text2}>
                    <p>Наши столешницы - это:</p>
                    <ul className={css.block__countertops_list}>
                        <li className={css.block__countertops_item}>Разнообразие материалов: Мы работаем с ЛДСП,  а также компакт ламинатом, чтобы предложить вам оптимальное решение для любого интерьера.</li>
                        <li className={css.block__countertops_item}>Широкая ассортимент размеров, цветов и текстур: От классических однотонных вариантов до стильных имитаций натурального дерева, камня или современных глянцевых поверхностей.</li>
                        <li className={css.block__countertops_item}>Индивидуальный подход: Возможность изготовления столешниц по вашим размерам и дизайнерским предпочтениям, включая фигурные вырезы и интегрированные мойки.</li>
                    </ul>
                </div>
            </section>
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
    );
};