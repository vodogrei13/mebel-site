"use client";
import css from "./dveriKupe.module.scss";
import { basePath } from "@/utils/basePath";
import SubmitModal from "../submitModal/submitModal";
import { useState, useRef, useCallback, useEffect } from "react";
import { Button_Gradient } from "@/components/ui/buttons/button-gradient/button-gradient";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { formatPhoneNumber } from "@/utils/phoneFormatter";

export const FormDveriKupe = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [TypeOfSeparator, setTypeOfSeparator] = useState("frame 1");
  const [selectedTypeSurface, setSelectedTypeSurface] = useState("color");
  const [showSubmitModal, setShowSubmitModal] = useState(false);
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

    const handleTypeSurfaceChange = (e) => {
    setSelectedTypeSurface(e.target.value);
    checkFormValidity();
    };

    const handleSeparatorChange = (e) => {
    setTypeOfSeparator(e.target.value);
    };

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

    body.pdf-mode .${css.dveriKupe__form_main},
    body.pdf-mode .${css.form__form_drawing} {
      gap: 6px !important;
    }

    body.pdf-mode .${css.number_item} {
      font-size: 8px !important;
      height: 15px !important;
      line-height: 14px !important;
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
    formData.append("formName", "Дверей-купе");
    
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

  return (
    <div className={css.dveriKupe__container}>
      <section className={css.dveriKupe__form_container}>
        <div className="pdf-adjust" ref={pdfRef}>
          <div className={css.dveriKupe__logo}>
            <img src={`${basePath}/png/aristo.png`} className={css.dveriKupe__logo_item} alt="Логотип" />
          </div>

    <form className={css.dveriKupe__form}>
          <div className={css.dveriKupe__form_main}>

            <section className={css.section__ParametersOfSlidingDoors}>
                <h3>Параметры проёма и дверей-купе</h3>
                <div className={css.form__item}>
                <label htmlFor="HeightOfTheOpening">Высота проёма*</label>
                <input
                    type="number"
                    placeholder="2500"
                    className={css.form__input}
                    name="HeightOfTheOpening"
                    id="HeightOfTheOpening"
                    required
                    onChange={handleTypeSurfaceChange}
                />
                </div>

                <div className={css.form__item}>
                <label htmlFor="WidthOfTheOpening">Ширина проёма*</label>
                <input
                    type="number"
                    placeholder="1500"
                    className={css.form__input}
                    name="WidthOfTheOpening"
                    id="WidthOfTheOpening"
                    required
                    onChange={handleTypeSurfaceChange}
                />
                </div>

                <div className={css.form__item}>
                <label htmlFor="NumberOfDoors">Количество дверей*</label>
                <select
                    name="NumberOfDoors"
                    id="NumberOfDoors"
                    className={css.form__select}
                    required
                    onChange={handleTypeSurfaceChange}
                >
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
                </div>

                <div className={css.form__item}>
                <label htmlFor="SchlegelСolor">Цвет шлегеля*</label>
                <select
                    name="SchlegelСolor"
                    id="SchlegelСolor"
                    className={css.form__select}
                    required
                    onChange={handleTypeSurfaceChange}
                >
                    <option value="white">Белый</option>
                    <option value="grey">Серый</option>
                </select>
                </div>

                <div className={css.form__item}>
                <label htmlFor="LDSPColor">Цвет ЛДСП*</label>
                <input
                    type="number"
                    className={css.form__input}
                    name="LDSPColor"
                    id="LDSPColor"
                    required
                    onChange={handleTypeSurfaceChange}
                />
                </div>

                <div className={css.form__item}>
                <label htmlFor="Texture">Текстура*</label>
                <select
                    name="Texture"
                    id="Texture"
                    className={css.form__select}
                    required
                    onChange={handleTypeSurfaceChange}
                >
                    <option value="Vertical">Вертикальная</option>
                    <option value="Horizontal">Горизонтальная</option>
                </select>
                </div>

                <div className={css.form__item}>
                <label htmlFor="material">Материал вставки*</label>
                <input
                    type="number"
                    className={css.form__input}
                    name="material"
                    id="material"
                    required
                    onChange={handleTypeSurfaceChange}
                />
                </div>
            </section>

            <section className={css.section__ParametersPen}>
                <h3>Параметры ручки (профиля)</h3>
                <div className={css.form__item}>
                <label htmlFor="SystemColor">Цвет системы*</label>
                <select
                    name="SystemColor"
                    id="SystemColor"
                    className={css.form__select}
                    required
                    onChange={handleTypeSurfaceChange}
                >
                    <option value="Dark wenge">Венге темный Эко</option>
                    <option value="Smoky oak">Дуб дымчатый Эко</option>
                    <option value="Matt bronze">Матовая бронза Эко</option>
                    <option value="Matt champagne">Матовая шампань Эко</option>
                    <option value="Matt gold">Матовое золото Эко</option>
                    <option value="Matt chrome">Матовый хром Эко</option>
                    <option value="French walnut">Орех французский Эко</option>
                    <option value="White gloss">Белый глянец Эко</option>
                </select>
                </div>

                <div className={css.form__item}>
                <label htmlFor="typeOfHandle">Вид ручки (профиль) - тип ручки*</label>
                <select
                    name="typeOfHandle"
                    id="typeOfHandle"
                    className={css.form__select}
                    required
                    onChange={handleTypeSurfaceChange}
                >
                    <option value="Vertical">Профиль вертикальный С</option>
                </select>
                </div>
                <div className={css.dveriKupe__handle}>
                    <img src={`${basePath}/png/handle1.png`} className={css.dveriKupe__handle_item} alt="Вид ручки профиль вертикальный" />
                </div>
            </section>
            
            <section className={css.section__TypeOfSeparator}>
                <h3>Вид разделителя (средней рамки)</h3>
                <div className={css.form__item}>
                <label htmlFor="TypeOfSeparator">Разделитель (Средняя рамка)*</label>
                <select
                    name="TypeOfSeparator"
                    id="TypeOfSeparator"
                    className={css.form__select}
                    required
                    onChange={handleSeparatorChange}
                >
                    <option value="Frame 1">Рамка средняя с винтом</option>
                    <option value="Frame 2">Рамка средняя без самореза</option>
                </select>
                </div>

                <div className={css.dveriKupe__separator_image}>
                    {TypeOfSeparator === "Frame 1" ? (
                        <img src={`${basePath}/png/Frame1.png`} className={css.separator_image} alt="Вид разделителя с винтом"/>
                    ) : (
                        <img src={`${basePath}/png/Frame2.png`} className={css.separator_image} alt="Вид разделителя без самореза"/>
                    )}
                </div>
            </section>

            <section className={css.section__Drawing}>
                <h3>Выбор наполнения дверей</h3>
                <p>Кликните по ячейке, чтобы поменять материал наполнения.</p>
            </section>
            
          </div>
        </form>
        <div className={css.submit__Container}>
          <div className={css.tooltipContainer}>
            <Button_Gradient 
              text="Расчёт" 
              onClick={() => setShowSubmitModal(true)} 
            />
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