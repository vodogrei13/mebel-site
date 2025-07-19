"use client";
import css from "./drawingItem.module.scss";
import { useEffect, useState } from "react";

export const DrawingItem = ({ 
  item, 
  index, 
  onRemove, 
  isRemovable, 
  onFieldChange,
  noteOptions = [],
  minHeight = 0,
  maxHeight = Infinity,
  minWidth = 0,
  maxWidth = Infinity
}) => {
  const [heightValue, setHeightValue] = useState("");
  const [widthValue, setWidthValue] = useState("");
  const [error, setError] = useState({ show: false, message: "" });
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);

  const showError = (message) => {
    setError({ show: true, message });
    setShowErrorOverlay(true);
    setTimeout(() => {
      setError({ show: false, message: "" });
      setShowErrorOverlay(false);
    }, 5000);
  };

  const handleDimensionChange = (e) => {
    const { name, value } = e.target;
    
    if (value === "" || /^\d*$/.test(value)) {
      if (name.includes('height')) {
        setHeightValue(value);
      } else if (name.includes('width')) {
        setWidthValue(value);
      }
      
      onFieldChange({
        ...e,
        target: {
          ...e.target,
          value: value
        }
      });
    }
  };

  const handleBlurOrKeyPress = (e) => {
    if (e.type === 'keydown' && e.key !== 'Enter') return;
    
    const { name, value } = e.target;
    
    if (value === "") {
      onFieldChange(e);
      return;
    }
    
    let numValue = parseInt(value, 10);
    
    if (isNaN(numValue)) {
      numValue = name.includes('height') ? minHeight : minWidth;
      showError(`Введите числовое значение`);
    } else {
      // Проверка диапазона
      if (name.includes('height')) {
        if (numValue < minHeight || numValue > maxHeight) {
          showError(`Значение высоты вне диапазона производителя\n (${minHeight}-${maxHeight} мм)`);
        }
        numValue = Math.max(minHeight, Math.min(maxHeight, numValue));
      } else if (name.includes('width')) {
        if (numValue < minWidth || numValue > maxWidth) {
          showError(`Значение ширины вне диапазона производителя\n (${minWidth}-${maxWidth} мм)`);
        }
        numValue = Math.max(minWidth, Math.min(maxWidth, numValue));
      }
    }

    const newValue = numValue.toString();
    if (name.includes('height')) {
      setHeightValue(newValue);
    } else {
      setWidthValue(newValue);
    }

    const newEvent = {
      ...e,
      target: {
        ...e.target,
        value: newValue
      }
    };
    
    onFieldChange(newEvent);
  };

  useEffect(() => {
    setHeightValue("");
    setWidthValue("");
  }, [item.id]);

  return (
    <div key={item.id} className={css.drawing_item}>
      <p className={css.number_item}>{index + 1}</p>

      {showErrorOverlay && <div className={css.error_overlay}></div>}

      {error.show && (
        <div className={css.error_message}>
          {error.message.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < error.message.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      )}

      <div className={css.input_item}>
        <label htmlFor={`height-select-${item.id}`}>Высота*</label>
        <div className={css.dimension_hint}>
          Допустимый диапазон: {minHeight}-{maxHeight} мм
        </div>
        <input
          type="number"
          className={css.form__input}
          name={`height-${item.id}`}
          id={`height-select-${item.id}`}
          value={heightValue}
          onChange={handleDimensionChange}
          onBlur={handleBlurOrKeyPress}
          onKeyDown={handleBlurOrKeyPress}
          min={minHeight}
          max={maxHeight}
          required
        />
      </div>

      <div className={css.input_item}>
        <label htmlFor={`width-select-${item.id}`}>Ширина*</label>
        <div className={css.dimension_hint}>
          Допустимый диапазон: {minWidth}-{maxWidth} мм
        </div>
        <input
          type="number"
          className={css.form__input}
          name={`width-${item.id}`}
          id={`width-select-${item.id}`}
          value={widthValue}
          onChange={handleDimensionChange}
          onBlur={handleBlurOrKeyPress}
          onKeyDown={handleBlurOrKeyPress}
          min={minWidth}
          max={maxWidth}
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
          {noteOptions.map((option) => (
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