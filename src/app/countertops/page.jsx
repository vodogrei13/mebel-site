import { Form } from "@/components/form/form";
import css from './countertops.module.scss'
import { Block_Countertops } from '@/components/page-countertops/1block-welcome/1block-countertops';

export default function Countertops () {
    return (
      <div>
        <section className={css.main__container}>
            <div>
              <Block_Countertops/>
            </div>
            <div>
              <Form/>
            </div>
        </section>
      </div>
    );
};