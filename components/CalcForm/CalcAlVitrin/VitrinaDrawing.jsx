import React from 'react';
import styles from './CalcAlVitrin.module.scss';
import { useState, useEffect } from 'react';

const VitrinaDrawing = ({ millingCount, hingeSide, distanceToTheCenter, handles, height  }) => {
  const [hingeDistances, setHingeDistances] = useState({});
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [heightExceeded, setHeightExceeded] = useState(false);
  const drawingHeight  =  2000;
  const edgeMargin = 60;
  const parsedCount = parseInt(millingCount) || 0;
  const parsedDistance = parseInt(distanceToTheCenter) || 0;

  // Проверка превышения высоты петель
  useEffect(() => {
    const totalDistance = Object.values(hingeDistances).reduce((sum, dist) => sum + (dist || 0), 0);
    setHeightExceeded(totalDistance > height);
  }, [hingeDistances, height]);

  // Генерация позиций петель
  const hingePositions = [];
  if (parsedCount > 1) {
    hingePositions.push(edgeMargin);
    hingePositions.push(drawingHeight - edgeMargin);
    for (let i = 1; i < parsedCount - 1; i++) {
      const position = (i / (parsedCount - 1)) * drawingHeight;
      hingePositions.push(position);
    }
  } else if (parsedCount === 1) {
    hingePositions.push(drawingHeight / 2);
  }

  // Обработчик изменения расстояния для петли
  const handleDistanceChange = (index, value) => {
    setHingeDistances(prev => ({
      ...prev,
      [index]: parseInt(value) || 0
    }));
  };

  //положение окошки расстояний петель
  const getHingeDistanceInput = () => hingeSide ==='right' ? '14%' : '46%';
  //положение ручки-кнопки
  const getHandlePosition = () => hingeSide === 'right' ? '69.5%' : '9.5%';
  //положение ручки-скоба-горизонт
  const getHorizontalButtonPosition = () => hingeSide === 'right' ? '73.5%' : '13.5%';
  // положение скоба-вертикаль
  const getVerticalButtonPosition = () => hingeSide === 'right' ? '79%' : '19%';
  //положение стрелки ручки
  const getDistanceIndicatorPosition = () => hingeSide === 'right' ? '80%' : '20%';
  //положение стрелки петель
  const getDistanceMillingCount = () => hingeSide === 'right' ? '-6.5%' : '105.5%';
  //положение окошка помощи петель
  const getDistanceMillingCountHelp = () => hingeSide === 'right' ? '-1280%' : '500%';

  return (
    <div className={styles.drawing__container}>
      {heightExceeded && (
      <div className={styles.height__warning}>
        Сумма расстояний петель больше указанной высоты витрины!
      </div>
    )}
    <div className={styles.drawing__image}>
      <div className={styles.drawing_vitrin}>
        {hingePositions.map((pos, idx) => (
          <React.Fragment key={idx}>
            <div
              className={`${styles.drawing_hinge} ${hingeSide === 'right' ? styles.right : styles.left}`}
              style={{ top: `${(pos / drawingHeight) * 100}%` }}
            />
            
            {/* Окошко с расстоянием для каждой петли */}
            {millingCount !== 'None' && (
              <div 
                className={styles.hinge_distance_input}
                style={{
                  top: `${(pos / drawingHeight) * 100}%`,
                  right: getHingeDistanceInput(),
                }}
              >
                <input
                  type="number"
                  value={hingeDistances[idx] || ''}
                  onChange={(e) => handleDistanceChange(idx, e.target.value)}
                  placeholder="1"
                  min="0"
                  className={styles.distance_input}
                />
                <span className={styles.distance_unit}>мм</span>
              </div>
            )}
          </React.Fragment>
        ))}
      {handles === 'button' && (
          <div 
            className={styles.drawing_handles_button} 
            style={{ right: getHandlePosition() }}
          />
        )}

        {handles === 'horizontalButton' && (
          <div 
            className={styles.drawing_horizontal_button} 
            style={{ right: getHorizontalButtonPosition() }}
          />
        )}

        {handles === 'verticalButton' && (
          <div 
            className={styles.drawing_vertical_button} 
            style={{ right: getVerticalButtonPosition() }}
          />
        )}

        {/* Стрелка с расстоянием Ручки*/}
        {handles !== 'None' && parsedDistance > 0 && (
          <div 
            className={styles.distance_indicator} 
            style={{ right: getDistanceIndicatorPosition() }} 
          >
            <div 
              className={styles.distance_label} 
            >
              {parsedDistance} мм
            </div>
          </div>
        )}
        {showHelpModal && (
        <div className={styles.help_modal}>
          <div className={styles.modal_content}>
            <h3>Подсказка по расстоянию петель</h3>
            <p>
              Укажите расстояние от нижнего края витрины до каждой петли. 
              Максимальное значение не может превышать общую высоту ({height} мм).
            </p>
            <button 
              className={styles.close_button}
              onClick={() => setShowHelpModal(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
        {/* Стрелка с расстоянием Петлей*/}
        {millingCount !== 'None' && (
          <div className={styles.distance_millingCount}
          style={{ right: getDistanceMillingCount(),
                   transform: hingeSide === 'right' ? 'translateX(50%)' : 'translateX(-50%)'
          }}  >
          <div className={styles.help_icon}
          style={{ right: getDistanceMillingCountHelp() }}
          onClick={() => setShowHelpModal(true)}>
            ?
          </div>
          <div className={styles.distance_item}></div>
        </div>
        )}
      </div>
      <p>Чертеж "Лицевая сторона".</p>
    </div>
    </div>
  );
};

export default VitrinaDrawing;