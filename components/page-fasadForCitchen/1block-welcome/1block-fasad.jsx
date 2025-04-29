'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-fasad.module.scss'
import { basePath } from '@/utils/basePath';
import { useEffect, useState } from 'react'

export const Block_Fasad = () => {
  const [showIframe, setShowIframe] = useState(false);

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
              onClick={() => setShowIframe(true)}
              />
            </div>
          </div>
          <section className={css.block__fasad_image}>
            <img src={`${basePath}/png/fasad.png`} alt="Фото Фасадов" />
            </section>
        </div>
        </section>
        {showIframe && (
          <div className={css.iframeOverlay}>
            <div className={css.iframeContainer}>
              <button 
                className={css.closeButton}
                onClick={() => setShowIframe(false)}
              >
                Х
              </button>
              <iframe
                src="https://cloud.bazissoft.ru/cutting/ru/#/client/auth/login?user=1731"
                className={css.embeddedSite}
                title="Заказ распила"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    );
};