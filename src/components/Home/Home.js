import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoR from "../../assets/logo-r-home.svg";
import robotIcon from "../../assets/robo-home.svg";
import dolar from "../../assets/dolar-home.svg";
import cemReais from "../../assets/box-cem-reais-home.svg";

const Home = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className={`col-12 col-md-6 p-4 position-relative ${styles.homeContainer}`}>
        
        <header className="d-flex justify-content-between align-items-center mb-3">
          <div className={styles.logo}>
            <img src={LogoR} alt="Logo" width={50} height={50}/>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold">R$ 0,00</span>
            <button className="btn btn-warning">RETIRAR</button>
          </div>
        </header>

        <main className="text-center">
          <h2 className="text-dark">
            Você recebeu um Link de convite com saldo inicial <span className="text-warning fw-bold">de até R$100,00</span>
          </h2>
          <p className="text-secondary">
            Faça uma <strong>renda extra</strong> de casa utilizando somente nosso <span className="fw-bold">ROBÔ INVESTIDOR</span>
          </p>

          {/* Container das imagens */}
          <div className={styles.imageContainer}>
            <img src={robotIcon} alt="Robô" className={styles.leftImage} />
            <img src={cemReais} alt="R$ 100,00" className={styles.valueBox} width={250} height={250}/>
            <img src={dolar} alt="Emoji Dinheiro" className={styles.rightImage} />
          </div>

          <p className=" text-warning">
            Você pode receber uma comissão <span className="text-warning fw-bold">de até R$ 500,00</span> após <span className="text-warning fw-bold">realizar o cadastro</span>
          </p>

          <form className="d-flex flex-column gap-3">
            <input type="text" className="form-control" placeholder="Nome completo" />
            <input type="tel" className="form-control" placeholder="Número de Telefone" />
            <button className="btn btn-warning w-100 fw-bold">USAR ROBÔ INVESTIDOR</button>
          </form>

          <p className="text-center text-muted mt-3 small">
            © Seus dados estão seguros, nada disso será compartilhado.
          </p>
        </main>
      </div>
    </div>
  );
};

export default Home;
