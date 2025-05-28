import React from 'react';
import styles from './CalcAlVitrin.module.scss';

const VitrinaDrawing = ({ millingCount, hingeSide }) => {
  const hingePositions = [];
  const drawingHeight  =  2000;
  const edgeMargin = 60; // Отступ от краев
  const parsedCount = parseInt(millingCount) || 0;

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
      </div>
      <p>Чертеж "Лицевая сторона".</p>
    </div>
  );
};

export default VitrinaDrawing;