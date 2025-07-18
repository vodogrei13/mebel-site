import { Form } from "@/components/Form/base-form/form";
import css from './countertops.module.scss'
import { Block_Countertops } from '@/components/page-countertops/1block-welcome/1block-countertops';
import { Block_Countertops_Size } from "@/components/page-countertops/2block-size/2block-size";

export default function Countertops () {
    return (
      <div>
        <section className={css.counertops__main_container}>
            <div>
              <Block_Countertops/>
            </div>
            <div>
              <Form/>
            </div>
            <div>
              <Block_Countertops_Size/>
            </div>
        </section>
      </div>
    );
};