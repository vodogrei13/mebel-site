"use client";
import { Button_Origin } from '@/components/ui/buttons/button/button-origin';
import css from './block-cards.module.scss'
import classNames from 'classnames';
import { useRef, useEffect } from 'react';

export const Block_Cards = () => {
    const cardRefs = useRef([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return; // Guard against null/undefined

            const containerRect = containerRef.current.getBoundingClientRect();
            const containerTop = containerRect.top;
            const containerHeight = containerRect.height;

            cardRefs.current.forEach((cardRef, index) => {
                if (!cardRef) return; // Guard against null/undefined

                const cardRect = cardRef.getBoundingClientRect();
                const cardTop = cardRect.top;
                const cardHeight = cardRect.height;
                const cardIndex = index + 1; // start from 1 for the nth-child styling

                let offsetTop = 0;

                switch (cardIndex) {
                    case 2:
                        offsetTop = 20;
                        break;
                    case 3:
                        offsetTop = 40;
                        break;
                    case 4:
                        offsetTop = 60;
                        break;
                    case 5:
                        offsetTop = 80;
                        break;
                }

                // Calculate the overlap
                const overlapStart = Math.max(containerTop, cardTop + offsetTop);
                const overlapEnd = Math.min(containerTop + containerHeight, cardTop + cardHeight + offsetTop);
                const overlap = Math.max(0, overlapEnd - overlapStart);
                const overlapPercentage = overlap / cardHeight;

                // Apply the transform
                cardRef.style.transform = `translateY(${-offsetTop * (1 - overlapPercentage)}px)`;
            });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial call to set positions on load

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <div className={css.hero__3_container} ref={containerRef}>
            <div className={css.hero__3_title}>
                <h3>Высокое качество и современные технологии в производстве дверей, витрин и мебели</h3>
            </div>
            <section className={css.hero__3_cards}>
            <div className={css.hero__3_card} ref={el => cardRefs.current[0] = el}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Кухонные модуля</h3>
                    <p className={css.info__text}>Наша компания специализируется на производстве кухонных модулей различной сложности – от стандартных решений до эксклюзивных проектов, созданных по индивидуальным чертежам. Мы предлагаем модули, которые идеально сочетают в себе функциональность, эргономику и современный дизайн.
                        <br/><br/>Каждый модуль изготавливается с учетом ваших потребностей и пожеланий. Мы работаем с различными материалами, фурнитурой и комплектующими, чтобы обеспечить высокое качество и долговечность наших изделий.</p>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.hero__3_image, css.img__one)}></div>
            </div>

            <div className={css.hero__3_card} ref={el => cardRefs.current[1] = el}>
                <div className={classNames(css.hero__3_image, css.img__two)}></div>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Мебельные фасады</h3>
                    <p className={css.info__text}>Наша компания занимается производством мебельных фасадов различной сложности – от классических до современных дизайнерских решений. Мы создаем фасады, которые становятся настоящим украшением вашей мебели, будь то кухня, гардеробная или гостиная.
                        <br/><br/>Каждый фасад изготавливается с учетом ваших предпочтений и требований. Мы работаем с широким ассортиментом материалов, включая массив дерева, МДФ, пластик и стекло, чтобы предложить вам оптимальное сочетание качества, эстетики и функциональности.</p>
                    <Button_Origin/>
                </div>
            </div>

            <div className={css.hero__3_card} ref={el => cardRefs.current[2] = el}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Мебель для мебельщика</h3>
                    <p className={css.info__text}>Наша компания предлагает профессиональные услуги для мебельщиков, обеспечивая высококачественную подготовку материалов для создания мебели. Мы специализируемся на точном распиле, аккуратном кромлении и выполнении присадок, чтобы вы могли сосредоточиться на сборке и реализации своих проектов.</p>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.hero__3_image, css.img__three)}></div>
            </div>

            <div className={css.hero__3_card} ref={el => cardRefs.current[3] = el}>
                <div className={classNames(css.hero__3_image, css.img__for)}></div>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Двери-купе</h3>
                    <p className={css.info__text}>Наша компания предлагает современные двери-купе, которые станут идеальным решением для экономии пространства и создания стильного интерьера. Мы производим двери-купе различных дизайнов, используя качественные материалы и фурнитуру, чтобы обеспечить долговечность и безупречную работу механизмов.</p>
                    <Button_Origin/>
                </div>

            </div>

            <div className={css.hero__3_card} ref={el => cardRefs.current[4] = el}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Столешницы</h3>
                    <p className={css.info__text}>Наша компания предлагает широкий выбор столешниц для кухонь, ванных комнат и других помещений, которые станут стильным и функциональным дополнением вашего интерьера. Мы производим столешницы из высококачественных материалов, обеспечивая их долговечность, устойчивость к нагрузкам и эстетическую привлекательность.</p>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.hero__3_image, css.img__five)}></div>
            </div>
            </section>
        </div>
    );
};