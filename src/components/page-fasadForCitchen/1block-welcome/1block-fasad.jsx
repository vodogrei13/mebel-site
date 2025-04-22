'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-fasad.module.scss'

export const Block_Fasad = () => {
    return (
      <div>
        <section className={css.block_fasad__container}>
        <div className={css.main__blocks}>
          <div className={css.main__info}>
            <div className={css.main__title}>
              <h3>Фасады для кухни</h3>
            </div>
            <div className={css.main__text}>
                <p>Мы предлагаем эксклюзивные коллекции кухонных фасадов от лучших российских и европейских фабрик. Как официальные дилеры, мы предоставляем доступ к premium-сегменту рынка с гарантией качества и оптимальными ценами.</p>
                <br/>
                <p>У нас в ассортименте все виды фасадов ЛДСП, МДФ, пленочные, крашенные, пластиковые, высоко глянцевые, супер-матовые, фасады из ТСС- плиты, фасады с soft-touch покрытием, шпонированые фасады, акриловые фасады.</p>          
                <br/>
                <p>Так же мы изготавливаем алюминиевые фасады для кухонь по индивидуальным размерам</p>
            </div>
            <div className={css.main__button}>
              <Button_Gradient
              text="Заказать фасады"
              width="11.979vw"
              height="6vh"
              href='/'
              />
            </div>
          </div>
          <section className={css.block__fasad_image}>
            <img src="/mebel-site/png/fasad.png" alt="Фото Фасадов" />
            </section>
        </div>
        </section>
      </div>
    );
};