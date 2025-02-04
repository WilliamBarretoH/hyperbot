import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoR from "../../assets/logo-r-home.svg";
import robotIcon from "../../assets/robo-home.svg";
import dolar from "../../assets/dolar-home.svg";
import cemReais from "../../assets/box-cem-reais-home.svg";
import CadastroPopup from "../CadstroPopup/CadstroPopup";
import HeaderUser from "../HeaderUser/HeaderUser";
import MainContainer from "../MainContainer/MainContainer";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [saldo, setSaldo] = useState(100);
  const [limiteGanhoDiario, setLimiteGanhoDiario] = useState(500.0);
  const [formData, setFormData] = useState({ nome: "", telefone: "" });
  const [errors, setErrors] = useState({ nome: "", telefone: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Remove o erro ao digitar
  
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    if (!formData.nome.trim()) {
      validationErrors.nome = "O nome não pode estar vazio.";
    }
    if (!formData.telefone.trim()) {
      validationErrors.telefone = "O telefone não pode estar vazio.";
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("userData", JSON.stringify(formData));
    localStorage.setItem("userSaldo", JSON.stringify(saldo))
    setIsPopupOpen(true);
  };

  return (
    <>
      <MainContainer>
        <HeaderUser limiteGanhoDiario={limiteGanhoDiario} />

        <main className="text-center">
          <h2 className="text-dark">
            Você recebeu um Link de convite com saldo inicial <span className="text-warning fw-bold">de até R$100,00</span>
          </h2>
          <p className="text-secondary">
            Faça uma <strong>renda extra</strong> de casa utilizando somente nosso <span className="fw-bold">ROBÔ INVESTIDOR</span>
          </p>

          <div className={styles.imageContainer}>
            <img src={robotIcon} alt="Robô" className={styles.leftImage} />
            <img src={cemReais} alt="R$ 100,00" className={styles.valueBox} width={550} height={250} />
            <img src={dolar} alt="Emoji Dinheiro" className={styles.rightImage} />
          </div>

          <p className="text-warning">
            Você pode receber uma comissão <span className="text-warning fw-bold">de até R$ 500,00</span> após <span className="text-warning fw-bold">realizar o cadastro</span>
          </p>

          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}

            <input
              type="tel"
              className={`form-control ${errors.telefone ? "is-invalid" : ""}`}
              placeholder="Número de Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
            {errors.telefone && <div className="invalid-feedback">{errors.telefone}</div>}

            <button className="btn btn-warning w-100 fw-bold text-white" type="submit">
              USAR ROBÔ INVESTIDOR
            </button>
          </form>

          <p className="text-center text-muted mt-3 small">
            © Seus dados estão seguros, nada disso será compartilhado.
          </p>
        </main>

        {isPopupOpen && (
          <CadastroPopup
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
            nome={formData.nome}
            saldo={saldo}
          />
        )}
      </MainContainer>
    </>
  );
};

export default Home;
