"use client";
import React, { useRef, useCallback, useMemo  } from "react"; 
import css from "./submitModal.module.scss";

const SubmitModal = ({
  isOpen,
  onClose,
  onSubmit,
  isSending,
  name,
  setName,
  surname,
  setSurname,
  phone,
  setPhone,
  email,
  setEmail,
  comment,
  setComment,
  fileCount,
  handleFileChange,
  removeFiles,
  formatPhoneNumber,
  handlePhoneChange,
  fileInputRef,
}) => {
  if (!isOpen) return null;
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleSurnameChange = useCallback((e) => setSurname(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleCommentChange = useCallback((e) => setComment(e.target.value), []);

  const isFormValid = useMemo(() => {
    return (
      name.trim() !== "" &&
      surname.trim() !== "" &&
      phone.trim() !== "" && 
      email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) // Простая валидация email
    );
  }, [name, surname, phone, email]);

  return (
    <div className={css.submit__modal}>
      <div className={css.submit__content}>
              <h3>Отправка заказа</h3>
              <label>Имя*</label>
              <input value={name} onChange={handleNameChange} required />
              <label>Фамилия*</label>
              <input value={surname} onChange={handleSurnameChange} required />
              <label>Телефон*</label>
              <input
                type="tel"
                value={formatPhoneNumber(phone)}
                onChange={handlePhoneChange}
                placeholder="+7 (___) ___-__-__"
                required
              />
              <label>Email*</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label>Комментарий</label>
              <textarea value={comment} onChange={handleCommentChange} />
              <label className={css.input_file}>Здесь вы можете прикрепить рисунок:
                <input type="file" name="files" multiple onChange={handleFileChange} ref={fileInputRef} />
                <span>{fileCount > 0 ? `${fileCount} файл(ов)` : "Выберите файл"}</span>
              </label>
              {fileCount > 0 && (
                <button 
                  type="button" 
                  onClick={removeFiles}
                  className={css.clear_files_button}
                >
                  x
                </button>
              )}
              <button className={css.submit__close_button} onClick={onClose} disabled={isSending}>
                X
              </button>
              <button className={css.submit__button} onClick={onSubmit} disabled={!isFormValid || isSending}>
                {isSending ? "Отправка..." : "Отправить"}
              </button>
            </div>
    </div>
  );
};

export default React.memo(SubmitModal, (prev, next) => {
  return (
    prev.isOpen === next.isOpen &&
    prev.isSending === next.isSending &&
    prev.name === next.name &&
    prev.surname === next.surname &&
    prev.email === next.email &&
    prev.comment === next.comment &&
    prev.phone === next.phone &&
    prev.fileCount === next.fileCount
  );
});