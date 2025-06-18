import { Block_KitchenModule } from '@/components/page-kitchen-module/1block-welcome/1block-kitchen-module';
import css from './kitchen-module.module.scss'
import { Renovation } from '@/components/renovation/renovation';

export default function KitchenModule () {
    return (
      <div>
        <section className={css.kitchen_module__main__container}>
            <div>
              <Renovation/>
              {/* <Block_KitchenModule/> */}
            </div>
        </section>
      </div>
    );
};