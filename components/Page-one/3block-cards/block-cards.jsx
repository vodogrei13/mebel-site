"use client";
import { Button_Origin } from '@/components/ui/buttons/button/button-origin';
import css from './block-cards.module.scss'
import classNames from 'classnames';
import { basePath } from '@/utils/basePath';

export const Block_Cards = () => {

    return (
        <div className={css.hero__3_container} >
            <div className={css.hero__3_title}>
                <h3>Высокое качество и современные технологии в производстве дверей, витрин и мебели</h3>
            </div>
            <section className={css.hero__3_cards}>
            <div className={css.hero__3_card}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Кухонные модуля</h3>
                    <p className={css.info__text}>Наша компания специализируется на производстве кухонных модулей различной сложности – от стандартных решений до эксклюзивных проектов, созданных по индивидуальным чертежам. Мы предлагаем модули, которые идеально сочетают в себе функциональность, эргономику и современный дизайн.
                        <br/><br/>Каждый модуль изготавливается с учетом ваших потребностей и пожеланий. Мы работаем с различными материалами, фурнитурой и комплектующими, чтобы обеспечить высокое качество и долговечность наших изделий.</p>
                    <Button_Origin
                    href='/kitchen-module'
                    />
                </div>
                <div className={classNames(css.hero__3_image, css.img__one)}
                 style={{
                    backgroundImage: `url('${basePath}/png/kuhni-modul-7.png')`
                    }}
                ></div>
            </div>

            <div className={css.hero__3_card}>
                <div className={classNames(css.hero__3_image, css.img__two)}
                style={{
                    backgroundImage: `url('${basePath}/png/fasad.png')`
                    }}
                ></div>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Мебельные фасады</h3>
                    <p className={css.info__text}>Наша компания занимается производством мебельных фасадов различной сложности – от классических до современных дизайнерских решений. Мы создаем фасады, которые становятся настоящим украшением вашей мебели, будь то кухня, гардеробная или гостиная.
                        <br/><br/>Каждый фасад изготавливается с учетом ваших предпочтений и требований. Мы работаем с широким ассортиментом материалов, включая массив дерева, МДФ, пластик и стекло, чтобы предложить вам оптимальное сочетание качества, эстетики и функциональности.</p>
                    <Button_Origin
                    href='/fasad-for-kitchen'
                    />
                </div>
            </div>

            <div className={css.hero__3_card}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Професиональный распил</h3>
                    <p className={css.info__text}>Наша компания предлагает профессиональные услуги для мебельщиков, обеспечивая высококачественную подготовку материалов для создания мебели. Мы специализируемся на точном распиле, аккуратном кромлении и выполнении присадок, чтобы вы могли сосредоточиться на сборке и реализации своих проектов.</p>
                    <Button_Origin
                    href='/raspil'
                    />
                </div>
                <div className={classNames(css.hero__3_image, css.img__three)}
                style={{
                    backgroundImage: `url('${basePath}/png/raspil.png')`
                    }}
                ></div>
            </div>

            <div className={css.hero__3_card}>
                <div className={classNames(css.hero__3_image, css.img__for)}
                style={{
                    backgroundImage: `url('${basePath}/png/dveri-kupe.png')`
                    }}
                ></div>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Двери-купе</h3>
                    <p className={css.info__text}>Наша компания предлагает современные двери-купе, которые станут идеальным решением для экономии пространства и создания стильного интерьера. Мы производим двери-купе различных дизайнов, используя качественные материалы и фурнитуру, чтобы обеспечить долговечность и безупречную работу механизмов.</p>
                    <Button_Origin
                    href='/dveri-kupe'
                    width = 'calc(7.917vw + 12px)'
                    height = 'calc(5.5vh + 12px)'
                    />
                </div>

            </div>

            <div className={css.hero__3_card}>
                <div className={css.hero__3_info}>
                    <h3 className={css.info__title}>Столешницы</h3>
                    <p className={css.info__text}>Наша компания предлагает широкий выбор столешниц для кухонь, ванных комнат и других помещений, которые станут стильным и функциональным дополнением вашего интерьера. Мы производим столешницы из высококачественных материалов, обеспечивая их долговечность, устойчивость к нагрузкам и эстетическую привлекательность.</p>
                    <Button_Origin
                    href='/countertops'
                    />
                </div>
                <div className={classNames(css.hero__3_image, css.img__five)}
                style={{
                    backgroundImage: `url('${basePath}/png/countertops-1.png')`
                    }}
                ></div>
            </div>
            </section>
            <div className={css.hero__3_spacer} />
        </div>
    );
};