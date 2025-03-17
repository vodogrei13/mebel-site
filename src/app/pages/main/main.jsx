import React from 'react';
import { Header } from "../../components/header/header";
import { Block_Welcome } from "../../components/block-welcome/block-welcome";
import { Block_Advantages } from "../../components/block-advantages/block-advantages";
import { Form } from "../../components/form/form";
import css from './main.module.scss'

export const Main = () => {
    return (
      <div>
        <div>
          <Header/>  
        </div>
        <section className={css.main__container}>
          <div>
            <Block_Welcome/>
          </div>
          <div>
            <Block_Advantages/>
          </div>
          <div>
            <Form/>
          </div>
        </section>
        </div>
    );
};