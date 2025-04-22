import { Block_KitchenModule } from '@/components/page-kitchen-module/1block-welcome/1block-kitchen-module';
import css from './kitchen-module.module.scss'

export default function KitchenModule () {
    return (
      <div>
        <section className={css.kitchen_module__main__container}>
            <div>
              <Block_KitchenModule/>
            </div>
        </section>
      </div>
    );
};