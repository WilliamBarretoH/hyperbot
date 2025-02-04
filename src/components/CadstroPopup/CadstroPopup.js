import React, { useEffect, useState, useRef } from "react";
import styles from "./CadstroPopup.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ConfettiEffect from "../Confete/Confete";

const CadastroPopup = ({ isOpen, onClose, saldo }) => {
  const [animatedSaldo, setAnimatedSaldo] = useState(0);
  const confettiTimer = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      let start = 0;
      const end = saldo;
      const duration = 2000;
      const stepTime = duration / end;

      // Inicia a animação do saldo
      const saldoTimer = setInterval(() => {
        start += 1;
        setAnimatedSaldo(start);
        if (start >= end) clearInterval(saldoTimer);
      }, stepTime);

      // Programa o desligamento do confete
      confettiTimer.current = setTimeout(() => {
        if (window.confetti) {
          window.confetti.stop();
          window.confetti.remove();
        }
      }, 3000);

      return () => {
        clearInterval(saldoTimer);
        clearTimeout(confettiTimer.current);
        if (window.confetti) {
          window.confetti.stop();
          window.confetti.remove();
        }
      };
    }
  }, [isOpen, saldo]);

  const handleContinue = () => {
    onClose();
    navigate("/robo");
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} d-flex align-items-center justify-content-center`}>
      {isOpen} {/* Key força recriação */}
      
      <div className={`${styles.popup} p-4 text-center`}>
        <h2 className="text-success fw-bold">CADASTRO REALIZADO</h2>
        <p className="text-success display-1 fw-bold" style={{ fontSize: "3.5rem" }}>
          R$ {animatedSaldo},00
        </p>
        <p className="text-dark fs-4">Foram creditados em sua conta</p>
        <p className="text-dark fw-bold mt-3 fs-5">
          Use o nosso robô para ganhar ainda mais
        </p>
        <button
          className={`btn btn-success w-100 fw-bold mt-4 ${styles.pulseButton}`}
          style={{
            padding: "15px",
            fontSize: "1.3rem",
            borderRadius: "30px",
            backgroundColor: "#58b586",
            border: "none",
          }}
          onClick={handleContinue}
        >
          CONTINUAR GANHANDO
        </button>
      </div>
    </div>
  );
};

export default CadastroPopup;