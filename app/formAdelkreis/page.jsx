import { Adelkreis } from '@/components/Form/Adelkreis/adelkreis';
import css from './adelkreis.module.scss'
import { Form } from '@/components/Form/base-form/form';

export default function AdelkreisPage () {
    return (
      <div>
        <section className={css.Adelkreis__container}>
            <div>
              <Adelkreis/>
            </div>
            <div className={css.Adelkreis__form}>
              <Form/>
            </div>
        </section>
      </div>
    );
};