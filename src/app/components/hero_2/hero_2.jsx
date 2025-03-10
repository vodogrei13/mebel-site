import css from './hero_2.module.scss'
import classNames from 'classnames';

export const Hero_2 = () => {
    return (
      <div className={css.hero__2_container}>
        <div className={css.hero__2_title}>
            <h3>Мы предоставляем лучшие возможности дя контрактного  производства мебели </h3>
        </div>
        <div className={css.hero__2_list}>
            <div className={classNames(css.hero__2_item, css.item_1)}>
                <p>Мы имеем 
                    <span> доступ к более дешевым материалами ресурсам благодаря масштабу своего производства,</span>
                        <br></br>что позволяет снизить общие затраты.</p>
            </div>
            <div className={classNames(css.hero__2_item, css.item_2)}>
                <p><span>Передача </span> 
                    производства на аутсорсинг позволяет сосредоточиться вам на разработке дизайна, маркетинге и продажах, 
                    <span> не отвлекаясь на производственные процессы.</span></p>
            </div>
            <div className={classNames(css.hero__2_item, css.item_3)}>
                <p>Вам 
                    <span> не нужно инвестировать в дорогостоящее оборудование и технику</span>, 
                        что особенно выгодно для стартапов и небольших предприятий.</p>
            </div>
            <div className={classNames(css.hero__2_item, css.item_4)}>
                <p><span>Ответственность </span> 
                    за качество и сроки производства лежит полностью на нас, 
                        <span> что снижает риски для компании-заказчика.</span></p>
            </div>
        </div>
      </div>
    );
};