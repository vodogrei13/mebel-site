'use client'
import css from "./skat.module.scss";
import { basePath } from '@/utils/basePath';
import { typeSurface, colorDye, colorSkin, milling, millingOnTheFacade, millingOnTheEdge, prefabricated, patina, thickness, } from "./optionImport";
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
                        <label htmlFor='color'>
                            Цвет (Напишите или выберите из списка)*
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
                        <input
                        type="text"
                        placeholder="Ваш цвет"
                        className={css.form__input}
                        name="myColor"
                        id='myColor'
                        required
                        />
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
                </form>
            </section>
        </div>
    );
};