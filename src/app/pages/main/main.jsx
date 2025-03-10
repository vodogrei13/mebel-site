import React from 'react';
import { Header } from "../../components/header/header"
import { Hero_1 } from "../../components/hero_1/hero_1"
import { Hero_2 } from "../../components/hero_2/hero_2"
import css from './main.module.scss'

export const Main = () => {
    return (
      <div>
        <div>
          <Header/>  
        </div>
        <div className={css.main__border}>
            <div className={css.border}></div>
            <div className={css.border}></div>
            <div className={css.border}></div>
            <div className={css.border}></div>
        </div>
        <section className={css.main__container}>
          <div>
            <Hero_1/>
          </div>
          <div>
            <Hero_2/>
          </div>
        </section>
        </div>
    );
};