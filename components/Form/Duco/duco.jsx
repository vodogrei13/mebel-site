"use client";
import css from "./duco.module.scss";
import { basePath } from "@/utils/basePath";
import {
    collection,
    ColorDuco1,
    ColorDuco2,
    ColorDuco3,
} from "./optionImport";
import { DrawingItem } from "../drawingItems/drawingItem";
import SubmitModal from "../submitModal/submitModal";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button_Gradient } from "@/components/ui/buttons/button-gradient/button-gradient";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { formatPhoneNumber } from "@/utils/phoneFormatter";
import { noteClassic } from "../drawingItems/optionImport";

export const Duco = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedTypeSurface, setSelectedTypeSurface] = useState("Duco1");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [drawingItems, setDrawingItems] = useState([{ id: 1 }]);
  const pdfRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState(ColorDuco1[0].value);
  
  const checkFormValidity = useCallback(() => {
  // Проверка основных полей
  const mainFields = [
    { name: "collection", label: "Коллекция" },
    { name: "colorDuco", label: "Цвет Duco" },
    { name: "thickness", label: "Толщина" },
    { name: "reverseSide", label: "Обратная сторона" },
    { name: "textureDirection", label: "Направление текстуры" },
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

const handleTypeSurfaceChange = (e) => {
  const { name, value } = e.target;
  
  if (name === "collection") {
    setSelectedTypeSurface(value);
    setSelectedColor('');
  }
  
  checkFormValidity();
};

const handleColorChange = (e) => {
  setSelectedColor(e.target.value);
  checkFormValidity();
};

useEffect(() => {
  const timer = setTimeout(() => {
    checkFormValidity();
  }, 100);
  
  return () => clearTimeout(timer);
}, [drawingItems, checkFormValidity]);

  const generatePDF = async (fileCount) => {
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
    <p><strong>Файлов прикреплено:</strong> ${fileCount || 0}</p>
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

    body.pdf-mode .${css.duco__form_main},
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

  const handleSubmit = async (submitData) => {
  setIsSending(true);
  try {
    console.time('pdf');
    const pdf = await generatePDF(submitData.fileCount || 0);
    console.timeEnd('pdf');
    const pdfBlob = pdf.output("blob");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("surname", surname);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("comment", comment);
    formData.append("formName", "фасадов Duco");
    
    // Добавляем PDF
    formData.append("files", new File([pdfBlob], "order.pdf", { type: "application/pdf" }));
    
    // Добавляем пользовательские файлы (с проверкой)
    if (submitData.files && Array.isArray(submitData.files)) {
      submitData.files.forEach(file => {
        formData.append("files", file);
      });
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

const getColorOptions = (type) => {
  if (!type) return ColorDuco1;
  if (type === "Duco1") {
    return ColorDuco1;
  } else if (type === "Duco2") {
    return ColorDuco2;
  } else {
    return ColorDuco3;
  }
};

  return (
    <div className={css.duco__container}>
      <section className={css.duco__form_container}>
        <div className="pdf-adjust" ref={pdfRef}>
          <div className={css.duco__logo}>
            <img src={`${basePath}/png/fasads/duco.png`} className={css.duco__logo_item} alt="Логотип" />
          </div>

    <form className={css.duco__form}>
          <div className={css.duco__form_main}>
            <div className={css.form__item}>
              <label htmlFor="collection">Коллекция*</label>
              <select
                name="collection"
                id="collection"
                className={css.form__select}
                required
                value={selectedTypeSurface}
                onChange={handleTypeSurfaceChange}
                onBlur={checkFormValidity}
              >
                {collection.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="colorDuco">Цвет Duco*</label>
              <select
                name="colorDuco"
                id="colorDuco"
                className={css.form__select}
                required
                options={getColorOptions(selectedTypeSurface).filter(item => !item.optgroup)}
                onChange={handleColorChange}
                value={selectedColor}
                onBlur={checkFormValidity}
              >
                {getColorOptions(selectedTypeSurface).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="thickness">Толщина*</label>
              <select
                name="thickness"
                id="thickness"
                className={css.form__select}
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              >
                <option value="18mm">18мм</option>
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="reverseSide">Обратная сторона*</label>
              <select
                name="reverseSide"
                id="reverseSide"
                className={css.form__select}
                required
                onChange={checkFormValidity}
                onBlur={checkFormValidity}
              >
                <option value="color">В цвет</option>
              </select>
            </div>

            <div className={css.form__item}>
              <input
                type="text"
                placeholder="Или напишите ваш вариант цвета"
                className={css.form__input}
                name="myColor"
                id="myColor"
                required
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
                noteOptions={noteClassic}
                minHeight={130}
                minWidth={50}
                maxHeight={2410}
                maxWidth={1800}
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