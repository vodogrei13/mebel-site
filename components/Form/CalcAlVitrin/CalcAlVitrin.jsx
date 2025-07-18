"use client";
import css from "./CalcAlVitrin.module.scss";
import optionImport from "./optionImport";
import VitrinaDrawing from "./VitrinaDrawing";
import { useState, useEffect, useRef } from "react";
import { priceConfig } from "./priceConfig";
import React from 'react';
import { Button_Gradient } from "@/components/ui/buttons/button-gradient/button-gradient";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const CalcAlVitrin = () => {
 const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const formsRef = useRef(null);

  const [forms, setForms] = useState([
    {
      id: 1,
      data: {
        profileView: "wide",
        profileArticles: "black",
        glassMirror: "None",
        height: 200,
        width: 200,
        units: 1,
        distanceToTheCenter: 0,
        millingForHinges: "None",
        hingeSide: "left",
        handles: "None",
        assembly: "no",
      },
      total: 0,
      sizeWarning: "",
    },
  ]);

const generatePDF = async () => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Создаем контейнер для информации об отправителе
  const senderInfoContainer = document.createElement('div');
  senderInfoContainer.style.position = 'absolute';
  senderInfoContainer.style.left = '-9999px';
  senderInfoContainer.style.width = '100%';
  senderInfoContainer.style.padding = '20px';
  senderInfoContainer.style.backgroundColor = '#fff';
  
  // Добавляем информацию об отправителе
  const senderInfoHTML = `
    <div style="margin-bottom: 20px;">
      <h2 style="text-align: center; margin-bottom: 15px;">Данные отправителя</h2>
      <div style="display: flex; flex-direction: column; gap: 18px;">
        <div style="font-size: 30px"><strong>ФИО:</strong> ${surname} ${name}</div>
        <div style="font-size: 30px"><strong>Email:</strong> ${email}</div>
        <div style="font-size: 30px"><strong>Телефон:</strong> ${phone}</div>
        ${comment ? `<div style="font-size: 30px"><strong>Комментарий:</strong> ${comment}</div>` : ''}
      </div>
    </div>
  `;
  
  senderInfoContainer.innerHTML = senderInfoHTML;
  document.body.appendChild(senderInfoContainer);

  // Рендерим информацию об отправителе
  const senderInfoCanvas = await html2canvas(senderInfoContainer, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: '#fff',
  });

  // Добавляем информацию об отправителе в PDF
  const senderInfoImgData = senderInfoCanvas.toDataURL('image/jpeg', 0.9);
  const pageWidth = pdf.internal.pageSize.getWidth() - 20;
  const senderInfoHeight = (senderInfoCanvas.height * pageWidth) / senderInfoCanvas.width;
  
  pdf.addImage(senderInfoImgData, 'JPEG', 10, 10, pageWidth, senderInfoHeight);

  // Удаляем временный контейнер
  document.body.removeChild(senderInfoContainer);

  const formSections = Array.from(formsRef.current.querySelectorAll(`.${css.CalcAlVitrin__blockForm}`));
  
  for (let i = 0; i < formSections.length; i++) {
    const element = formSections[i];
    
    // Добавляем новую страницу для каждой формы (кроме первой)
    if (i > 0) {
      pdf.addPage();
    }

    // Создаем временный контейнер для заголовка формы
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '0';
    tempContainer.style.width = element.offsetWidth + 'px';
    document.body.appendChild(tempContainer);

    // Создаем заголовок формы
    const header = document.createElement('div');
    header.textContent = `Форма №${i + 1}`;
    header.style.fontSize = '20px';
    header.style.fontWeight = 'bold';
    header.style.textAlign = 'center';
    header.style.marginBottom = '20px';
    header.style.color = '#000';
    tempContainer.appendChild(header);

    // Рендерим заголовок формы
    const headerCanvas = await html2canvas(header, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#fff',
    });

    // Рендерим основную форму
    const selects = element.querySelectorAll('select');
    const replacedSelects = [];

    selects.forEach(select => {
      const selectedOption = select.options[select.selectedIndex];
      const displayDiv = document.createElement('div');
      displayDiv.textContent = selectedOption ? selectedOption.text : '';
      displayDiv.style.padding = '8px 4px';
      displayDiv.style.border = '1px solid #ccc';
      displayDiv.style.borderRadius = '4px';
      displayDiv.style.minHeight = '38px';
      displayDiv.style.fontSize = '14px';
      displayDiv.style.backgroundColor = '#f9f9f9';
      displayDiv.style.whiteSpace = 'normal';
      displayDiv.style.width = select.offsetWidth + 'px';

      replacedSelects.push({
        parent: select.parentNode,
        original: select,
        replacement: displayDiv,
      });

      select.parentNode.replaceChild(displayDiv, select);
    });

    await new Promise(resolve => setTimeout(resolve, 100));

    const formCanvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#fff',
    });

    // Возвращаем select'ы на место
    replacedSelects.forEach(({ parent, original, replacement }) => {
      parent.replaceChild(original, replacement);
    });

    // Удаляем временный контейнер
    document.body.removeChild(tempContainer);

    // Добавляем заголовок формы в PDF
    const headerImgData = headerCanvas.toDataURL('image/jpeg', 0.9);
    const headerHeight = (headerCanvas.height * pageWidth) / headerCanvas.width;
    
    // Позиция для заголовка формы (учитываем, что первая форма идет после информации об отправителе)
    const headerY = i === 0 ? 10 + senderInfoHeight + 10 : 10;
    pdf.addImage(headerImgData, 'JPEG', 10, headerY, pageWidth, headerHeight);
    
    // Добавляем форму в PDF
    const formImgData = formCanvas.toDataURL('image/jpeg', 0.9);
    const formHeight = (formCanvas.height * pageWidth) / formCanvas.width;
    pdf.addImage(formImgData, 'JPEG', 10, headerY + headerHeight + 5, pageWidth, formHeight);

    // Если это последняя форма, добавляем итоговую сумму
    if (i === formSections.length - 1) {
      // Создаем элемент для итоговой суммы
      const totalSumElement = document.createElement('div');
      totalSumElement.textContent = `Общая сумма всего заказа: ${totalSum} ₽`;
      totalSumElement.style.fontSize = '12px';
      totalSumElement.style.fontWeight = 'bold';
      totalSumElement.style.textAlign = 'center';
      totalSumElement.style.marginTop = '30px';
      totalSumElement.style.color = '#333';
      totalSumElement.style.paddingLeft = '180px';
      totalSumElement.style.paddingRight = '180px';
      totalSumElement.style.backgroundСolor = '#f5f5f5';

      // Добавляем элемент в документ
      const tempTotalContainer = document.createElement('div');
      tempTotalContainer.style.position = 'absolute';
      tempTotalContainer.style.left = '-9999px';
      tempTotalContainer.appendChild(totalSumElement);
      document.body.appendChild(tempTotalContainer);

      // Рендерим элемент с итоговой суммой
      const totalCanvas = await html2canvas(totalSumElement, {
        scale: 1.5,
        useCORS: true,
        backgroundColor: '#fff',
      });

      // Добавляем итоговую сумму в PDF
      const totalImgData = totalCanvas.toDataURL('image/jpeg', 0.9);
      const totalHeight = (totalCanvas.height * pageWidth) / totalCanvas.width;
      
      // Проверяем, поместится ли на текущей странице
      const currentY = headerY + headerHeight + 5 + formHeight;
      const remainingSpace = pdf.internal.pageSize.getHeight() - currentY;
      
      if (remainingSpace < totalHeight + 10) {
        // Если не помещается, добавляем новую страницу
        pdf.addPage();
        pdf.addImage(totalImgData, 'JPEG', 10, 10, pageWidth, totalHeight);
      } else {
        // Если помещается, добавляем на текущую страницу
        pdf.addImage(totalImgData, 'JPEG', 10, currentY + 10, pageWidth, totalHeight);
      }

      // Удаляем временный контейнер
      document.body.removeChild(tempTotalContainer);
    }
  }

  return pdf;
};

