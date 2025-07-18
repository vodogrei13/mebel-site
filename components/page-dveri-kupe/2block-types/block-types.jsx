import { Form } from "@/components/Form/base-form/form";
import css from './block-types.module.scss'
import { basePath } from '@/utils/basePath';

export const Block_Types_Dveri_Kupe = () => {
    return (
      <div>
        <section className={css.block_types_dveri_kupe__container}>
          <div className={css.cards}>
            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Стандарт</h3>
                        <p>Раздвижная система СТАНДАРТ – базовая рекомендуемая линейка для всех, кто предъявляет высокие требования к качеству и надежности раздвижных дверей, а также ищет уникальные цветовые решения и формы. Система СТАНДАРТ производится уже более 18-ти лет.<br/>
                        Ассортимент вертикальных профилей системы: C, FLAT, I, FUSION, SMART, AVERS, TWELVE.<br/>
                        Максимальная высота двери: 3200 мм. Ширина двери: 500 – 1500 мм.<br/>
                        Вес двери: до 100 кг.<br/>
                        Цветовая гамма: 33 цвета.</p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/standart.png`} alt='Двери-купе "Стандарт"'/>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Эконом</h3>
                        <p>Отличительная черта линейки ЭКО – оптимальное сочетание цены и качества. Система ЭКО имеет схожие с классической раздвижной системой характеристики, но ее эксплуатационные размеры отличаются, толщина алюминия составляет 1 мм.<br/>
                        <br/>Максимальная высота двери: 2500мм. Ширина двери: 500-900 мм. Вес двери: до 40 кг. Ассортимент вертикальных профилей системы: C, H, верхние и нижние направляющие и рамки.</p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/Eco.png`} alt='Двери-купе "Эконом"'/>
                    </div>
                </div>
            </div>

        </div>
        <div className={css.form}>
            <Form/>
        </div>
        <div className={css.cards}>
            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Nova</h3>
                        <p>Раздвижная система NOVA - узкорамочная система для шкафов-купе нового поколения. Незаметные тонкие профили обрамления двери с видимой частью 5 мм. сочетаются со всеми видами фасадных материалов и походят
                        к любому интерьеру. Разработано под наиболее распространенные плиты толщиной 16 мм. Уникальные кронштейны позволяют скрыть верхнюю направляющую, совершенные ролики обеспечивают плавный и бесшумный ход дверей. Цветовая гамма: серебро матовое, шампань матовая, белый глянец, черный матовый.</p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/nova.png`} alt='Двери-купе "Nova"'/>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Slim Line</h3>
                        <p>Раздвижная система Slim Line – это тонкая видимая линия профиля, лаконичность и простые формы. Незаметная широкая рамка, - горизонтальный профиль из первичного алюминия повышенной прочности, обеспечивает жесткость конструкции и возможность установки системы с невидимой верхней направляющей на скрытых кронштейнах.
                        <br/><br/>Цвета профиля Slim Line: белый глянец, черный матовый, серебро матовое, шампань матовая.
                        <br/><br/>Максимальная высота двери: 2650 мм. Ширина двери: 500 – 1000 мм. Вес двери: до 60 кг.</p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/slimLine.png`} alt='Двери-купе "Slim Line"'/>
                    </div>
                </div>
            </div>
        </div>
        <div className={css.bottom__title}>
            <h3>Системы межкомнатных дверей и перегородок</h3>
        </div>
        <div className={css.cards}>
            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Система «4 в 1»</h3>
                        <p>Уникальная модульная система «4в1» подходит для комплексного обустройства помещений. Базовый элемент системы – запатентованный вертикальный профиль FUSION. С помощью этого профиля эксклюзивной фурнитуры можно создавать распашные, складные, подвесные двери и стационарные перегородки. В ассортименте: 16 цветов профиля.</p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/4in1.png`} alt='Двери-купе "Система «4 в 1»"'/>
                    </div>
                </div>
            </div>

            <div className={css.card}>
                <div className={css.card__container}>
                    <div className={css.cards__info}>
                        <h3>Система «GRACE»</h3>
                        <p>Система «GRACE» – отличное решение для зонирования пространства прозрачными или полупрозрачными перегородками.
                        <br/><br/>Главное преимущество системы «GRACE» - вертикальный узкий профиль с шириной видимой части всего 12 мм. Такая узкая видимая часть профиля - минимальная для подобных систем! Важная особенность системы «GRACE» также в том, что при полном раскрытии, двери располагаются ровно одна за другой - «профиль к профилю»!
                        </p>
                    </div>
                    <div className={css.cards_image}>
                        <img src={`${basePath}/png/dveri-kupe/grace.png`} alt='Двери-купе "Система «GRACE»"'/>
                    </div>
                </div>
            </div>
        </div>
        </section>
      </div>
    );
};