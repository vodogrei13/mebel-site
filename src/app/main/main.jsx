import React from 'react';
import { Block_Welcome } from "@/components/Page-one/1block-welcome/block-welcome";
import { Block_Advantages } from "@/components/Page-one/2block-advantages/block-advantages";
import { Form } from "@/components/form/form";
import css from '@/app/main/main.module.scss'
import { Block_Cards } from '@/components/Page-one/3block-cards/block-cards';
import { Block_About } from '@/components/Page-one/5block-about/about';

export const Main = () => {

    return (
      <div>
        <section className={css.main__container}>
          <div className={css.container__leaner}>
              <div>
                <Block_Welcome/>
              </div>
              <div>
                <Block_Advantages/>
              </div>
              <div id="target-block">
                <Form/>
              </div>
          </div>
          <div>
            <Block_Cards/>
          </div>
          <div id="target-about">
            <Block_About/>
          </div>
        </section>
      </div>
    );
};