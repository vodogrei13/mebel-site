'use client'
import { useState, useEffect } from 'react';
import css from './block-slider.module.scss'


export const Block_Slider = () => {
    const slideWidth = 261; // Задайте фактическую ширину вашего слайда в пикселях
    const [clones, setClones] = useState([]);
    const [transition, setTransition] = useState(true);

    const [activeIndex, setActiveIndex] = useState(0);
    //Массив Картинок
    const images = [
        { url: '/png/slider/Rectangle-1.png' },
        { url: '/png/slider/Rectangle-2.png' },
        { url: '/png/slider/Rectangle-3.png' },
        { url: '/png/slider/Rectangle-4.png' },
    ];

    useEffect(() => {
        function initSlider (images) {
            if(!images || images.length === 0) return;

            const sliderWrapper = document.querySelector(`.${css.slider}`);
            const sliderImages = sliderWrapper.querySelector(`.${css.slider__images}`);

            if (!sliderWrapper || !sliderImages) {
                console.error("Slider wrapper or images container not found.");
                return;
            }

            initImages();

            //Функция слайдер-картинок
            function initImages() {
                images.forEach((image, index) => {
                    let imageElement = document.createElement("div");
                    imageElement.className = `${css.image} n${index} ${index ? "" : css.active}`;
                    imageElement.dataset.index = index;
                    imageElement.style.backgroundImage = `url(${image.url})`;
                    sliderImages.appendChild(imageElement);
                });
            }
        }
    
        initSlider(images); // вызываем initSlider 
    
    }, []); 

    useEffect(() => {
        const sliderImages = document.querySelector(`.${css.slider__images}`);

        //Функция - клон слайдов вперед/назад, чтобы получилось круто
        const makeClones = () => {
            const clonesCount = 2; // Сколько клонов добавляем с каждой стороны
            const frontClones = images.slice(0, clonesCount).map((item, index) => ({...item, isClone: true,  position: index - clonesCount}));

            const endClones = images.slice(images.length - clonesCount).map((item, index) => ({...item, isClone: true, position: images.length - clonesCount + index}));
            setClones([...frontClones, ...endClones]);
        };

        function initSlider (images) {
        }

        function updateSliderPosition() {
            sliderImages.style.transition = transition ? 'transform 0.5s ease-in-out' : 'none';
            sliderImages.style.transform = `translateX(calc(-${activeIndex * slideWidth}px))`;
        }

        makeClones(); //Вызываем функцию клонирования чтобы сформировать красивый массив
        updateSliderPosition();

        const interval = setInterval(() => {
            setActiveIndex((index) => (index + 1) % images.length )
           ;
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, []);


    return (
        <div className={css.container}>
            <h2 className={css.title}>Изготовление мебельных деталей</h2>
            <div className={css.slider}>
                <div className={css.slider__images}></div>
            </div>
        </div>
    )
}