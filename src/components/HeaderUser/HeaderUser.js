import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./HeaderUser.module.css";
import LogoR from "../../assets/logo-r-home.svg";

const HeaderUser = ({ limiteGanhoDiario }) => {
  const [userData, setUserData] = useState(null);
  const [saldo, setSaldo] = useState(0);

  useEffect(() => {
    // Pega os dados do localStorage (nome do usuário)
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    // Pega o saldo do sessionStorage
    const storedSaldo = localStorage.getItem("userSaldo");
    if (storedSaldo) {
      setSaldo(parseFloat(storedSaldo));
    }
  }, []);

  return (
    <header className={`${styles.header} d-flex justify-content-between align-items-center`}>
      <div className="d-flex align-items-center gap-3">
        <img src={LogoR} alt="Logo" width={50} height={50} />
        <div className={styles.userInfo}>
          <h6 className="mb-0">{userData?.nome || "Usuário"}</h6>
          <span className={styles.limiteGanhoDiario}>
            Limite de ganho diário: <strong>R$ {limiteGanhoDiario.toFixed(2)}</strong>
          </span>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end">
        <div className="d-flex align-items-center gap-2">
          {/* <img src="" alt="Bandeira do Brasil" width={24} height={24} /> */}
          <div className={styles.saldo}>
            <strong>R$ {saldo.toFixed(2)}</strong>
          </div>
          <button className={styles.retirarBtn}>RETIRAR</button>
        </div>
      </div>
    </header>
  );
};

HeaderUser.propTypes = {
  limiteGanhoDiario: PropTypes.number.isRequired,
};

export default HeaderUser;
