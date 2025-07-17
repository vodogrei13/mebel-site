"use client";
import { useState, useEffect, useRef } from 'react';
import css from './searchableSelect.module.scss';

export const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder,
  id,
  name,
  required,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(
    value || (options.find(opt => !opt.optgroup)?.value || ''
  ));
  const [selectedLabel, setSelectedLabel] = useState(
    value ? options.find(o => o.value === value)?.label || '' 
    : (options.find(opt => !opt.optgroup)?.label || ''
  ));
  const selectRef = useRef(null);

  // Фильтрация опций с учетом optgroup
  const filteredOptions = options.filter(option => 
    !option.optgroup && option.label?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Группировка опций по категориям
  const groupedOptions = [];
  let currentGroup = null;

  options.forEach(option => {
    if (option.optgroup) {
      currentGroup = {
        label: option.optgroup,
        options: []
      };
      groupedOptions.push(currentGroup);
    } else if (currentGroup) {
      currentGroup.options.push(option);
    } else {
      groupedOptions.push(option);
    }
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // При изменении options устанавливаем первое значение по умолчанию
    if (options.length > 0 && !value) {
      const firstOption = options.find(opt => !opt.optgroup);
      if (firstOption) {
        setSelectedValue(firstOption.value);
        setSelectedLabel(firstOption.label);
        onChange({ target: { name, value: firstOption.value } });
      }
    }
  }, [options, name, onChange]);

  useEffect(() => {
    // Обновляем при изменении value извне
    if (value !== undefined && value !== selectedValue) {
      const option = options.find(o => o.value === value);
      if (option) {
        setSelectedValue(option.value);
        setSelectedLabel(option.label);
      }
    }
  }, [value, options, selectedValue]);

  const handleSelect = (value, label) => {
    setSelectedValue(value);
    setSelectedLabel(label);
    onChange({ target: { name, value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`${css.searchable_select} ${className}`} ref={selectRef}>
      <div 
        className={css.select_header}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLabel || placeholder}
      </div>
      
      {isOpen && (
        <div className={css.dropdown}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={css.search_input}
            autoFocus
          />
          
          <div className={css.options_list}>
            {searchTerm ? (
              filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <div
                    key={`${option.value}-${index}`}
                    className={css.option}
                    onClick={() => handleSelect(option.value, option.label)}
                  >
                    {option.label}
                  </div>
                ))
              ) : (
                <div className={css.no_options}>Ничего не найдено</div>
              )
            ) : (
              groupedOptions.map((item, index) => {
                if (item.options) {
                  return (
                    <div key={`group-${index}`}>
                      <div className={css.optgroup_header}>{item.label}</div>
                      {item.options.map((option, idx) => (
                        <div
                          key={`${option.value}-${idx}`}
                          className={css.option}
                          onClick={() => handleSelect(option.value, option.label)}
                        >
                          {option.label}
                        </div>
                      ))}
                    </div>
                  );
                }
                return (
                  <div
                    key={`${item.value}-${index}`}
                    className={css.option}
                    onClick={() => handleSelect(item.value, item.label)}
                  >
                    {item.label}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      
      <select
        name={name}
        id={id}
        value={selectedValue}
        onChange={onChange}
        required={required}
        style={{ display: 'none' }}
      >
        {options.map(option => (
          !option.optgroup && (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          )
        ))}
      </select>
    </div>
  );
};