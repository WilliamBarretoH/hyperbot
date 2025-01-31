import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Grafico.module.css';

const Grafico = () => {
  // Estados
  const [isRunning, setIsRunning] = useState(false);
  const [candles, setCandles] = useState([]);
  const [currentCandle, setCurrentCandle] = useState(null);
  const [lucro, setLucro] = useState(10);
  const [tempo, setTempo] = useState(10);
  const [lucroTravado, setLucroTravado] = useState(false);
  const [lastClose, setLastClose] = useState(20);
  const [showPopup, setShowPopup] = useState(false);

  // Refs
  const animationRef = useRef();
  const tempoRef = useRef(10);
  const candleStartTimeRef = useRef(0);
  const candleDurationRef = useRef(0);

  // Constantes
  const chartW = 220;
  const chartH = 150;
  const candleWidth = 10;
  const candleSpace = 4;
  const priceMin = 15;
  const priceMax = 30;

  // Função para escalonar preço para coordenadas SVG
  const scalePrice = useCallback((price) => {
    const range = priceMax - priceMin;
    const perc = (price - priceMin) / range;
    return (1 - perc) * chartH;
  }, [priceMin, priceMax]);

  // Criar novo candle
  const criarCandle = useCallback(() => ({
    open: lastClose,
    close: lastClose,
    high: lastClose,
    low: lastClose
  }), [lastClose]);

  // Iniciar operação
  const startBot = () => {
    if (!isRunning) {
      setIsRunning(true);
      setCandles([]);
      setCurrentCandle(criarCandle());
      setLucroTravado(false);
      setShowPopup(false);
      setTempo(10);
      tempoRef.current = 10;
      candleStartTimeRef.current = performance.now();
      candleDurationRef.current = Math.random() * 2000 + 2000; // 2-4 segundos
    }
  };

  // Loop principal de animação
  const animate = useCallback((timestamp) => {
    if (!isRunning) return;

    // Atualizar candle atual
    if (currentCandle && !lucroTravado) {
      const elapsed = timestamp - candleStartTimeRef.current;
      
      if (elapsed >= candleDurationRef.current) {
        // Finalizar candle
        const newCandle = { ...currentCandle };
        setLastClose(newCandle.close);
        setCandles(prev => [...prev, newCandle]);
        setCurrentCandle(criarCandle());
        candleStartTimeRef.current = timestamp;
        candleDurationRef.current = Math.random() * 2000 + 2000;
      } else {
        // Atualizar valores do candle
        const variation = (Math.random() - 0.5) * 0.4;
        const newClose = currentCandle.close + variation;
        const newCandle = {
          open: currentCandle.open,
          close: Math.min(Math.max(newClose, priceMin), priceMax),
          high: Math.max(currentCandle.high, newClose),
          low: Math.min(currentCandle.low, newClose)
        };
        
        // Atualizar lucro
        setLucro(prev => {
          const newLucro = prev + (newClose >= currentCandle.open ? 0.02 : -0.02);
          return Math.max(newLucro, 0);
        });

        setCurrentCandle(newCandle);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isRunning, currentCandle, lucroTravado, criarCandle, priceMin, priceMax]);

  // Efeito para controle de animação
  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isRunning, animate]);

  // Controle do temporizador
  useEffect(() => {
    let interval;
    if (isRunning && tempo > 0) {
      interval = setInterval(() => {
        setTempo(prev => {
          if (prev <= 1) {
            setLucroTravado(true);
            setShowPopup(true);
            setIsRunning(false);
          }
          return prev > 0 ? prev - 1 : 0;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tempo]);

  // Renderizar candles
  const renderCandles = () => {
    return [...candles, currentCandle].map((candle, index) => {
      if (!candle) return null;

      const bull = candle.close >= candle.open;
      const x = 10 + index * (candleWidth + candleSpace);
      
      return (
        <g key={index}>
          <line // Wick
            x1={x + candleWidth/2}
            x2={x + candleWidth/2}
            y1={scalePrice(candle.high)}
            y2={scalePrice(candle.low)}
            stroke={bull ? '#00b894' : '#d63031'}
            strokeWidth="1.5"
          />
          <rect // Body
            x={x}
            y={scalePrice(Math.max(candle.open, candle.close))}
            width={candleWidth}
            height={Math.abs(scalePrice(candle.open) - scalePrice(candle.close))}
            fill={bull ? '#00b894' : '#d63031'}
          />
        </g>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.graficoContainer}>
        <svg viewBox={`0 0 ${chartW} ${chartH}`}>
          <defs>
            <pattern id="gridPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#ddd"/>
              <path d="M0 0H20" stroke="#bbb" strokeWidth="1"/>
              <path d="M0 0V20" stroke="#bbb" strokeWidth="1"/>
            </pattern>
          </defs>
          
          <rect width={chartW} height={chartH} fill="url(#gridPattern)" />
          {renderCandles()}
        </svg>

        {showPopup && (
          <div className={styles.popup}>
            RESULTADO (P/L)
            <br />
            +R$ {lucro.toFixed(2)}
          </div>
        )}
      </div>

      <div className={styles.controls}>
        <div className={styles.info}>
          <p>Lucro: R$ {lucro.toFixed(2)}</p>
          <p>Tempo: {tempo}s</p>
        </div>
        <button 
          className={styles.botao}
          onClick={startBot}
          disabled={isRunning}
        >
          {isRunning ? 'OPERANDO...' : 'LIGAR ROBÔ'}
        </button>
      </div>
    </div>
  );
};

export default Grafico;