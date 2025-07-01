"use client";
import css from "./tbm.module.scss";
import { basePath } from "@/utils/basePath";
import { DrawingItem } from "../drawingItems/drawingItem";
import SubmitModal from "../submitModal/submitModal";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button_Gradient } from "@/components/ui/buttons/button-gradient/button-gradient";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Tbm = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [drawingItems, setDrawingItems] = useState([{ id: 1 }]);

  const fileInputRef = useRef(null);
  const formsRef = useRef(null);
  const pdfRef = useRef(null);

  const checkFormValidity = useCallback(() => {
  // Проверка основных полей
  const mainFields = [
    { name: "thickness", label: "Толщина" },
    { name: "typeSurface", label: "Тип поверхности" },
    { name: "color", label: "Цвет" },
    { name: "reverseSide", label: "Обратная сторона" },
    { name: "edgeMilling", label: "Фрезеровка по краю" },
    { name: "textureDirection", label: "Направление текстуры" }
  ];

  const missingMainField = mainFields.find(field => {
    const element = document.querySelector(`[name="${field.name}"]`);
    return !element?.value;
  });

  // Проверка drawing items
  let missingDrawingField = null;
  const hasValidItem = drawingItems.some(item => {
    const fields = [
      { name: `height-${item.id}`, label: "Высота" },
      { name: `width-${item.id}`, label: "Ширина" },
      { name: `quantity-${item.id}`, label: "Количество" }
    ];

    missingDrawingField = fields.find(field => {
      const element = document.querySelector(`[name="${field.name}"]`);
      return !element?.value;
    });

    return !missingDrawingField;
  });

  if (missingMainField) {
    setValidationError(`Заполните поле "${missingMainField.label}"`);
    setIsFormValid(false);
    return;
  }

  if (!hasValidItem) {
    setValidationError(`Заполните все обязательные поля хотя бы в одном элементе`);
    setIsFormValid(false);
    return;
  }

  setValidationError("");
  setIsFormValid(true);
}, [drawingItems]);

