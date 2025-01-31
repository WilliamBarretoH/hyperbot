import React from "react";
import styles from "./CadstroPopup.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CadastroPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} d-flex align-items-center justify-content-center`}>
      <div className={`${styles.popup} p-4 text-center`}>
        <h2 className="text-success fw-bold">CADASTRO REALIZADO</h2>
        <p className="text-success display-4 fw-bold">R$ 100,00</p>
        <p className="text-dark small">Foram creditados em sua conta</p>
        <p className="text-dark fw-bold mt-3">Use o nosso robô para ganhar ainda mais</p>
        <button className="btn btn-success w-100 fw-bold mt-4" onClick={onClose}>
          CONTINUAR GANHANDO
        </button>
      </div>
    </div>
  );
};

export default CadastroPopup;
