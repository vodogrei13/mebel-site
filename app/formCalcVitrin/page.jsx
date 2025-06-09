import css from './formCalcVitrin.module.scss'
import { CalcAlVitrin } from '@/components/Form/CalcAlVitrin/CalcAlVitrin';

export default function CalcAlVitrinPage () {
    return (
      <div>
        <section className={css.CalcAlVitrin__container}>
            <div>
              <CalcAlVitrin/>
            </div>
        </section>
      </div>
    );
};