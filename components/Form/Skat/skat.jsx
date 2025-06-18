'use client'
import css from "./skat.module.scss";
import { basePath } from '@/utils/basePath';
import { typeSurface, colorDye, colorSkin, milling, millingOnTheFacade, millingOnTheEdge, prefabricated, patina, thickness, note} from "./optionImport";
import { useState } from 'react';

export const Skat = () => {
    const [selectedTypeSurface, setSelectedTypeSurface] = useState('');

    return (
        <div className={css.skat__container}>
            <div className={css.skat__logo}>
                <img 
                    src={`${basePath}/png/fasads/skat.png`} 
                    alt="Логотип Arbor Nova" 
                    className={css.skat__logo_item}
                />
            </div>
            <section className={css.skat__form_container}>
                <form className={css.skat__form}>
                    <div className={css.skat__form_main}>

                        <div className={css.form__item}>
                            <label htmlFor='typeSurface'>
                                Тип поверхности*
                            </label>
                            <select
                                name="typeSurface"
                                id='typeSurface'
                                className={css.form__select}
                                value={selectedTypeSurface}
                                onChange={(e) => setSelectedTypeSurface(e.target.value)}
                                required
                            >
                                {typeSurface.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        

                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Направление текстуры*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            <option value="inHeight">По высоте</option>
                            <option value="inWidth">По ширине</option>
                            </select>
                        </div>
                        
                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Фрезеровка*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {milling.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor='color'>
                                Цвет*
                            </label>
                            <select
                                name="color"
                                id='color'
                                className={css.form__select}
                                required
                            >
                                {selectedTypeSurface === "color"
                                    ? colorSkin.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))
                                    : colorDye.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                ))}
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Толщина*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {thickness.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Фрезеровка по фасаду*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {millingOnTheFacade.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <input
                            type="text"
                            placeholder="Или напишите ваш вариант"
                            className={css.form__input}
                            name="myColor"
                            id='myColor'
                            required
                            />
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Патина*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {patina.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>
                        
                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Фрезеровка по краю*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {millingOnTheEdge.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor='textureDirection'>
                                Сборные*
                            </label>
                            <select
                                name="textureDirection"
                                id='textureDirection'
                                className={css.form__select}
                                required
                            >
                            {prefabricated.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <div className={css.form__form_drawing}>
                        <div className={css.drawing_item}>
                            <p className={css.number_item}>1</p>
                            <div className={css.input_item}>
                                <label htmlFor='height-select-1'>
                                Высота
                                </label>
                                <input
                                type="number"
                                className={css.form__input}
                                name="height"
                                id='height-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='width-select-1'>
                                Ширина
                                </label>
                                <input
                                type="number"
                                className={css.form__input}
                                name="width"
                                id='width-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='quantity-select-1'>
                                Количество
                                </label>
                                <input
                                type="number"
                                className={css.form__input}
                                name="quantity"
                                id='quantity-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='quantity-select-1'>
                                Количество
                                </label>
                                <input
                                type="number"
                                placeholder="1"
                                min={1}
                                className={css.form__input}
                                name="quantity"
                                id='quantity-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='note'>
                                Примечание
                                </label>
                                <select
                                    name="note"
                                    id='note'
                                    className={css.form__select}
                                    required
                                >
                                {note.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                ))}
                                </select>
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='loops'>
                                Петли
                                </label>
                                <select
                                    name="loops"
                                    id='loops'
                                    className={css.form__select}
                                    required
                                >
                                <option value="no">Нет</option>
                                <option value="yes">Да</option>
                                </select>
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='NumberOfLoops-select-1'>
                                Кол-во
                                </label>
                                <input
                                type="number"
                                min={1}
                                placeholder="1"
                                className={css.form__input}
                                name="NumberOfLoops"
                                id='NumberOfLoops-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='onBottom-select-1'>
                                От низа
                                </label>
                                <input
                                type="text"
                                className={css.form__input}
                                name="onBottom"
                                id='onBottom-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='onTop-select-1'>
                                От верха
                                </label>
                                <input
                                type="text"
                                className={css.form__input}
                                name="onTop"
                                id='onTop-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='onTop-select-1'>
                                Средние
                                </label>
                                <input
                                type="text"
                                className={css.form__input}
                                name="onTop"
                                id='onTop-select-1'
                                required
                                />
                            </div>

                            <div className={css.input_item}>
                                <label htmlFor='onTop-select-1'>
                                Комментарий
                                </label>
                                <input
                                type="text"
                                className={css.form__input}
                                name="onTop"
                                id='onTop-select-1'
                                required
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    );
};