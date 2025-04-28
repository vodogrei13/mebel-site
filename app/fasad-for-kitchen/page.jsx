import { Block_FasadTypes } from '@/components/page-fasadForCitchen/2block-typesFasad/2block-fasad-types';
import css from './fasad.module.scss'
import { Block_Fasad } from '@/components/page-fasadForCitchen/1block-welcome/1block-fasad';

export default function FasadForKitchen () {
    return (
      <div>
        <section className={css.fasadForKitchen__main__container}>
            <div>
              <Block_Fasad/>
            </div>
            <div>
              <Block_FasadTypes/>
            </div>
        </section>
      </div>
    );
};