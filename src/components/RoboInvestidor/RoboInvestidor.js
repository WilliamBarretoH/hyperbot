import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RoboInvestidor.module.css';
import MainContainer from '../MainContainer/MainContainer';
import HeaderUser from '../HeaderUser/HeaderUser'
import Grafico from '../Grafico/Grafico';
import OnRoboInvestidor from '../OnRoboInvestidor/OnRoboInvestidor';

const RoboInvestidor = () => {

  const [saldo, setSaldo] = useState(100.00); // Estado para o saldo
  const [limiteGanhoDiario, setLimiteGanhoDiario] = useState(500.00);

  return (
    <>
    <MainContainer>
    <HeaderUser saldo={saldo} limiteGanhoDiario={limiteGanhoDiario} />
      <OnRoboInvestidor />
    <div className="container mt-5">
      <Grafico />
    </div>
    </MainContainer>
    </>
  );
};

export default RoboInvestidor;