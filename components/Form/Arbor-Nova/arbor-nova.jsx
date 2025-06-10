import css from "./arbor-nova.module.scss";
import { basePath } from '@/utils/basePath';

export const ArborNova = () => {
 return (
    <div className={css.ArborNova__wrapper}>
        <div className={css.ArborNova__container}>
            <img 
            src={`${basePath}/png/fasads/arbor-nova.png`} 
            alt="Логотип Arbor Nova" 
            className={css.ArborNova__logo}
            />
        </div>
        
    </div>
 )}