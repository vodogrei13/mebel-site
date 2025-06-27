'use client'
import { Button_Origin } from "../../ui/buttons/button/button-origin";
import { Political } from "../../political/political";
import css from "./form.module.scss";
import { useState, useRef, useEffect } from 'react';

export const Form = () => {
  const [fileCount, setFileCount] = useState(0);
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comment: ''
  });
  const fileInputRef = useRef(null);
  const dt = useRef(null);

  // Инициализируем DataTransfer только в браузере
  useEffect(() => {
    dt.current = new DataTransfer();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'phone') {
      const onlyNums = value.replace(/\D/g, '');
  
      let formatted = '+7 ';
      if (onlyNums.length > 1) {
        formatted += '(' + onlyNums.slice(1, 4);
      }
      if (onlyNums.length >= 4) {
        formatted += ') ' + onlyNums.slice(4, 7);
      }
      if (onlyNums.length >= 7) {
        formatted += '-' + onlyNums.slice(7, 9);
      }
      if (onlyNums.length >= 9) {
        formatted += '-' + onlyNums.slice(9, 11);
      }
  
      setFormData(prev => ({ ...prev, phone: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dt.current) return; // Проверка на инициализацию

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('comment', formData.comment);
    
    // Добавляем файлы
    for (let i = 0; i < dt.current.files.length; i++) {
      formDataToSend.append('files', dt.current.files[i]);
    }

    try {
      console.log(formDataToSend);
      const response = await fetch('/api/send-email', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        alert('Заявка успешно отправлена!');
        // Сброс формы
        setFormData({ name: '', email: '', phone: '', comment: '' });
        removeFiles();
        setIsChecked(false);
      } else {
        throw new Error('Ошибка при отправке формы');
      }
    } catch (error) {
      setError('Произошла ошибка при отправке формы');
      console.error('Error:', error);
    }
  };

  const handleFileChange = (e) => {
    if (!dt.current) return; // Проверка на инициализацию
    const newFiles = Array.from(e.target.files);
    setError(null); 

    // Проверка количества файлов
    if (dt.current.files.length + newFiles.length > 4) {
      setError('Максимальное количество файлов - 4');
      return;
    }

    // Проверка размера файлов
    for (const file of newFiles) {
      if (file.size > 50 * 1024 * 1024) { // 50 МБ в байтах
        setError('Каждый файл должен быть не более 50 МБ');
        return;
      }
    }

    // Добавляем новые файлы в DataTransfer
    newFiles.forEach(file => {
      dt.current.items.add(file);
    });
    
    // Обновляем счетчик файлов
    setFileCount(dt.current.files.length);
    
    // Обновляем files в input
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.current.files;
    }
  };

  const removeFiles = () => {
    if (!dt.current) return; // Проверка на инициализацию
    // Очищаем DataTransfer
    dt.current = new DataTransfer();
    
    // Сбрасываем счетчик файлов
    setFileCount(0);
    setError(null);
    
    // Обновляем files в input
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.current.files;
    }
  };

  return (
    <div className={css.form__container}>
      <div className={css.form__title}>
        <h2>Оставьте заявку на расчет</h2>
      </div>
      <section className={css.form__blocks}>
        <div className={css.form__items}>
          <form onSubmit={handleSubmit}>
            <section className={css.form__info}>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="ИМЯ" 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input 
                type="email" 
                id="email" 
                name="email" 
                placeholder="E-MAIL" 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={handleInputChange}
                inputMode="numeric"
                required
              />
              <div className={css.form_bottom}>
                <textarea 
                  type="textarea" 
                  id="comment" 
                  name="comment" 
                  placeholder="ВАШ ВОПРОС"
                  value={formData.comment}
                  onChange={handleInputChange}
                />
                <div className={css.input_file_row}>
                  <div className={css.file_input_container}>
                    <label className={css.input_file}>
                      <input 
                        type="file" 
                        name="file[]" 
                        multiple 
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />		
                      <span>
                        {fileCount > 0 ? `${fileCount} файл(ов)` : "Выберите файл"}
                      </span>
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
                  </div> 
                </div>  
                <div className={css.file_requirements}>
                  до 4 файлов, до 50 мб
                </div>
              </div>
              <div className={css.form_politics}>
                <input 
                  type="checkbox" 
                  id="political" 
                  name="political" 
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  required
                />
                <label htmlFor="political">Я соглашаюсь с <span className={css.policyLink}><Political text="политикой обработки персональных данных"/></span></label>
              </div>
            </section>
            <div className={css.form__button}>
              <Button_Origin 
                text="Отправить"
                type="submit"
              />
            {error && <div className={css.error_message}>{error}</div>}
            </div>
            
          </form>
        </div>
      </section>
    </div>
  );
};
