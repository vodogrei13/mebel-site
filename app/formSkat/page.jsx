import css from './formskat.module.scss'
import { Skat } from '@/components/Form/Skat/skat';

export default function skatPage () {
    return (
      <div>
        <section className={css.skat__container}>
            <div>
              <Skat/>
            </div>
        </section>
      </div>
    );
};