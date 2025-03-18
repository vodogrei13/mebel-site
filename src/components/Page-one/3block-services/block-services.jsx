import { Button_Origin } from '@/components/ui/buttons/button/button-origin'
import classNames from 'classnames';
import css from './block-services.module.scss'


export const Block_Services = () => {
    return (
        <div className={css.container}>
            <h2 className={css.title}>Высокое качество и современные технологии в производстве дверей, витрин и мебели</h2>
            <section className={css.cards__serv}>
                <div className={classNames(css.card__one, css.card_item)}>
                    <h3>Изготовление<br/>дверей-купе</h3>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.card__two, css.card_item)}>
                    <h3>Раскрой<br/>онлайн</h3>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.card__three, css.card_item)}>
                    <h3>Базис<br/>салон</h3>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.card__for, css.card_item)}>
                    <h3>Калькулятор<br/>алюминиевых витрин</h3>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.card__five, css.card_item)}>
                    <h3>Расчет фасадов<br/>онлайн</h3>
                    <Button_Origin/>
                </div>
                <div className={classNames(css.card__six, css.card_item)}>
                    <h3>Доставка</h3>
                    <Button_Origin/>
                </div>
            </section>
        </div>
    )
}