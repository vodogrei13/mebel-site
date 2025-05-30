import React from 'react';
import styles from './CalcAlVitrin.module.scss';

const VitrinaDrawing = ({ millingCount, hingeSide, distanceToTheCenter, handles }) => {
  const hingePositions = [];
  const drawingHeight  =  2000;
  const edgeMargin = 60;
  const parsedCount = parseInt(millingCount) || 0;
  const parsedDistance = parseInt(distanceToTheCenter) || 0;

  if (parsedCount > 1) {
    // Первая петля у верхнего края
    hingePositions.push(edgeMargin);
    
    // Последняя петля у нижнего края
    hingePositions.push(drawingHeight -edgeMargin);
    
    // Остальные петли равномерно между ними
    for (let i = 1; i < parsedCount - 1; i++) {
      const position = (i / (parsedCount - 1)) * drawingHeight ;
      hingePositions.push(position);
    }
  } else if (parsedCount === 1) {
    // Если только одна петля - размещаем по центру
    hingePositions.push(drawingHeight  / 2);
  }

// Позиция ручки (от нижнего края)
  const handlePosition = drawingHeight - parsedDistance;

  return (
    <div className={styles.drawing__image}>
      <div className={styles.drawing_vitrin}>
        {hingePositions.map((pos, idx) => (
          <div
            key={idx}
            className={`${styles.drawing_hinge} ${hingeSide === 'right' ? styles.right : styles.left}`}
            style={{ top: `${(pos / drawingHeight ) * 100}%` }}
          />
        ))}
      {handles === 'button' && (
          <div 
            className={styles.drawing_handles_button} 
          />
        )}

        {handles === 'horizontal-button' && (
          <div 
            className={styles.drawing_horizontal_button} 
          />
        )}

        {handles === 'vertical-button' && (
          <div 
            className={styles.drawing_vertical_button} 
          />
        )}

        {/* Стрелка с расстоянием Ручки*/}
        {handles !== 'None' && parsedDistance > 0 && (
          <div 
            className={styles.distance_indicator} 
          >
            <div 
              style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: '2px 5px',
                borderRadius: '3px',
                marginBottom: '5px',
                bottom: '35%',
                left: '20px',
              }}
            >
              {parsedDistance} мм
            </div>
          </div>
        )}
        {/* Стрелка с расстоянием Петлей*/}
        {millingCount !== 'None' && (
          <div 
            className={styles.distance_indicator} 

          >
            <div 
              style={{
                position: 'relative',
                backgroundColor: 'white',
                padding: '2px 5px',
                borderRadius: '3px',
                marginBottom: '5px',
                bottom: '35%',
                left: '20px',
              }}
            >
              {parsedDistance} мм
            </div>
          </div>
        )}
      </div>
      <p>Чертеж "Лицевая сторона".</p>
    </div>
  );
};

export default VitrinaDrawing;