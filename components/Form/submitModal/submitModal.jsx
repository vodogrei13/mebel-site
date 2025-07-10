"use client";
import React, { useRef, useCallback, useMemo, useState } from "react"; 
import css from "./submitModal.module.scss";
import { formatPhoneNumber } from "@/utils/phoneFormatter";

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
  commentLabel = "Комментарий",
  placeholder = '',
  warning = 'Если в заказе присутствует присадка под петлю - чертеж обязателен!',
}) => {
    const [fileCount, setFileCount] = useState(0);
    const fileInputRef = useRef(null);

    const handleFileChange = useCallback((e) => {
      const files = e.target.files;
      if (files.length > 5) {
        alert("Можно прикрепить не более 5 файлов");
        e.target.value = "";
        return;
      }
      setFileCount(files.length);
    }, []);

    const removeFiles = useCallback(() => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
        setFileCount(0);
      }
    }, []);
    const handleSubmitClick = () => {
      const files = fileInputRef.current?.files 
        ? Array.from(fileInputRef.current.files) 
        : [];
        
      onSubmit({
        fileCount: files.length,
        files: files
      });
    };

  if (!isOpen) return null;
  const handleNameChange = useCallback((e) => setName(e.target.value), []);
  const handleSurnameChange = useCallback((e) => setSurname(e.target.value), []);
  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleCommentChange = useCallback((e) => setComment(e.target.value), []);

  const formatPhoneNumber = useCallback((value) => {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").slice(0, 11);

  if (digits.startsWith("7")) {
    const match = digits.slice(1).match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
    return `+7${match ? ` (${match[1] || ""}) ${match[2] || ""}${match[3] ? "-" + match[3] : ""}${match[4] ? "-" + match[4] : ""}` : ""}`;
  }

  return digits;
}, []);

const handlePhoneChange = useCallback((e) => {
  let input = e.target.value.replace(/\D/g, "");

  // Если начинается с 8 — заменяем на 7
  if (input.startsWith("8")) {
    input = "7" + input.slice(1);
  }

  // Если начинается с 9 — добавляем 7 в начало
  if (input.startsWith("9")) {
    input = "7" + input;
  }

  // Ограничиваем до 11 цифр
  input = input.slice(0, 11);

  setPhone(input);
}, []);

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
              <label>{commentLabel}</label>
              <textarea value={comment} onChange={handleCommentChange} placeholder={placeholder}/>
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
              <p className={css.text__warning}>{warning}</p>
              <button className={css.submit__close_button} onClick={onClose} disabled={isSending}>
                X
              </button>
              <button className={css.submit__button} onClick={handleSubmitClick} disabled={!isFormValid || isSending}>
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