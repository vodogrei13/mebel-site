import { Form } from "../Form/base-form/form";
import css from "./renovation.module.scss";
import { basePath } from '@/utils/basePath';

export const Renovation = () => {
  return (
    <div className={css.Renovation__container}>
      <img 
        src={`${basePath}/png/renovation.png`} 
        alt="Реконструкция страницы" 
        className={css.Renovation__image}
      />
      <div className={css.Renovation__form}>
        <Form/>
      </div>
    </div>
  );
};