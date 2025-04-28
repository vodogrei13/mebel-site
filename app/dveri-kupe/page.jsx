import { Block_Dveri_Kupe } from '@/components/page-dveri-kupe/1block-welcome/1block-dveri-kupe';
import css from './dveri-kupe.module.scss'
import { Block_Types_Dveri_Kupe } from '@/components/page-dveri-kupe/2block-types/block-types';

export default function DveriKupe () {
    return (
      <div>
        <section className={css.dverikupe__main__container}>
            <div>
              <Block_Dveri_Kupe/>
            </div>
            <div>
              <Block_Types_Dveri_Kupe/>
            </div>
        </section>
      </div>
    );
};