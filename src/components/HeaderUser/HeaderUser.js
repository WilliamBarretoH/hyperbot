import React from 'react';
import PropTypes from 'prop-types';
import styles from './HeaderUser.module.css';
import LogoR from "../../assets/logo-r-home.svg";

const HeaderUser = ({ saldo, limiteGanhoDiario }) => (
  <header className="d-flex justify-content-between align-items-center mb-3">
    <div className={styles.logo}>
      <img src={LogoR} alt="Logo" width={50} height={50} />
    </div>
    <div className="d-flex flex-column align-items-end gap-1">
      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold">R$ {saldo.toFixed(2)}</span>
        <button className="btn btn-warning">RETIRAR</button>
      </div>
      <span className={`${styles.limiteGanhoDiario} text-muted`}>
        Limite de ganho diario: R$ {limiteGanhoDiario.toFixed(2)}
      </span>
    </div>
  </header>
);

HeaderUser.propTypes = {
  saldo: PropTypes.number.isRequired,
  limiteGanhoDiario: PropTypes.number.isRequired,
};

HeaderUser.defaultProps = {};

export default HeaderUser;