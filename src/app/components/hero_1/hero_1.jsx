import css from './hero_1.module.scss'
import { Button } from "../../components/button/button"


export const Hero_1 = () => {
    return (
      <div className={css.hero__1_container}>
        <div className={css.hero__1_box1}>
            <h3>Контрактное производство<br></br> для производителей мебели</h3>
            <Button/>
        </div>
        <div className={css.hero__1_box2}>


        </div>
      </div>
    );
};