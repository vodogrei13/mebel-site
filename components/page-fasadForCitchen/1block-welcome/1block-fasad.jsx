'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-fasad.module.scss'
import { basePath } from '@/utils/basePath';
import Link from "next/link";
import { useState } from 'react'

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
              height="60px"
              onClick={() => setShowIframe(true)}
              />
            </div>
          </div>
          <section className={css.block__fasad_image}>
            <img src={`${basePath}/png/fasad.png`} al="Фото Фасадов" />
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
              <div className={css.IconItem}>
                <Link href='/fasad-forms/Tbm'>
                  <img src={`${basePath}/png/fasads/tbm.png`} alt="Логотип ТБМ" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/ArborNova'>
                  <img src={`${basePath}/png/fasads/arbor-nova.png`} alt="Логотип Arbor Nova" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/Adelkreis'>
                  <img src={`${basePath}/png/fasads/adelkreis.png`} alt="Логотип Adelkreis" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/Skat'>
                  <img src={`${basePath}/png/fasads/skat.png`} alt="Логотип Скат" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/AlVitrin'>
                  <img src={`${basePath}/png/fasads/alvitrin.png`} alt="Логотип Ал.Витрин" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/Duco'>
                  <img src={`${basePath}/png/fasads/duco.png`} alt="Логотип duco" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/Evosoft'>
                  <img src={`${basePath}/png/fasads/evosoft.png`} alt="Логотип Evosoft" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/FIP'>
                  <img src={`${basePath}/png/fasads/ФиП.png`} alt="Логотип ФиП" />
                </Link>
              </div>
              <div className={css.IconItem}>
                <Link href='/fasad-forms/YourDay'>
                  <img src={`${basePath}/png/fasads/вашдень.png`} alt="Логотип Ваш день" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
};