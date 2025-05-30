'use client'
import css from './CalcAlVitrin.module.scss'
import optionImport from './optionImport';
import VitrinaDrawing from './VitrinaDrawing';
import { useState, useEffect } from 'react';
import { priceConfig } from './priceConfig';

export const CalcAlVitrin = () => {
    const [formData, setFormData] = useState({
        profileView: 'wide',
        profileArticle: 'black',
        glassMirror: 'None',
        height: 200,
        width: 200,
        units: 1,
        distanceToTheCenter: 1,
        millingCount: 'None',
        millingForHinges: 'None',
        hingeSide: 'left',
        handles: 'None',
        assembly: 'no'
    });
    
    const [total, setTotal] = useState(0);

    useEffect(() => {
        calculateTotal();
    }, [formData]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
        let newValue;
        if (name === 'height' || name === 'width' || name === 'units' || name === 'distanceToTheCenter') {
            newValue = parseInt(value) || 0;
        } else {
            newValue = value;
        }
        
        return {
            ...prev,
            [name]: newValue
        };
    });
};

    const handleBlur = (e) => {
        const { name, value } = e.target;
        
        if (name === 'height' || name === 'width' || name === 'units') {
            const numValue = parseInt(value) || 0;
            let correctedValue = numValue;
            
            if (name === 'height') {
                correctedValue = Math.min(Math.max(numValue, 200), 1500);
            } else if (name === 'width') {
                correctedValue = Math.min(Math.max(numValue, 200), 600);
            } else if (name === 'units') {
            correctedValue = Math.min(Math.max(numValue, 1), 1000);
        }
        if (correctedValue !== numValue) {
            setFormData(prev => ({
                ...prev,
                [name]: correctedValue
            }));
        }
        }
    };

    const handleMillingCountChange = (e) => {
        handleChange(e);
    };

    const calculateTotal = () => {
        let sum = priceConfig.basePrice;
        
        // Базовая цена зависит от площади (цена за м²)
        const area = (formData.height * formData.width) / 1000000; // Переводим мм² в м²
        sum += area * 500; // Например, 500 руб/м²

        // Добавляем цены за выбранные опции
        sum += priceConfig.profileViews[formData.profileView] || 0;
        if (formData.profileView === 'wide') {
            sum += priceConfig.profileArticlesWide[formData.profileArticle] || 0;
        } else {
            sum += priceConfig.profileArticlesNarrow[formData.profileArticle] || 0;
        }       
        sum += priceConfig.glassMirror[formData.glassMirror] || 0;
        sum += priceConfig.handles[formData.handles] || 0;
        sum += priceConfig.millingCount[formData.millingCount] || 0;
        sum += priceConfig.assembly[formData.assembly] || 0;
        
        // Умножаем на количество
        sum *= formData.units;
        
        setTotal(Math.round(sum)); //Округляем до целых
    };

    return (
        <div className={css.CalcAlVitrin__container}>
            <div className={css.CalcAlVitrin__form}>
                
                <form className={css.form__group}>
                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="profile_view-select-1">Вид профиля</label>
                            <select 
                            name="profileView" 
                            id="profile_view-select-1" 
                            value={formData.profileView}
                            onChange={handleChange}
                            required>
                                {optionImport.profileViews.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="profile_article-select-1">Артикул профиля</label>
                            <select 
                            name="profileArticles" 
                            id="profile_article-select-1" 
                            value={formData.profileArticles}
                            onChange={handleChange}
                            required>
                                {formData.profileView === 'wide' ? (
                                    optionImport.profileArticlesWide.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))) : (
                                    optionImport.profileArticlesNarrow.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                )))}    
                            </select>
                        </div>
                        <div className={css.form__item}>
                            <label htmlFor="glass_mirror-select-1">Стекло/Зеркало</label>
                            <select 
                            name="glassMirror" 
                            id="glass_mirror-select-1"
                            value={formData.glassMirror}
                            onChange={handleChange} 
                            required>
                                {optionImport.glassMirror.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor="matte_side-select-1">Матовая сторона</label>
                            <select 
                            name="matteSide" 
                            id="matte_side-select-1" 
                            value={formData.matteSide}
                            onChange={handleChange} 
                            required>
                                {optionImport.matteSide.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>
                    </div>

                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="height-select-1">Высота (мм)</label>
                            <input 
                            type="number" 
                            placeholder='200' 
                            min={200}
                            max={1500} 
                            name='height'
                            id='height-select-1' 
                            value={formData.height}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            required/>
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="width-select-1">Ширина (мм)</label>
                            <input 
                            type="number" 
                            placeholder='200' 
                            min={200}
                            max={700} 
                            name='width'
                            id='width-select-1'
                            value={formData.width}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required/>

                        </div>
                        <div className={css.form__item}>
                            <label htmlFor="units-select-1">Колличество (шт)</label>
                            <input 
                            type="number" 
                            placeholder='1' 
                            min={1} 
                            max={99999} 
                            name='units' 
                            id='units-select-1' 
                            value={formData.units}
                            onChange={handleChange} 
                            onBlur={handleBlur}
                            required/>
                        </div>
                    </div>

                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="milling_for_hinges-select-1">Количество фрезеровок под петли</label>
                            <select 
                            name="millingCount" 
                            id="milling_for_hinges-select-1" 
                            required
                            value={formData.millingCount}
                            onChange={handleMillingCountChange}
                            >
                                <option value="None">Нет</option>  
                                <option value="2">2</option>    
                                <option value="3">3</option>     
                                <option value="4">4</option>
                                <option value="5">5</option>        
                                <option value="6">6</option> 
                            </select>                      
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="position_of_the_loops-select-1">Положение петель</label>
                            <select 
                            name="hingeSide" 
                            id="position_of_the_loops-select-1" 
                            required
                            value={formData.hingeSide}
                            onChange={handleChange}
                            >
                                <option value="left">Слева</option>  
                                <option value="right">Справа</option>                   
                            </select>
                        </div>
                    </div>

                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="handles-select-1">Тип ручки</label>
                            <select 
                            name="handles" 
                            id="handles-select-1" 
                            value={formData.handles}
                            onChange={handleChange} 
                            required>
                                {optionImport.handles.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>                   
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="handle_holes-select-1">Межосевое расстояние отверстий ручки</label>
                            <select 
                            name="handleHoles" 
                            id="handle_holes-select-1" 
                            value={formData.handleHoles}
                            onChange={handleChange} 
                            required>
                                {optionImport.handleHoles.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                   
                            </select>
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="distance_to_the_center-select-1">Расстояние до центра ручки (мм)</label>
                            <input 
                            type="number" 
                            placeholder='70' 
                            min={70} 
                            max={99999} 
                            name='distanceToTheCenter' 
                            id='distanceToTheCenter-select-1' 
                            value={formData.distanceToTheCenter}
                            onChange={handleChange} 
                            required/>
                        </div>
                    </div>
                    
                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="assembly-select-1">Сборка</label>
                            <select 
                            name="assembly" 
                            id="assembly-select-1" 
                            value={formData.assembly}
                            onChange={handleChange} 
                            required>
                                <option value="no">Нет</option>  
                                <option value="yes">Да</option>                    
                            </select>                   
                        </div>
                    </div>
                    <div className={css.form__summa_wrapper}>
                <div className={css.form__summa_container}>
                    <label htmlFor="summa-select-1" className={css.form__label_summa}>Сумма</label>
                    <div className={css.form__summa_block}>
                        <div className={css.form__summa} id='summa-select-1'>{total}</div>
                        <p className={css.form__summa_rub}>₽</p> 
                    </div>         
                </div>
            </div>
                </form>
            </div>
            <div className={css.CalcAlVitrin__drawing}>
                <VitrinaDrawing 
                    height={formData.height} 
                    millingCount={formData.millingCount} 
                    hingeSide={formData.hingeSide}
                    handles={formData.handles}
                    distanceToTheCenter={formData.distanceToTheCenter}
                />
            </div>
        </div>
    );
};