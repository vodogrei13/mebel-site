'use client'
import { Button_Origin } from "../../components/ui/buttons/button/button-origin";
import css from "./form.module.scss";
import { useState, useRef } from 'react';

export const Form = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const dt = useRef(new DataTransfer());

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    
    // Добавляем новые файлы в DataTransfer
    newFiles.forEach(file => {
      dt.current.items.add(file);
    });
    
    // Обновляем список файлов
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Обновляем files в input
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.current.files;
    }
  };

  const removeFile = (index) => {
    // Удаляем файл из DataTransfer
    dt.current.items.remove(index);
    
    // Обновляем список файлов
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    
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
          <form method="post">
            <input type="text" id="name" name="name" placeholder="ИМЯ" required/>
            <input type="email" id="email" name="email" placeholder="E-MAIL" required/>
            <input type="tel" id="phone" name="phone" placeholder="ТЕЛЕФОН" required/>
            <textarea type="textarea" id="comment" name="comment" placeholder="ВАШ КОМЕНТАРИЙ"/>
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
                  <span>Выберите файл</span>
                </label>
                
                <div className={css.input_file_list}>
                  <div className={css.files_grid}>
                    {files.map((file, index) => (
                      <div key={index} className={css.input_file_list_item}>
                        <span className={css.input_file_list_name}>{file.name}</span>
                        <a 
                          href="#" 
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile(index);
                          }} 
                          className={css.input_file_list_remove}
                        >
                          х
                        </a>
                      </div>
                    ))}
                  </div>  
                </div>  
              </div> 
            </div>           
            
          </form>
        </div>
        <div className={css.form__button}>
          <Button_Origin 
          text="Отправить"/>
        </div>
      </section>
    </div>
  );
};
