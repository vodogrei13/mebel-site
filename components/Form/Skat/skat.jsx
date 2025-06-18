"use client";
import css from "./skat.module.scss";
import { basePath } from "@/utils/basePath";
import {
  typeSurface,
  colorDye,
  colorSkin,
  milling,
  millingOnTheFacade,
  millingOnTheEdge,
  prefabricated,
  patina,
  thickness,
  note,
} from "./optionImport";
import { useState, useEffect, useRef } from "react";
import { Button_Gradient } from "@/components/ui/buttons/button-gradient/button-gradient";

export const Skat = () => {
    const [selectedTypeSurface, setSelectedTypeSurface] = useState("");
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [sendSuccess, setSendSuccess] = useState(false);
    const [drawingItems, setDrawingItems] = useState([{ id: 1 }]);
    
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

  return (
    <div className={css.skat__container}>
      <div className={css.skat__logo}>
        <img
          src={`${basePath}/png/fasads/skat.png`}
          alt="Логотип Arbor Nova"
          className={css.skat__logo_item}
        />
      </div>
      <section className={css.skat__form_container}>
        <form className={css.skat__form}>
          <div className={css.skat__form_main}>
            <div className={css.form__item}>
              <label htmlFor="typeSurface">Тип поверхности*</label>
              <select
                name="typeSurface"
                id="typeSurface"
                className={css.form__select}
                value={selectedTypeSurface}
                onChange={(e) => setSelectedTypeSurface(e.target.value)}
                required
              >
                {typeSurface.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Направление текстуры*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                <option value="inHeight">По высоте</option>
                <option value="inWidth">По ширине</option>
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Фрезеровка*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {milling.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="color">Цвет*</label>
              <select
                name="color"
                id="color"
                className={css.form__select}
                required
              >
                {selectedTypeSurface === "color"
                  ? colorDye.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))
                  : colorSkin.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Толщина*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {thickness.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Фрезеровка по фасаду*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {millingOnTheFacade.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <input
                type="text"
                placeholder="Или напишите ваш вариант"
                className={css.form__input}
                name="myColor"
                id="myColor"
                required
              />
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Патина*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {patina.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Фрезеровка по краю*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {millingOnTheEdge.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.form__item}>
              <label htmlFor="textureDirection">Сборные*</label>
              <select
                name="textureDirection"
                id="textureDirection"
                className={css.form__select}
                required
              >
                {prefabricated.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={css.form__form_drawing}>
            {drawingItems.map((item, index) => (
                
                <div key={item.id} className={css.drawing_item}>
                <p className={css.number_item}>{index + 1}</p>

                <div className={css.input_item}>
                    <label htmlFor={`height-select-${item.id}`}>Высота</label>
                    <input
                    type="number"
                    className={css.form__input}
                    name={`height-${item.id}`}
                    id={`height-select-${item.id}`}
                    required
                    />
                </div>

                <div className={css.input_item}>
                    <label htmlFor={`width-select-${item.id}`}>Ширина</label>
                    <input
                    type="number"
                    className={css.form__input}
                    name={`width-${item.id}`}
                    id={`width-select-${item.id}`}
                    required
                    />
                </div>

              <div className={css.input_item}>
                <label htmlFor={`quantity-select-${item.id}`}>Количество</label>
                <input
                  type="number"
                  className={css.form__input}
                  name={`quantity-${item.id}`}
                  id={`quantity-select-${item.id}`}
                  required
                />
              </div>

              <div className={css.input_item}>
                <label htmlFor={`not${item.id}`}>Примечание</label>
                <select
                  name={`note-${item.id}`}
                  id={`note-${item.id}`}
                  className={css.form__select}
                  required
                >
                  {note.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={css.input_item}>
                <label htmlFor={`loop${item.id}`}>Петли</label>
                <select
                  name={`loops-${item.id}`}
                  id={`loops-${item.id}`}
                  className={css.form__select}
                  required
                >
                  <option value="no">Нет</option>
                  <option value="yes">Да</option>
                </select>
              </div>

              <div className={css.input_item}>
                <label htmlFor={`NumberOfLoops-select-${item.id}`}>Кол-во</label>
                <input
                  type="number"
                  min={1}
                  placeholder="1"
                  className={css.form__input}
                  name={`NumberOfLoops-${item.id}`}
                  id={`NumberOfLoops-select-${item.id}`}
                  required
                />
              </div>

              <div className={css.input_item}>
                <label htmlFor={`onBottom-select-${item.id}`}>От низа</label>
                <input
                  type="text"
                  className={css.form__input}
                  name={`onBottom-${item.id}`}
                  id={`onBottom-select-${item.id}`}
                  required
                />
              </div>

              <div className={css.input_item}>
                <label htmlFor={`onTop-select-${item.id}`}>От верха</label>
                <input
                  type="text"
                  className={css.form__input}
                  name={`onTop-${item.id}`}
                  id={`onTop-select-${item.id}`}
                  required
                />
              </div>

              <div className={css.input_item}>
                <label htmlFor={`middle-select-${item.id}`}>Средние</label>
                <input
                  type="text"
                  className={css.form__input}
                  name={`middle-${item.id}`}
                  id={`middle-select-${item.id}`}
                  required
                />
              </div>

              <div className={css.input_item}>
                <label htmlFor={`comment-select-${item.id}`}>Комментарий</label>
                <input
                  type="text"
                  className={css.form__input}
                  name={`comment-${item.id}`}
                  id={`comment-select-${item.id}`}
                  required
                />
              </div>
            <button 
                type="button"
                className={css.removeButton}
                onClick={() => removeDrawingItem(item.id)}
                disabled={drawingItems.length <= 1}
            >
                x
            </button>
            </div>
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
          <Button_Gradient
            text="Оформить заказ"
            onClick={() => setShowSubmitModal(true)}
          ></Button_Gradient>
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
                {isSending ? "Отправка..." : "Отправить"}
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
              >
                Закрыть
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
