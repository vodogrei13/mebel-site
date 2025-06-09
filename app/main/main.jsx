'use client'
import React from 'react';
import { Block_Welcome } from "@/components/Page-one/1block-welcome/block-welcome";
import { Form } from "@/components/Form/base-form/form";
import css from '@/app/main/main.module.scss'
import { Block_Cards } from '@/components/Page-one/3block-cards/block-cards';
import { Block_About } from '@/components/Page-one/5block-about/about';
import { useEffect } from 'react';

export const Main = () => {

  useEffect(() => {
    if (sessionStorage.getItem('shouldScrollToAbout')) {
      sessionStorage.removeItem('shouldScrollToAbout');
      setTimeout(() => {
        const element = document.getElementById("target-about");
        if (element) {
          const yOffset = -40;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100); // Уменьшил время ожидания
    }
  }, []);

    return (
      <div>
        <section className={css.main__container}>
          <div className={css.container__leaner}>
              <div>
                <Block_Welcome/>
              </div>
              <div>
                <Block_Cards/>
              </div>
          </div>
              <div id="target-block">
                <Form/>
              </div>
              <div id="target-about">
                <Block_About/>
              </div>
        </section>
      </div>
    );
};