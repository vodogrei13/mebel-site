'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './2block-size.module.scss'
import { useState, useRef } from 'react';
import classNames from 'classnames';
import { basePath } from '@/utils/basePath';
import { formatPhoneNumber } from "@/utils/phoneFormatter";
import SubmitModal from "../../Form/submitModal/submitModal";

export const Block_Countertops_Size = () => {
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [phone, setPhone] = useState("");
    const [activeTab, setActiveTab] = useState('26mm');
    const fileInputRef = useRef(null);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Функция для проверки, должна ли карточка быть видимой
    const shouldShowCard = (cardType) => {
        if (activeTab === '26mm') return cardType === '26mm';
        if (activeTab === '38mm') return cardType === '38mm';
        if (activeTab === '12mm') return cardType === '12mm';
        return false;
    };

    // Функция для получения классов для контейнера
    const getCardContainerClasses = () => {
        switch (activeTab) {
            case '26mm':
                return classNames(css.size__cards, css.size__cards_26mm);
            case '38mm':
                return classNames(css.size__cards, css.size__cards_36mm);
            case '12mm':
                return classNames(css.size__cards, css.size__cards_12mm);
            default:
                return css.size__cards;
        }
    };

    const handleSubmit = async () => {
        setIsSending(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("surname", surname);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("comment", comment);
            formData.append("formName", "Столешница для кухни");

            // Добавляем пользовательские файлы
            const fileInput = fileInputRef.current;
            if (fileInput && fileInput.files && fileInput.files.length > 0) {
                for (let i = 0; i < fileInput.files.length; i++) {
                    formData.append("files", fileInput.files[i]);
                }
            }

            // Отправка письма
            const res = await fetch("/api/send-order", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setSendSuccess(true);
                setShowSubmitModal(false);
            } else {
                alert("Ошибка при отправке формы");
            }
        } catch (err) {
            console.error("Ошибка отправки:", err);
            alert("Произошла ошибка при отправке формы");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <section className={css.block__size_container}>
            <div className={css.block__size_text}>
                <p>Мы предлагаем огромный выбор столешниц для кухонь, ванных комнат, офисов и коммерческих помещений. Мы сотрудничаем напрямую с лучшими производителями которые уже зарекомендовали себя на рынке России и Европы, чтобы вы могли купить качественные изделия по выгодным ценам.</p>
                <p>Столешницы любых размеров, форм и расцветок, ЛДСП, Компакт-ламинат, влагостойкие, устойчивые к царапинам и высоким температурам.</p>
            </div>
            <div className={css.block__size_info}>
                <div className={css.size_button}>
                    <button className={activeTab === '26mm' ? css.active : ''} 
                            onClick={() => handleTabChange('26mm')}>26mm</button>
                    <button className={activeTab === '38mm' ? css.active : ''} 
                        onClick={() => handleTabChange('38mm')}>38mm</button>
                     <button className={classNames(css.size_button_text, activeTab === '12mm' ? css.active : '')} 
                        onClick={() => handleTabChange('12mm')}>12mm<span>КОМПАКТ ЛАМИНАТ</span></button>
                </div>
                <div className={getCardContainerClasses()}>
                <div className={classNames(css.info__item, shouldShowCard('26mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoSkif.png`} alt="Скиф" />
                        <p>3000х600х26</p>
                        <h3>Нестандарт</h3>
                        <ul>
                            <li>25х1200х3000</li>
                            <li>25х700х3000</li>
                            <li>25х800х3000</li>
                            <li>25х900х3000</li>
                        </ul>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('38mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoSkif.png`} alt="Скиф" />
                        <p>3000х600х38</p>
                        <p>4200х600х38</p>
                        <h3>Нестандарт</h3>
                        <ul>
                            <li>38х1200х3000</li>
                            <li>38х700х3000</li>
                            <li>38х800х3000</li>
                            <li>38х900х3000</li>
                        </ul>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('38mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoFIS.png`} alt="Form&Style" />
                        <p>3000х600х38</p>
                        <p>4200х600х38</p>
                        <p>3000х1200х38</p>
                        <p>900х900 - угловой элемент</p>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('38mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoSlotex.png`} alt="Slotex" />
                        <p>3000х600х38</p>
                        <p>4200х600х38</p>
                        <h3>Нестандарт</h3>
                        <ul>
                            <li>38х1200х3000</li>
                            <li>38х800х3000</li>
                            <li>38х800х4200</li>
                            <li>38х1200х4200</li>
                        </ul>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('12mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoFundermax.png`} alt="Fundermax" />
                        <p>4100х1300х12</p>
                        <p>4200х1854х12</p>
                        <p>4100х648х12</p>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('12mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoGreenlam.png`} alt="Greenlam" />
                        <p>3050х648х12</p>
                        <p>3050х1300х12</p>
                        <p>3660х1200х12</p>
                        <p>3660х1830х12</p>
                        <p>3660х600х12</p>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('12mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoFIS.png`} alt="Form&Style" />
                        <p>3000х650х12</p>
                        <p>4200х1320х12</p>
                        <p>4200х650х12</p>
                        <p>4200х1320х12</p>
                    </div>
                    <div className={classNames(css.info__item, shouldShowCard('12mm') ? '' : css.hidden)}>
                        <img src={`${basePath}/png/LogoSlotex.png`} alt="Slotex" />
                        <p>3050х1320х12</p>
                        <p>3050х650х12</p>
                        <p>4200х650х12</p>
                        <p>4200х1320х12</p>
                    </div>
                </div>
                <div className={css.info__bottom}>
                    <p>Заказывая столешницы у нас, вы получаете изделия, которые сочетают в себе надежность, эстетику и удобство. Доверьте нам создание столешниц, освободите себя для поиска новых заказов!</p>
                    <div className={css.info__bottom_btn}>
                        <Button_Gradient
                        text="Заказать столешницу"
                        width="13.854vw"
                        height="6.042vh"
                        onClick={() => setShowSubmitModal(true)} 
                        />
                    </div>
                </div>
                {showSubmitModal && (
                    <div className={css.submit__modal}>
                        <SubmitModal
                        isOpen={showSubmitModal}
                        onClose={() => setShowSubmitModal(false)}
                        onSubmit={handleSubmit}
                        isSending={isSending}
                        name={name}
                        setName={setName}
                        surname={surname}
                        setSurname={setSurname}
                        phone={phone}
                        setPhone={setPhone}
                        email={email}
                        setEmail={setEmail}
                        comment={comment}
                        setComment={setComment}
                        commentLabel="Комментарий к заказу"
                        placeholder="**Укажите фирму и размер столешниц**"
                        warning = ""
                        />
                    </div>
                    )}

                    {sendSuccess && (
                    <div className={css.submit__modal}>
                        <div className={css.submit__content}>
                        <h3>Ваш заказ отправлен!</h3>
                        <p>Мы свяжемся с вами в ближайшее время.</p>
                        <button className={css.submit__button} onClick={() => setSendSuccess(false)}>
                            Закрыть
                        </button>
                        </div>
                    </div>
                    )}
            </div>
        </section>
    )
}