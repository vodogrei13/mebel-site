'use client'
import css from './2block-fasad-types.module.scss'
import { Block_Slider } from '../block-slider/block-slider';
import { Form } from '@/components/form/form';

const sliderImages1 = [
    { url: '/mebel-site/png/slider/plastic/пластик-1.png' },
    { url: '/mebel-site/png/slider/plastic/пластик-2.png' },
    { url: '/mebel-site/png/slider/plastic/пластик-3.png' },
    { url: '/mebel-site/png/slider/plastic/пластик-4.png' },
]

const sliderImages2 = [
    { url: '/mebel-site/png/slider/plenka/пленка-1.png' },
    { url: '/mebel-site/png/slider/plenka/пленка-2.png' },
    { url: '/mebel-site/png/slider/plenka/пленка-3.png' },
    { url: '/mebel-site/png/slider/plenka/пленка-4.png' },
    { url: '/mebel-site/png/slider/plenka/пленка-5.png' },
    { url: '/mebel-site/png/slider/plenka/пленка-6.png' },
]

const sliderImages3 = [
    { url: '/mebel-site/png/slider/painted/крашенный-1.png' },
    { url: '/mebel-site/png/slider/painted/крашенный-2.png' },
    { url: '/mebel-site/png/slider/painted/крашенный-3.png' },
    { url: '/mebel-site/png/slider/painted/крашенный-4.png' },
    { url: '/mebel-site/png/slider/painted/крашенный-5.png' },
    { url: '/mebel-site/png/slider/painted/крашенный-6.png' },
]

const sliderImages4 = [
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-1.png' },
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-2.png' },
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-3.png' },
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-4.png' },
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-5.png' },
    { url: '/mebel-site/png/slider/al-ramka/ал.рамка-6.png' },
]

const sliderImages5 = [
    { url: '/mebel-site/png/slider/veneered/шпон-1.png' },
    { url: '/mebel-site/png/slider/veneered/шпон-2.png' },
    { url: '/mebel-site/png/slider/veneered/шпон-3.png' },
    { url: '/mebel-site/png/slider/veneered/шпон-4.png' },
    { url: '/mebel-site/png/slider/veneered/шпон-5.png' },
    { url: '/mebel-site/png/slider/veneered/шпон-6.png' },
]

const sliderImages6 = [
    { url: '/mebel-site/png/slider/akril/акрил-1.png' },
    { url: '/mebel-site/png/slider/akril/акрил-2.png' },
    { url: '/mebel-site/png/slider/akril/акрил-3.png' },
    { url: '/mebel-site/png/slider/akril/акрил-4.png' },
    { url: '/mebel-site/png/slider/akril/акрил-5.png' },
    { url: '/mebel-site/png/slider/akril/акрил-6.png' },
    { url: '/mebel-site/png/slider/akril/акрил-7.png' },
    { url: '/mebel-site/png/slider/akril/акрил-8.png' },
    { url: '/mebel-site/png/slider/akril/акрил-9.png' },
    { url: '/mebel-site/png/slider/akril/акрил-10.png' },
]

export const Block_FasadTypes = () => {
    return (
      <div>
        <section className={css.block_fasad_types__container}>
            <h3 className={css.block_fasad_types__title}>Виды фасадов</h3>
            <div className={css.block_fasad__cards}>
                <div className={css.block_fasad__card}>
                    <h3>Пластиковые</h3>
                    <p>Пластиковые фасады для кухни – современное и практичное решение,
                    <br/>сочетающее эстетику, долговечность и простоту ухода.</p>
                    <p>Чаще всего изготавливаются на основе МДФ, покрытого ПВХ-пленкой или акриловым пластиком,
                    что обеспечивает дополнительную прочность и устойчивость к влаге.
                    <br/>Идеально подходят для современных кухонь, где важны практичность, стиль и простота в уходе!</p>
                    <Block_Slider images={sliderImages1}/>
                </div>

                <div className={css.block_fasad__card}>
                    <h3>Плёночные</h3>
                    <p>Пленочные фасады для кухни – это бюджетное и практичное решение,
                    <br/>сочетающее разнообразие дизайнов, устойчивость к внешним воздействиям и простоту ухода.</p>
                    <p>Такие фасады изготавливаются из МДФ или ДСП, покрытых декоративной ПВХ-пленкой,
                    <br/>что позволяет имитировать натуральные материалы (дерево, камень, металл)
                    <br/>или создавать глянцевые и матовые однотонные поверхности.</p>
                    <p>Идеально подходит для тех, кто ищет недорогой,
                    <br/>но стильный вариант с хорошей износостойкостью.
                    <br/>Отличный выбор для кухонь в современном, классическом или скандинавском стиле.</p>
                    <Block_Slider images={sliderImages2}/>
                </div>

                <div className={css.block_fasad__card}>
                    <h3>Крашенные</h3>
                    <p>Крашеные фасады для кухни – элегантное и долговечное решение для тех, 
                    <br/>кто ценит безупречный внешний вид и экологичность.</p>
                    <p>Фасады изготавливаются из МДФ, реже – из массива дерева,
                    <br/>и покрываются устойчивой эмалевой краской в несколько слоев с промежуточной шлифовкой.
                    <br/>Покрытие может быть глянцевым, матовым, полуматовым или с эффектом "металлик".</p>
                    <p>Идеально подходит для кухонь в современном, классическом, скандинавском или лофт-стиле.
                    <br/>Это выбор тех, кто ценит премиальное качество и индивидуальный дизайн.</p>
                    <Block_Slider images={sliderImages3}/>
                </div>
            </div>
            
            <div className={css.block_form}>
                <Form/>
            </div>

            <div className={css.block_fasad__cards}>
                <div className={css.block_fasad__card}>
                    <h3>С алюминиевой рамкой</h3>
                    <p>Фасады с алюминиевой рамкой для кухни – современное и стильное решение,
                    <br/>сочетающее легкость металла и практичность современных материалов.</p>
                    <p>Фасад состоит из алюминиевого профиля, обрамляющего вставку из МДФ,
                    <br/>стекла, пластика или HPL-панели. Алюминиевая рамка придает жесткость конструкции,
                    <br/>а внутреннее наполнение позволяет реализовать любые дизайнерские идеи.</p>
                    <p>Идеальный выбор для тех, кто ищет надежность, современный дизайн и долговечность!</p>
                    <Block_Slider images={sliderImages4}/>
                </div>

                <div className={css.block_fasad__card}>
                    <h3>Шпонированные</h3>
                    <p>Шпонированные фасады для кухни – элитное решение для ценителей натуральных материалов и утонченной эстетики</p>
                    <p>Шпон – это тонкий срез (0,5–3 мм) натуральной древесины ценных пород (дуб, ясень, орех, бук, венге и др.), который наклеивается на основу из МДФ или массива. Сохраняет всю красоту и текстуру дерева, но стоит дешевле цельного массива.</p>
                    <Block_Slider images={sliderImages5}/>
                </div>

                <div className={css.block_fasad__card}>
                    <h3>Акриловые</h3>
                    <p>Акриловые фасады для кухни – премиальное решение с зеркальным блеском и исключительной стойкостью</p>
                    <p>Акриловые фасады состоят из:</p>
                    <ul>
                        <li>Основа – МДФ высокой плотности</li>
                        <li>Покрытие – листовой акриловый пластик (толщиной 2-3 мм) с зеркальной полировкой</li>
                        <li>Обратная сторона – компенсирующий пластиковый слой для защиты от деформаций</li>
                    </ul>
                    <Block_Slider images={sliderImages6}/>
                </div>
            </div>
        </section>
      </div>
    );
};