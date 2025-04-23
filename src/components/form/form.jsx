'use client'
import { Button_Origin } from "../../components/ui/buttons/button/button-origin";
import css from "./form.module.scss";

export const Form = () => {

  return (
    <div className={css.form__container}>
      <div className={css.form__title}>
        <h2>Оставьте заявку на расчет</h2>
      </div>
      <section className={css.form__blocks}>
        <div className={css.form__items}>
          <form method="post">
            <input type="text" id="name" name="name" placeholder="ИМЯ" required/>
            <input type="email" id="email" name="email" placeholder="E-MAIL" required/>
            <input type="tel" id="phone" name="phone" placeholder="ТЕЛЕФОН" required/>
            <input type="file" name="files" multiple className={css.fileInput} accept= ".pdf, .doc, .docx, .jpg, .jpeg, .png"/>         
          </form>
        </div>
        <div className={css.form__button}>
          <Button_Origin 
          text="Отправить"/>
        </div>
      </section>
    </div>
  );
};
