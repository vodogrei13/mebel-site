'use client'
import { useState, useEffect, useRef } from 'react'
import css from './block-slider.module.scss'


export const Block_Slider = () => {

    //Массив Картинок
    const images = [
        { url: '/png/slider/Rectangle-1.png' },
        { url: '/png/slider/Rectangle-2.png' },
        { url: '/png/slider/Rectangle-3.png' },
        { url: '/png/slider/Rectangle-4.png' },
    ];

    // Состояние паузы
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef(null);

    // Обработчик для остановки слайдера
    const handlePause = () => {
        setIsPaused(true);
    };
    // Обработчик для возобновления слайдера
    const handleResume = () => {
        setIsPaused(false);
    };


    useEffect(() => {
        const slider = sliderRef.current;
        if (slider) {
            let animationFrameId;
            let scrollPosition = 0;
            const scrollSpeed = 1.2;

            const scrollSlider = () => {
                scrollPosition += scrollSpeed;
                slider.style.transform = `translateX(-${scrollPosition}px)`;

                if (scrollPosition > slider.scrollWidth / 2) {
                    scrollPosition = 0;
                }

                animationFrameId = requestAnimationFrame(scrollSlider);
            };

            scrollSlider();

            return () => cancelAnimationFrame(animationFrameId);
        }
    }, []);

    return (
        <div className={css.container}>
            <h2 className={css.title}>Изготовление мебельных деталей</h2>
            <div
                className={css.slider}
                onMouseDown={handlePause} // Пауза при зажатии мыши
                onMouseUp={handleResume} // Возобновление при отпускании мыши
            >
                <div
                    className={`${css.slider__images} ${isPaused ? css.paused : ''}`}
                    ref={sliderRef}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={css.image}
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                    ))}
                    {images.map((image, index) => (
                        <div
                            key={`clone-${index}`}
                            className={css.image}
                            style={{ backgroundImage: `url(${image.url})` }}
                        />
                    ))}
                </div>
                {isPaused && <div className={css.pauseIcon}>⏸</div>} {/* Значок паузы */}
            </div>
        </div>
    )
}