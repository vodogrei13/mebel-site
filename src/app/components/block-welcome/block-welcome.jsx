import css from './block-welcome.module.scss'
import { Button } from "../button/button"


export const Block_Welcome = () => {
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