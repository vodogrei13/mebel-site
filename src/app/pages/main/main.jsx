import React from 'react';
import { Header } from "../../../components/header/header";
import { Block_Welcome } from "../../../components/Page-one/1block-welcome/block-welcome";
import { Block_Advantages } from "../../../components/Page-one/2block-advantages/block-advantages";
import { Form } from "../../../components/form/form";
import { Block_Services } from "../../../components/Page-one/3block-services/block-services";
import { Block_Slider } from '@/components/Page-one/4block-slider/block-slider';
import { Footer } from '@/components/footer/footer';
import css from './main.module.scss'
import { Block_Cards } from '@/components/Page-one/3block-cards/block-cards';

export const Main = () => {
    return (
      <div>
        <div>
          <Header/>  
        </div>
        <section className={css.main__container}>
          <div className={css.container__leaner}>
              <div>
                <Block_Welcome/>
              </div>
              <div>
                <Block_Advantages/>
              </div>
              <div>
                <Form/>
              </div>
          </div>
          <div>
            <Block_Cards/>
          </div>
        </section>
        <div>
            <Footer/>
        </div>
      </div>
    );
};