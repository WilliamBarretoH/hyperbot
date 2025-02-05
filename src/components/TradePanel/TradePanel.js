import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Chart from "chart.js/auto";

const TradePanel = () => {
  const [profit, setProfit] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTrading, setIsTrading] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Lucro (R$)",
              borderColor: "#4caf50",
              backgroundColor: "rgba(76, 175, 80, 0.5)",
              data: [],
              fill: true,
            },
          ],
        },
        options: {
          scales: { y: { beginAtZero: true } },
        },
      });
    }
  }, []);

  const startTrade = () => {
    setIsTrading(true);
    setTimeLeft(15);
    setProfit(0);

    let currentProfit = 0;
    let timeElapsed = 0;

    if (chartInstance.current) {
      chartInstance.current.data.labels = [];
      chartInstance.current.data.datasets[0].data = [];
      chartInstance.current.update();
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTrading(false);
          setProfit(80.4)
          return 0;
        }
        return prev - 1;
      });

      const variation = (Math.random() - 0.5) * 30; // Varia entre -5 e +5
      currentProfit = Math.max(0, currentProfit + variation); // Garante que não fique negativo
      setProfit(currentProfit);

      // Atualizar o gráfico
      if (chartInstance.current) {
        const chart = chartInstance.current;
        chart.data.labels.push(timeElapsed.toString());
        chart.data.datasets[0].data.push(currentProfit);
        chart.update();
      }
    }, 1000);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="p-4 text-center shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex align-items-center justify-content-center mb-3">
          <span>APPLE LTDA.</span>
        </div>
        <canvas
          ref={chartRef}
          className="mb-3"
          style={{ height: "200px" }}
        ></canvas>
        <Row className="mb-3">
          <Col className="bg-light p-2 rounded">
            <h6 className="text-muted">Lucro</h6>
            <p className="fw-bold">R$ {profit.toFixed(2)}</p>
          </Col>
          <Col className="bg-light p-2 rounded">
            <h6 className="text-muted">Tempo</h6>
            <p className="fw-bold">{timeLeft}s</p>
          </Col>
        </Row>
        <Button
          variant="warning"
          className="w-100 fw-bold text-uppercase"
          onClick={startTrade}
          disabled={isTrading}
        >
          {isTrading ? "ROBÔ OPERANDO..." : "Ligar Robô"}
        </Button>
      </Card>
    </div>
  );
};

export default TradePanel;
