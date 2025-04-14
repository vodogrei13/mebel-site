import css from '@/app/raspil/raspil.module.scss'
import { Block_Raspil } from '@/components/page-raspil/block-welcome';

export default function Raspil () {
    return (
      <div>
        <section className={css.main__container}>
          <div className={css.container__leaner}>
            <div>
            <Block_Raspil/>
            </div>
          </div>
        </section>
      </div>
    );
};