useEffect(() => {
  const timer = setTimeout(() => {
    checkFormValidity();
  }, 100);
  
  return () => clearTimeout(timer);
}, [drawingItems, checkFormValidity]);

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



  const handleFileChange = (e) => {
  const files = e.target.files;
  if (files.length > 5) {
    alert("Можно прикрепить не более 5 файлов");
    e.target.value = "";
    return;
  }
  setFileCount(files.length);
};

  const generatePDF = async () => {
  const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pdfElement = pdfRef.current;
  if (!pdfElement) return;

  // Скрываем модальное окно
  const modal = document.querySelector(`.${css.submit__modal}`);
  if (modal) modal.style.display = "none";

  // Добавляем PDF-режим
  document.body.classList.add("pdf-mode");

  // Создаем блок с информацией об отправителе
  const senderBlock = document.createElement("div");
  senderBlock.className = "pdf-sender-info";
  senderBlock.innerHTML = `
    <p><strong>Имя:</strong> ${name || "-"}</p>
    <p><strong>Фамилия:</strong> ${surname || "-"}</p>
    <p><strong>Телефон:</strong> ${formatPhoneNumber(phone) || "-"}</p>
    <p><strong>Email:</strong> ${email || "-"}</p>
    <p><strong>Файлов прикреплено:</strong> ${fileCount}</p>
  `;
  senderBlock.style.fontSize = "9px";
  senderBlock.style.lineHeight = "1.2";
  senderBlock.style.color = "#000";
  senderBlock.style.marginLeft = "20px";
  senderBlock.style.fontFamily = "Arial, sans-serif";

  // Вставляем блок после логотипа
  if (pdfRef.current?.firstChild?.nextSibling) {
    pdfRef.current.insertBefore(senderBlock, pdfRef.current.firstChild.nextSibling);
  }

  // Добавляем стили
  const style = document.createElement("style");
  style.innerHTML = `
    body.pdf-mode {
      width: 100% !important;
      transform-origin: top left;
    }

    body.pdf-mode button {
      display: none !important;
    }

    body.pdf-mode form {
      padding: 10px !important;
      font-family: Arial, sans-serif !important;
      font-size: 6px !important;
      color: #000 !important;
    }

    body.pdf-mode input,
    body.pdf-mode select,
    body.pdf-mode textarea {
      font-size: 9px !important;
      height: 20px !important;
      line-height: 18px !important;
      padding-top: 1px !important;
      padding: 0 !important;
      margin: 0 !important;
      border: 1px solid #aaa !important;
      box-sizing: border-box !important;
      background-color: #fff !important;
      text-align: center !important;
      display: inline-block !important;
      vertical-align: middle !important;
      font-family: Arial, sans-serif !important;
      appearance: none !important;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
    }

    body.pdf-mode input[type="number"]::-webkit-outer-spin-button,
    body.pdf-mode input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0 !important;
    }

    body.pdf-mode input[type="number"] {
      -moz-appearance: textfield !important;
    }

    body.pdf-mode select {
      padding-left: 2px !important;
      padding-right: 18px !important;
      background-image: none !important;
    }

    body.pdf-mode label {
      font-size: 9px !important;
      line-height: 8px !important;
      margin-bottom: 2px !important;
      display: inline-block !important;
      color: #000 !important;
    }

    body.pdf-mode .${css.tbm__form_main},
    body.pdf-mode .${css.form__form_drawing} {
      gap: 6px !important;
    }

    body.pdf-mode .${css.number_item} {
      font-size: 8px !important;
      height: 16px !important;
      line-height: 15px !important;
      padding: 0 !important;
      text-align: center !important;
      display: inline-block !important;
      vertical-align: middle !important;
      border: 1px solid #888 !important;
      box-sizing: border-box !important;
      overflow: hidden !important;
    }

    body.pdf-mode img {
      margin-top: 5px !important;
      max-width: 80px !important;
      height: auto !important;
    }

    body.pdf-mode h1,
    body.pdf-mode h2,
    body.pdf-mode h3 {
      font-size: 12px !important;
      margin: 4px 0 !important;
    }

    body.pdf-mode p {
      font-size: 9px !important;
      margin: 2px 0 !important;
    }
  `;
  document.head.appendChild(style);

  // Даём время примениться стилям
  await new Promise((resolve) => setTimeout(resolve, 200));

  const canvas = await html2canvas(pdfRef.current, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#fff",
    scrollY: -window.scrollY,
    windowWidth: pdfRef.current.scrollWidth,
    windowHeight: pdfRef.current.scrollHeight,
  });

  if (modal) modal.style.display = "";

  // Удаляем блок отправителя из DOM
  if (senderBlock && senderBlock.parentNode) {
    senderBlock.parentNode.removeChild(senderBlock);
  }

  const imgData = canvas.toDataURL("image/jpeg", 1.0);
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = {
    width: canvas.width,
    height: canvas.height,
    ratio: canvas.width / canvas.height,
  };

  const totalPages = Math.ceil(canvas.height / (canvas.width / pageWidth * pageHeight));

  for (let i = 0; i < totalPages; i++) {
    const sourceY = (canvas.height / totalPages) * i;
    const pageCanvas = document.createElement("canvas");
    const pageCtx = pageCanvas.getContext("2d");

    pageCanvas.width = canvas.width;
    pageCanvas.height = canvas.height / totalPages;

    pageCtx.drawImage(canvas, 0, sourceY, canvas.width, pageCanvas.height, 0, 0, canvas.width, pageCanvas.height);

    const pageImg = pageCanvas.toDataURL("image/jpeg", 1.0);
    if (i > 0) pdf.addPage();
    pdf.addImage(pageImg, "JPEG", 0, 0, pageWidth, pageHeight);
  }

  // Очистка PDF-режима
  document.body.classList.remove("pdf-mode");
  document.head.removeChild(style);

  return pdf;
};

  const addDrawingItem = () => {
    if (drawingItems.length < 30) {
      setDrawingItems([...drawingItems, { id: Date.now() }]);
    }
  };

  const removeDrawingItem = (id) => {
    if (drawingItems.length > 1) {
      setDrawingItems(drawingItems.filter(item => item.id !== id));
    }
  };

  const handleSubmit = async () => {
  setIsSending(true);
  try {
    console.time('pdf');
    const pdf = await generatePDF();
    console.timeEnd('pdf');
    const pdfBlob = pdf.output("blob");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("comment", comment);
    formData.append("formName", "ТБМ");
    
    // Добавляем PDF
    formData.append("files", new File([pdfBlob], "order.pdf", { type: "application/pdf" }));
    
    // Добавляем пользовательские файлы
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        formData.append("files", fileInput.files[i]);
      }
    }

    // Отправка основного письма
    const res = await fetch("/api/send-order", {
      method: "POST",
      body: formData,
    });

    // Отправка копии клиенту
    await fetch("/api/send-to-client", {
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
    <div className={css.tbm__container}>
      <section className={css.tbm__form_container}>
        <div className="pdf-adjust" ref={pdfRef}>
          <div className={css.tbm__logo}>
            <img src={`${basePath}/png/fasads/tbm.png`} className={css.tbm__logo_item} alt="Логотип" />
          </div>

    <form className={css.tbm__form}>
          <div className={css.tbm__form_main}>
            
            <div className={css.form__item}>
              <label htmlFor="thickness">Толщина*</label>
              <input
                type="text"
                className={css.form__input}
                name="thickness"
                id="thickness"
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              />
            </div>

            <div className={css.form__item}>
              <label htmlFor="typeSurface">Тип поверхности*</label>
              <input
                type="text"
                className={css.form__input}
                name="typeSurface"
                id="typeSurface"
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              />
            </div>

            <div className={css.form__item}>
              <label htmlFor="color">Цвет*</label>
              <input
                type="text"
                className={css.form__input}
                name="color"
                id="color"
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              />
            </div>

            <div className={css.form__item}>
              <label htmlFor="reverseSide">Обратная сторона*</label>
              <select
                name="reverseSide"
                id="reverseSide"
                className={css.form__select}
                required
              >
                <option value="color">В цвет</option>
                <option value="white">Белая</option>
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="edgeMilling">Фрезеровка по краю*</label>
              <input
                type="text"
                className={css.form__input}
                name="edgeMilling"
                id="edgeMilling"
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              />
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Направление текстуры*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              >
                <option value="inHeight">По высоте</option>
                <option value="inWidth">По ширине</option>
              </select>
            </div>
          </div>
          <div className={css.form__form_drawing}>
            {drawingItems.map((item, index) => (
              <DrawingItem 
                key={item.id}
                item={item}
                index={index}
                onRemove={() => removeDrawingItem(item.id)}
                isRemovable={drawingItems.length > 1}
                onFieldChange={checkFormValidity}
              />
            ))}
            <button 
            type="button" 
            className={css.addFormButton} 
            onClick={addDrawingItem}
            disabled={drawingItems.length >= 30}
            >
            + Добавить
            </button>
          </div>
        </form>
        <div className={css.submit__Container}>
          <div className={css.tooltipContainer}>
            <Button_Gradient 
              text="Оформить заказ" 
              onClick={() => setShowSubmitModal(true)} 
              disabled={!isFormValid}
            />
            {!isFormValid && validationError && (
              <div className={css.tooltip}>
                {validationError}
              </div>
            )}
          </div>
        </div>
        
      {/* Тестовая кнопка - только для разработки */}

      {/* <button 
        onClick={async () => {
          const pdf = await generatePDF();
          pdf.save('test.pdf');
        }}
        style={{
          marginTop: '10px',
          margin: '0 auto',
          padding: '8px 16px',
          background: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Test PDF Generation
      </button> */}

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
            fileCount={fileCount}
            handleFileChange={handleFileChange}
            removeFiles={() => {
            if (fileInputRef.current) {
              fileInputRef.current.value = "";
              setFileCount(0);
            }}}
            formatPhoneNumber={formatPhoneNumber}
            handlePhoneChange={handlePhoneChange}
            fileInputRef={fileInputRef}
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
    </div>
  );
};