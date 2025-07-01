import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-dveri-kupe.module.scss'

export const Block_Dveri_Kupe = () => {
    return (
      <div>
        <section className={css.block_dveri_kupe__container}>
          <div className={css.main__info}>
            <div className={css.main__title}>
              <h3>Двери-купе на заказ</h3>
            </div>
            <div className={css.main__text}>
              <p>Раздвижные двери-купе на заказ по индивидуальным размерам заказчика недорого с зеркалами, с глухими вставками</p>
            </div>
            <div className={css.main__button}>
              <Button_Gradient
              text="Заказать двери-купе"
              width="13.594vw"
              height="6.042vh"
              href='/'
              />
            </div>
          </div>
          <div className={css.main__info_2}>
            <p>Мы специализируемся на производстве дверей-купе  с использованием раздвижных систем ARISTO. Это немецкие комплектующие, которые гарантируют бесшумность, плавность хода
            и долговечность дверей.</p>
          </div>
        </section>
      </div>
    );
};