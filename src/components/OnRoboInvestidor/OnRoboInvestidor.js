import React, { useState } from 'react';
import styles from './OnRoboInvestidor.module.css';
import Grafico from '../Grafico/Grafico';

const OnRoboInvestidor = () => {
  const [roboLigado, setRoboLigado] = useState(false);

  const handleLigarRobo = () => {
    setRoboLigado(true);
    // Lógica para iniciar o robô aqui
  };

  return (
    <div className={styles.container}>
      <div className="text-center mb-4">
        <h5 className="text-dark mb-3">
          Clique no botão "Ligar robô" para começar a receber comissões
        </h5>
        <p className="text-muted">
          É muito simples, basta clicar e aguardar até o resultado ser mostrado na sua tela
        </p>
      </div>

      <div className={styles.circleContainer}>
        <div className={styles.circleBorder}>
          <button 
            className={`${styles.circleButton} ${roboLigado ? styles.active : ''}`}
            onClick={handleLigarRobo}
            disabled={roboLigado}
          >
            {roboLigado ? 'ROBO LIGADO' : 'LIGAR ROBO'}
          </button>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className={styles.estimativa}>
          Estimativa de ganho: <span>R$85,55</span>
        </p>
      </div>

      {roboLigado && <Grafico />}
    </div>
  );
};

export default OnRoboInvestidor;