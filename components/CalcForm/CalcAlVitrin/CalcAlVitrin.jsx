import css from './CalcAlVitrin.module.scss'
import optionImport from './optionImport';

export const CalcAlVitrin = () => {
    return (
        <div className={css.CalcAlVitrin__container}>
            <div className={css.CalcAlVitrin__form}>
                
                <form className={css.form__group}>
                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="profile view">Вид профиля</label>
                            <select name="profile view" id="profile view">
                                {optionImport.profileViews.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="profile article">Артикул профиля</label>
                            <select name="profile article" id="profile article">
                                {optionImport.profileArticles.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>
                        <div className={css.form__item}>
                            <label htmlFor="glass mirror">Стекло/Зеркало</label>
                            <select name="glass mirror" id="glass mirror">
                                {optionImport.glassOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>

                        <div className={css.form__item}>
                            <label htmlFor="matte side">Матовая сторона</label>
                            <select name="matte side" id="matte side">
                                {optionImport.matteSide.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>
                    </div>

                    <div className={css.form__group_row}>
                        <div className={css.form__item}>
                            <label htmlFor="height-select-1">Высота (мм)</label>
                            <input type="number" placeholder='200' min={1} max={99999} name='height' id='height-select-1'/>
                        </div>

                        <div className={css.form__item}>               
                            <label htmlFor="width-select-1">Ширина (мм)</label>
                            <input type="number" placeholder='200' min={1} max={99999} name='width' id='width-select-1'/>

                        </div>
                        <div className={css.form__item}>
                            <label htmlFor="glass mirror">Стекло/Зеркало</label>
                            <select name="glass mirror" id="glass mirror">
                                {optionImport.glassOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}                    
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <div className={css.CalcAlVitrin__drawing}>

            </div>
        </div>
    );
};