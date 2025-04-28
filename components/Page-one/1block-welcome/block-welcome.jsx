import css from './block-welcome.module.scss'
import { Button_Gradient } from "../../ui/buttons/button-gradient/button-gradient"
import { basePath } from '@/utils/basePath';


export const Block_Welcome = () => {
    return (
      <div className={css.hero__1_container}>
        <div className={css.hero__1_box1}>
            <h3>Контрактное производство<br></br> для производителей мебели</h3>
            <Button_Gradient
            href='#target-block'
            targetId = "target-block"
            />
        </div>
        <div className={css.hero__1_box2}>
        <video
          src={`${basePath}/video/video.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className={css.hero__video}
        />
        </div>
      </div>
    );
};