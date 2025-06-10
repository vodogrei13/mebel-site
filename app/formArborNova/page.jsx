import { ArborNova } from '@/components/Form/Arbor-Nova/arbor-nova';
import css from './formArborNova.module.scss'
import { Form } from '@/components/Form/base-form/form';

export default function ArborNovaPage () {
    return (
      <div>
        <section className={css.ArborNova__container}>
            <div>
              <ArborNova/>
            </div>
            <div className={css.ArborNova__form}>
              <Form/>
            </div>
        </section>
      </div>
    );
};