const formatPhoneNumber = (value) => {
  if (!value) return value;
  
  // Удаляем все нецифровые символы
  let phoneNumber = value.replace(/[^\d]/g, '');
  
  // Если номер не пустой и не начинается с 7, добавляем 7 в начало
  if (phoneNumber.length > 0 && !phoneNumber.startsWith('7')) {
    phoneNumber = '7' + phoneNumber.replace(/^7/, '');
  }
  
  // Ограничиваем длину номера (11 цифр с учетом +7)
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 1) return '';
  if (phoneNumberLength <= 1) return `+7`;
  if (phoneNumberLength <= 4) return `+7 (${phoneNumber.slice(1)}`;
  if (phoneNumberLength <= 7) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
  }
  if (phoneNumberLength <= 9) {
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
  }
  
  return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
};

const handlePhoneChange = (e) => {
  const input = e.target.value;
  
  // Форматируем номер телефона
  const formattedPhone = formatPhoneNumber(input);
  
  // Сохраняем только цифры в state (для отправки на сервер)
  let digitsOnly = input.replace(/[^\d]/g, '');
  
  // Если номер не пустой и не начинается с 7, добавляем 7 в начало
  if (digitsOnly.length > 0 && !digitsOnly.startsWith('7')) {
    digitsOnly = '7' + digitsOnly.replace(/^7/, '');
  }
  
  // Ограничиваем длину 11 цифр
  digitsOnly = digitsOnly.slice(0, 11);
  
  setPhone(digitsOnly);
  
  // Обновляем значение в input (с форматированием)
  e.target.value = formattedPhone;
};
 const handleSubmit = async () => {
  console.log('Начало отправки заказа');
  
  if (!name || !phone || !email) {
    alert('Пожалуйста, заполните обязательные поля: Имя, Телефон и Email');
    return;
  }

  setIsSending(true);
  
  try {
    console.log('Генерация PDF...');
    const pdf = await generatePDF();
    console.log('PDF сгенерирован успешно');
    
    const pdfBlob = pdf.output('blob');
    console.log('PDF преобразован в blob');

    const formData = new FormData();
    formData.append('name', name );
    formData.append("surname", surname);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('comment', comment);
    formData.append("formName", "Алюминиевые витрины");
    formData.append('files', pdfBlob, 'order.pdf');
    
    console.log('Отправка данных на сервер...');
    const response = await fetch('/api/send-order', {
      method: 'POST',
      body: formData,
    });
    
    console.log('Ответ сервера:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Ошибка сервера:', errorData);
      throw new Error(errorData.error || 'Ошибка при отправке');
    }

    setSendSuccess(true);
    console.log('Отправка копии клиенту...');
    
    const clientPdfBlob = pdf.output('blob');
    const clientFormData = new FormData();
    clientFormData.append('email', email);
    clientFormData.append('files', clientPdfBlob, 'your_order.pdf');
    
    await fetch('/api/send-to-client', {
      method: 'POST',
      body: clientFormData,
    });
    
    console.log('Заказ успешно отправлен');
  } catch (error) {
    console.error('Ошибка при отправке:', error);
    alert(`Ошибка: ${error.message}`);
  } finally {
    setIsSending(false);
    setShowSubmitModal(false);
  }
};


  const addForm = () => {
    if (forms.length >= 7) return;

    const newId =
      forms.length > 0 ? Math.max(...forms.map((f) => f.id)) + 1 : 1;
    setForms([
      ...forms,
      {
        id: newId,
        data: {
          profileView: "wide",
          profileArticles: "black",
          glassMirror: "None",
          height: 200,
          width: 200,
          units: 1,
          distanceToTheCenter: 70,
          millingCount: "None",
          hingeSide: "left",
          handles: "None",
          assembly: "no",
        },
        total: 0,
        sizeWarning: "",
      },
    ]);
  };

  const removeForm = (id) => {
    if (forms.length <= 1) return;
    setForms(forms.filter((form) => form.id !== id));
  };

  const updateForm = (id, newData) => {
    setForms(
      forms.map((form) => (form.id === id ? { ...form, ...newData } : form))
    );
  };

  const checkDimensions = (formData) => {
    const { profileView, height, width } = formData;
    let warning = "";

    if (profileView === "narrow" && (height > 1500 || width > 500)) {
      warning =
        "За размеры, выходящие за границы: узкий от 200х200 до 1500х500, производитель ответственности не несёт.";
    } else if (profileView === "wide" && (height > 2100 || width > 500)) {
      warning =
        "За размеры, выходящие за границы: широкий от 200х200 до 2100х500, производитель ответственности не несёт.";
    }

    return warning;
  };

  const handleChange = (id) => (e) => {
    const { name, value } = e.target;

    setForms(
      forms.map((form) => {
        if (form.id !== id) return form;

        let newValue;
        if (
          name === "height" ||
          name === "width" ||
          name === "units" ||
          name === "distanceToTheCenter"
        ) {
          newValue = parseInt(value) || 0;
        } else {
          newValue = value;
        }

        const newData = {
          ...form.data,
          [name]: newValue,
        };

        const sizeWarning = checkDimensions(newData);
        const total = calculateTotal(newData);

        return {
          ...form,
          data: newData,
          total,
          sizeWarning,
        };
      })
    );
  };

  const handleBlur = (id) => (e) => {
    const { name, value } = e.target;

    setForms(
      forms.map((form) => {
        if (form.id !== id) return form;

        if (
          name === "height" ||
          name === "width" ||
          name === "units" ||
          name === "distanceToTheCenter"
        ) {
          const numValue = parseInt(value) || 0;
          let correctedValue = numValue;

          if (name === "height") {
            correctedValue = Math.min(Math.max(numValue, 200), 10000);
          } else if (name === "width") {
            correctedValue = Math.min(Math.max(numValue, 200), 600);
          } else if (name === "units") {
            correctedValue = Math.min(Math.max(numValue, 1), 1000);
          } else if (name === "distanceToTheCenter") {
            correctedValue = Math.min(Math.max(numValue, 70), 3000);
          }

          if (correctedValue !== numValue) {
            const newData = {
              ...form.data,
              [name]: correctedValue,
            };

            const sizeWarning = checkDimensions(newData);
            const total = calculateTotal(newData);

            return {
              ...form,
              data: newData,
              total,
              sizeWarning,
            };
          }
        }

        return form;
      })
    );
  };

  const calculateTotal = (formData) => {
    let sum = 0;

    // Расчет периметра витрины
    const vitrinaPerimeter = formData.height * 2 + formData.width * 2;
    const listLength = 3000;
    const listsCount = Math.ceil(vitrinaPerimeter / listLength);

    // Расчет стоимости профиля
    if (formData.profileView === "wide") {
      sum += (priceConfig.profileArticlesWide[formData.profileArticles] || 0) * listsCount;
      sum += priceConfig.millingCountWide[formData.millingCount] || 0;
      sum += priceConfig.cornerWide;
    } else {
      sum += (priceConfig.profileArticlesNarrow[formData.profileArticles] || 0) * listsCount;
      sum += priceConfig.millingCountNarrow[formData.millingCount] || 0;
      sum += priceConfig.cornerNarrow;
    }

    // Расчет стоимости стекла/зеркала
    const glassPrice = priceConfig.glassMirror[formData.glassMirror] || 0;
    if (glassPrice > 0) {
      const heightMeters = formData.height / 1000;
      const widthMeters = formData.width / 1000;
      const glassArea = heightMeters * widthMeters;
      sum += glassArea * glassPrice;
    }

    // Добавление дополнительных опций
    sum += priceConfig.assembly[formData.assembly] || 0;
    sum += priceConfig.handles[formData.handles] || 0;
    sum += priceConfig.raspil * formData.units;

    // Упаковка и герметик
    const packageCount = Math.ceil(listsCount / 2);
    sum += priceConfig.package * packageCount;

    const sealantMeters = Math.ceil(vitrinaPerimeter / 1000);
    sum += sealantMeters * priceConfig.sealant;

    // Умножение на количество единиц
    sum *= formData.units;

    return Math.round(sum);
  };

  const handleMillingCountChange = (id) => (e) => {
    const { name, value } = e.target;
  setForms(
    forms.map((form) => {
      if (form.id !== id) return form;
      
      const newData = {
        ...form.data,
        [name]: value,
      };

      const sizeWarning = checkDimensions(newData);
      const total = calculateTotal(newData);

      return {
        ...form,
        data: newData,
        total,
        sizeWarning,
      };
    })
  );
};

  const totalSum = forms.reduce((sum, form) => sum + form.total, 0);

  return (
    <div className={css.CalcAlVitrin__container} ref={formsRef}>
      {forms.map((form, index) => (
        <React.Fragment key={form.id}>
          <section className={css.CalcAlVitrin__blockForm}>
            {forms.length > 1 && (
            <div className={css.removeFormContainer}>
                <button
                className={css.removeFormButton}
                onClick={() => removeForm(form.id)}
                >
                Удалить
                </button>
            </div>
            )}
            <div
              className={css.help__main_icon}
              onClick={() => setShowHelpModal(true)}
            >
              ?
            </div>
            {showHelpModal && (
              <div className={css.help__main_modal}>
                <div className={css.modal__main_content}>
                  <h3>Подсказка по рассчету:</h3>
                  <p>
                    <ul>
                      <li>1.Заполните все поля формы;</li>
                      <li>
                        2.При выборе петель появяться окошки в которые
                        необходимо вписать расстояние;
                      </li>
                      <li>3.При необходимости впишите коментарий;</li>
                      <li></li>
                    </ul>
                  </p>
                  <button
                    className={css.close__main_button}
                    onClick={() => setShowHelpModal(false)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
            <div className={css.CalcAlVitrin__form}>
              {form.sizeWarning && (
                <div className={css.size__warning}>{form.sizeWarning}</div>
              )}
              <form className={css.form__group}>
                <div className={css.form__group_row}>
                  <div className={css.form__item}>
                    <label htmlFor={`profile_view-select-${form.id}`}>
                      Вид профиля
                    </label>
                    <select
                      name="profileView"
                      id={`profile_view-select-${form.id}`}
                      className={css.form__select}
                      value={form.data.profileView}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {optionImport.profileViews.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`profile_article-select-${form.id}`}>
                      Артикул профиля
                    </label>
                    <select
                      name="profileArticles"
                      id={`profile_article-select-${form.id}`}
                      className={css.form__select}
                      value={form.data.profileArticles}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {form.data.profileView === "wide"
                        ? optionImport.profileArticlesWide.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))
                        : optionImport.profileArticlesNarrow.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                    </select>
                  </div>
                  <div className={css.form__item}>
                    <label htmlFor={`glass_mirror-select-${form.id}`}>
                      Стекло/Зеркало
                    </label>
                    <select
                      name="glassMirror"
                      id={`glass_mirror-select-${form.id}`}
                      className={css.form__select}
                      value={form.data.glassMirror}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {optionImport.glassMirror.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`matte_side-select-${form.id}`}>
                      Матовая сторона
                    </label>
                    <select
                      name="matteSide"
                      id={`matte_side-select-${form.id}`}
                      className={css.form__select}
                      value={form.data.matteSide}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {optionImport.matteSide.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={css.form__group_row}>
                  <div className={css.form__item}>
                    <label htmlFor={`height-select-${form.id}`}>
                      Высота (мм)
                    </label>
                    <input
                      type="number"
                      placeholder="200"
                      className={css.form__input}
                      min={200}
                      max={1500}
                      name="height"
                      id={`height-select-${form.id}`}
                      value={form.data.height}
                      onChange={handleChange(form.id)}
                      onBlur={handleBlur(form.id)}
                      required
                    />
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`width-select-${form.id}`}>
                      Ширина (мм)
                    </label>
                    <input
                      type="number"
                      placeholder="200"
                      className={css.form__input}
                      min={200}
                      max={700}
                      name="width"
                      id={`width-select-${form.id}`}
                      value={form.data.width}
                      onChange={handleChange(form.id)}
                      onBlur={handleBlur(form.id)}
                      required
                    />
                  </div>
                  <div className={css.form__item}>
                    <label htmlFor={`units-select-${form.id}`}>
                      Количество (шт)
                    </label>
                    <input
                      type="number"
                      placeholder="1"
                      className={css.form__input}
                      min={1}
                      max={99999}
                      name="units"
                      id={`units-select-${form.id}`}
                      value={form.data.units}
                      onChange={handleChange(form.id)}
                      onBlur={handleBlur(form.id)}
                      required
                    />
                  </div>
                </div>

                <div className={css.form__group_row}>
                  <div className={css.form__item}>
                    <label htmlFor={`milling_for_hinges-select-${form.id}`}>
                      Количество фрезеровок под петли
                    </label>
                    <select
                      name="millingCount"
                      id={`milling_for_hinges-select-${form.id}`}
                      className={css.form__select}
                      required
                      value={form.data.millingCount}
                      onChange={handleMillingCountChange(form.id)}
                    >
                      <option value="None">Нет</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`position_of_the_loops-select-${form.id}`}>
                      Положение петель
                    </label>
                    <select
                      name="hingeSide"
                      id={`position_of_the_loops-select-${form.id}`}
                      className={css.form__select}
                      required
                      value={form.data.hingeSide}
                      onChange={handleChange(form.id)}
                    >
                      <option value="left">Слева</option>
                      <option value="right">Справа</option>
                    </select>
                  </div>
                </div>

                <div className={css.form__group_row}>
                  <div className={css.form__item}>
                    <label htmlFor={`handles-select-${form.id}`}>
                      Тип ручки
                    </label>
                    <select
                      name="handles"
                      id={`handles-select-${form.id}`}
                      value={form.data.handles}
                      className={css.form__select}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {optionImport.handles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`handle_holes-select-${form.id}`}>
                      Межосевое расстояние отверстий ручки
                    </label>
                    <select
                      name="handleHoles"
                      id={`handle_holes-select-${form.id}`}
                      className={css.form__select}
                      value={form.data.handleHoles}
                      onChange={handleChange(form.id)}
                      required
                    >
                      {optionImport.handleHoles.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={css.form__item}>
                    <label htmlFor={`distance_to_the_center-select-${form.id}`}>
                      Расстояние до центра ручки (мм)
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      min={70}
                      className={css.form__input}
                      max={99999}
                      name="distanceToTheCenter"
                      id={`distanceToTheCenter-select-${form.id}`}
                      value={form.data.distanceToTheCenter}
                      onChange={handleChange(form.id)}
                      onBlur={handleBlur(form.id)}
                      required
                    />
                  </div>
                </div>

                <div className={css.form__group_row}>
                  <div className={css.form__item}>
                    <label htmlFor={`assembly-select-${form.id}`}>Сборка</label>
                    <select
                      name="assembly"
                      id={`assembly-select-${form.id}`}
                      value={form.data.assembly}
                      onChange={handleChange(form.id)}
                      className={css.form__select}
                      required
                    >
                      <option value="no">Нет</option>
                      <option value="yes">Да</option>
                    </select>
                  </div>
                </div>
                <div className={css.form__summa_wrapper}>
                  <div className={css.form__summa_container}>
                    <label
                      htmlFor={`summa-select-${form.id}`}
                      className={css.form__label_summa}
                    >
                      Сумма
                    </label>
                    <div className={css.form__summa_block}>
                      <div className={css.form__summa} id={`summa-select-${form.id}`}>
                        {form.total} руб.
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className={css.CalcAlVitrin__drawing}>
              <VitrinaDrawing
                height={form.data.height}
                millingCount={form.data.millingCount}
                hingeSide={form.data.hingeSide}
                handles={form.data.handles}
                distanceToTheCenter={form.data.distanceToTheCenter}
              />
            </div>
          </section>
          {index === forms.length - 1 && forms.length < 7 && (
            <button className={css.addFormButton} onClick={addForm}>
              + Добавить еще
            </button>
          )}
          {index === forms.length - 1 && (
            <>
              <label
                className={css.CalcAlVitrin__comment_label}
                htmlFor="texareaComment"
              >
                Коментарий
              </label>
              <textarea
                className={css.CalcAlVitrin__comment}
                type="texarea"
                name="comment"
                id="texareaComment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <p className={css.CalcAlVitrin__warningText}>
                Рекомендуется выписывать в витрины из широкого и узкого профиля
                петли Hettich.На производстве делается присадка под данного
                производителя.
              </p>
            </>
          )}
        </React.Fragment>
      ))}
      <div className={css.total__Sum_Container}>
        <h3>Общая сумма: {totalSum} ₽</h3>
      </div>
      <div className={css.submit__Container}>
        <Button_Gradient
        text="Отправить заказ"
        onClick={() => setShowSubmitModal(true)}>
          </Button_Gradient>



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


</div>
      {showSubmitModal && (
              <div className={css.submit__modal}>
                <div className={css.submit__content}>
                  <h3>Отправка заказа</h3>
                  <label htmlFor="name">Ваше Имя</label>
                  <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  />
                  <label htmlFor="surname">Ваша Фамилия</label>
                  <input 
                  type="text" 
                  id="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  required
                  />
                  <label htmlFor="phone">Ваш Телефон</label>
                  <input 
                  type="tel" 
                  id="phone"
                  value={formatPhoneNumber(phone)}
                  onChange={handlePhoneChange}
                  placeholder="+7 (___) ___-__-__"
                  required
                  />
                  <label htmlFor="email">Ваш E-mail</label>
                  <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
                  <button
                    className={css.submit__close_button}
                    onClick={() => setShowSubmitModal(false)}
                    disabled={isSending}
                  >
                    X
                  </button>
                  <button
                    className={css.submit__button}
                    onClick={handleSubmit}
                    disabled={isSending}
                  >
                    {isSending ? 'Отправка...' : 'Отправить'}
                  </button>
                </div>
              </div>
            )}
            {sendSuccess && (
              <div className={css.submit__modal}>
                <div className={css.submit__content}>
                  <h3>Ваш заказ отправлен!</h3>
                  <p>Мы свяжемся с вами в ближайшее время.</p>
                  <button
                    className={css.submit__button}
                    onClick={() => setSendSuccess(false)}
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            )}
      </div>
  );
};
