'use client'
import { Button_Gradient } from '@/components/ui/buttons/button-gradient/button-gradient'
import css from './1block-dveri-kupe.module.scss'
import { useState, useRef } from 'react';
import { formatPhoneNumber } from "@/utils/phoneFormatter";
import SubmitModal from "../../Form/submitModal/submitModal";

export const Block_Dveri_Kupe = () => {
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

  const handleSubmit = async () => {
        setIsSending(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("surname", surname);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("comment", comment);
            formData.append("formName", "Двери-купе");

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
              // href="/fasad-forms/DveriKupe"
              onClick={() => setShowSubmitModal(true)} 
              />
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
                  placeholder="**Укажите категорию и размеры**"
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
          <div className={css.main__info_2}>
            <p>Мы специализируемся на производстве дверей-купе  с использованием раздвижных систем ARISTO. Это немецкие комплектующие, которые гарантируют бесшумность, плавность хода
            и долговечность дверей.</p>
          </div>
        </section>
      </div>
    );
};