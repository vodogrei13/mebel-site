"use client";
import { useEffect, useRef } from 'react';
import Head from 'next/head';
import { basePath } from '@/utils/basePath';

const NotFoundPage = () => {
  const truckRef = useRef(null);
  const wheelsRef = useRef([]);

  useEffect(() => {
    const truck = truckRef.current;
    if (!truck) return;

    let position = -800;
    const speed = 2;
    let rotation = 0;
    const rotationSpeed = 16;

    const animate = () => {
      position += speed;
      rotation += rotationSpeed;
      
      truck.style.transform = `translateX(${position}px)`;
      
      // Вращение всех колёс-дисков
      wheelsRef.current.forEach(wheel => {
        if (wheel) wheel.style.transform = `rotate(${rotation}deg)`;
      });

      if (position > window.innerWidth + 800) {
        position = -800;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animate);
    };
  }, []);

  const addWheelRef = (el) => {
    if (el && !wheelsRef.current.includes(el)) {
      wheelsRef.current.push(el);
    }
  };

  return (
    <>
      <Head>
        <title>404 - Страница не найдена</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.textContent}>
          <h1 style={styles.title}>Ой! Кажется, мы потерялись</h1>
          <p style={styles.subtitle}>Страница, которую вы ищете, возможно, переехала или больше не существует.</p>
          <a href="/" style={styles.homeLink}>Вернуться на главную</a>
        </div>
        
        {/* Контейнер с фурой и надписью 404 */}
        <div ref={truckRef} style={styles.truckContainer}>
          <div style={styles.truckImageWrapper}>
            <img 
              src={`${basePath}/png/fura.png`}
              alt="Грузовик 404"
              style={{ 
                ...styles.truckImage,
                transform: 'scaleX(-1)'
              }}
            />
            <div style={styles.errorCodeContainer}>
              <span style={styles.errorCodeText}>404</span>
            </div>
            
            {/* колёса */}
            <img
              ref={addWheelRef}
              src={`${basePath}/png/wheel.png`}
              alt="колесо"
              style={{
                ...styles.discoWheel,
                left: '101.3px'
              }}
            />
            <img
              ref={addWheelRef}
              src={`${basePath}/png/wheel.png`}
              alt="колесо"
              style={{
                ...styles.discoWheel,
                left: '156px'
              }}
            />
            <img
              ref={addWheelRef}
              src={`${basePath}/png/wheel.png`}
              alt="колесо"
              style={{
                ...styles.discoWheel,
                left: '210px'
              }}
            />
            <img
              ref={addWheelRef}
              src={`${basePath}/png/wheel.png`}
              alt="колесо"
              style={{
                ...styles.discoWheel,
                left: '485px'
              }}
            />
            <img
              ref={addWheelRef}
              src={`${basePath}/png/wheel.png`}
              alt="колесо"
              style={{
                ...styles.discoWheel,
                left: '697px'
              }}
            />
          </div>
        </div>
        
        {/* Дорога */}
        <div style={styles.road}>
          <div style={styles.roadLines}></div>
        </div>
      </div>
    </>
  );
};

const styles = {
    discoWheel: {
    position: 'absolute',
    bottom: '67px',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    zIndex: 15,
    transformOrigin: 'center',
    objectFit: 'cover',
    transition: 'transform 0.1s linear',
  },
  container: {
    position: 'relative',
    height: '60vh',
    backgroundColor: '#f5f7fa',
    overflow: 'hidden',
    fontFamily: "'Arial', sans-serif",
  },
  textContent: {
    position: 'relative',
    zIndex: 20,
    textAlign: 'center',
    paddingTop: '80px',
    color: '#2c3e50',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    color: '#7f8c8d',
  },
  homeLink: {
    display: 'inline-block',
    padding: '15px 30px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    ':hover': {
      backgroundColor: '#c0392b',
      transform: 'translateY(-2px)',
    },
  },
  truckContainer: {
    position: 'absolute',
    bottom: '0px',
    left: '0',
    width: '800px',
    height: '300px',
    transform: 'translateX(-800px)',
    zIndex: '10',
  },
  truckImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  truckImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  errorCodeContainer: {
    position: 'absolute',
    top: '33%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
    padding: '8px',
    border: 'none',
    background: `transparent`,
    display: 'inline-block',
  },
  errorCodeText: {
    fontSize: '6rem',
    fontWeight: 'bold',
    fontFamily: "'Banty Bold', sans-serif",
    letterSpacing: '5px',
    background: 'linear-gradient(to right, #1a2980 0%, #26d0ce 51%, #1a2980 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    textShadow: 'none',
    lineHeight: '1.2',
    display: 'inline-block',
    padding: '0 10px',
  },
  wheelFront: {
    position: 'absolute',
    left: '185px',
    bottom: '15px',
    width: '60px',
    height: '60px',
    backgroundColor: '#2c3e50',
    borderRadius: '50%',
    border: '8px solid #34495e',
    zIndex: 15,
    transformOrigin: 'center',
  },
  wheelRear: {
    position: 'absolute',
    left: '65px',
    bottom: '15px',
    width: '60px',
    height: '60px',
    backgroundColor: '#2c3e50',
    borderRadius: '50%',
    border: '8px solid #34495e',
    zIndex: 15,
    transformOrigin: 'center',
  },
  trailerWheel: {
    position: 'absolute',
    left: '435px',
    bottom: '15px',
    width: '60px',
    height: '60px',
    backgroundColor: '#2c3e50',
    borderRadius: '50%',
    border: '8px solid #34495e',
    zIndex: 15,
    transformOrigin: 'center',
  },
  trailerWheel2: {
    position: 'absolute',
    left: '635px',
    bottom: '15px',
    width: '60px',
    height: '60px',
    backgroundColor: '#2c3e50',
    borderRadius: '50%',
    border: '8px solid #34495e',
    zIndex: 15,
    transformOrigin: 'center',
  },
  road: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '80px',
    backgroundColor: '#34495e',
  },
  roadLines: {
    position: 'absolute',
    top: '50%',
    left: '0',
    width: '100%',
    height: '4px',
    background: 'repeating-linear-gradient(to right, #f1c40f, #f1c40f 40px, transparent 40px, transparent 80px)',
    transform: 'translateY(-50%)',
  },
};

export default NotFoundPage;