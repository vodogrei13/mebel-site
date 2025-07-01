"use client";
import css from "./drawingItem.module.scss";
import { note } from "../Skat/optionImport";

export const DrawingItem = ({ item, index, onRemove, isRemovable, onFieldChange  }) => {
  return (
    <div key={item.id} className={css.drawing_item}>
                <p className={css.number_item}>{index + 1}</p>

                <div className={css.input_item}>
                    <label htmlFor={`height-select-${item.id}`}>Высота*</label>
                    <input
                    type="number"
                    className={css.form__input}
                    name={`height-${item.id}`}
                    id={`height-select-${item.id}`}
                    onChange={onFieldChange}
                    required
                    />
                </div>

                <div className={css.input_item}>
                    <label htmlFor={`width-select-${item.id}`}>Ширина*</label>
                    <input
                    type="number"
                    className={css.form__input}
                    name={`width-${item.id}`}
                    id={`width-select-${item.id}`}
                    onChange={onFieldChange}
                    required
                    />
                </div>

              <div className={css.input_item}>
                <label htmlFor={`quantity-select-${item.id}`}>Кол-во*</label>
                <input
                  type="number"
                  className={css.form__input}
                  name={`quantity-${item.id}`}
                  id={`quantity-select-${item.id}`}
                  onChange={onFieldChange}
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
                onClick={() => onRemove(item.id)}
                disabled={!isRemovable}
            >
                x
            </button>
            </div>
  );
};