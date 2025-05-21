import css from './CalcAlVitrin.module.scss'

export const CalcAlVitrin = () => {
    return (
        <div className={css.CalcAlVitrin__container}>
            <div className={css.CalcAlVitrin__form}>
                <form>
                    <label htmlFor="profile view">Вид профиля</label>
                    
                    <select name="profile view" id="profile view">
                        <option value="wide">Широкий</option>
                        <option value="narrow">Узкий</option>
                    </select>
                </form>
            </div>
            <div className={css.CalcAlVitrin__drawing}>

            </div>
        </div>
    );
};