'use client'
import { Button_Origin } from "../../components/ui/buttons/button/button-origin";
import css from "./form.module.scss";
import { useState, useRef } from 'react';

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
    setFormData(prev => ({ ...prev, [name]: value }));
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
                placeholder="ТЕЛЕФОН" 
                value={formData.phone}
                onChange={handleInputChange}
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
                <label htmlFor="political">Я соглашаюсь с политикой обработки персональных данных</label>
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
