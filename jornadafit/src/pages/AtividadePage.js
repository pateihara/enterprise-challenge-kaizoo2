import React, { useState } from "react";
import Layout from "../components/Layout";
import "./AtividadePage.css";
import KaizooButton from "../components/KaizooButton";
import KaizooCard from "../components/KaizooCard";
import { useNavigate } from "react-router-dom";

import alongamentoIcon from "../img/personIcon.png";
import walkIcon from "../img/walkIcon.png";
import runIcon from "../img/walkIcon.png";
import bikeIcon from "../img/bikeIcon.png";
import yogaIcon from "../img/personIcon.png";
import outroIcon from "../img/personIcon.png";
import successMascots from "../img/successMascots.png";

const camposPadrao = ["Data", "Duração", "Intensidade", "Nota de bom humor"];
const opcoesEspecificas = {
  Alongamento: ["Tipo de prática", "Foco Corporal", "Ambiente"],
  Yoga: ["Tipo de prática", "Foco Corporal", "Ambiente"],
  Caminhada: ["Distância em km", "Passos", "Ritmo", "Local"],
  Corrida: ["Distância em km", "Passos", "Ritmo", "Local"],
  Pedalada: ["Distância em km", "Altimetria", "Tipo de pedal", "Equipamento"],
  Outro: ["Nome da Atividade", "Observações"],
};

const icones = {
  Alongamento: alongamentoIcon,
  Yoga: yogaIcon,
  Caminhada: walkIcon,
  Corrida: runIcon,
  Pedalada: bikeIcon,
  Outro: outroIcon,
};

export default function AtividadePage() {
  const navigate = useNavigate();
  const [atividadeSelecionada, setAtividadeSelecionada] = useState("");
  const [passoAtual, setPassoAtual] = useState(1);
  const [amigosAdicionados, setAmigosAdicionados] = useState([]);
  const [busca, setBusca] = useState("");
  const [atividadeRegistrada, setAtividadeRegistrada] = useState(false);

  const mascote = JSON.parse(localStorage.getItem("kaizoo"));

  const atividades = [
    "Alongamento",
    "Yoga",
    "Caminhada",
    "Corrida",
    "Pedalada",
    "Outro",
  ];

  const amigosFakes = [
    { id: 1, nome: "Kaia", avatar: require("../img/kaia.png") },
    { id: 2, nome: "Koa", avatar: require("../img/koa.png") },
    { id: 3, nome: "Dino", avatar: require("../img/dino.png") },
    { id: 4, nome: "Penny", avatar: require("../img/penny.png") },
  ];

  const camposEspecificos = atividadeSelecionada
    ? opcoesEspecificas[atividadeSelecionada]
    : [];

  return (
    <Layout>
      {atividadeRegistrada ? (
        <div className="atividade-finalizada">
          <div className="card-final">
            <img
              src={successMascots}
              alt="Todos os mascotes do Kaizoo juntos sorrindo e celebrando"
              style={{ maxWidth: "300px" }}
            />
            <h2>
              Atividade Registrada
              <br />
              com Sucesso!
            </h2>
            <div className="botoes-navegacao" style={{ marginTop: "1.5rem" }}>
              <KaizooButton type="dark" onClick={() => navigate("/home")}>
                Página Inicial
              </KaizooButton>
              <KaizooButton
                type="highlight"
                onClick={() => {
                  setAtividadeSelecionada("");
                  setPassoAtual(1);
                  setAmigosAdicionados([]);
                  setBusca("");
                  setAtividadeRegistrada(false);
                }}
              >
                Registrar Nova Atividade
              </KaizooButton>
            </div>
          </div>
        </div>
      ) : (
        <div className="atividade-container-duas-colunas">
          <div className="atividade-esquerda">
            <h2 className="titulo">Registrar Atividade</h2>

            <div className="passos">
              <span className={`passo ${passoAtual === 1 ? "ativo" : ""}`}>
                Passo 01
              </span>
              <span className="seta">→</span>
              <span className={`passo ${passoAtual === 2 ? "ativo" : ""}`}>
                Passo 02
              </span>
              <span className="seta">→</span>
              <span className={`passo ${passoAtual === 3 ? "ativo" : ""}`}>
                Passo 03
              </span>
            </div>

            <div className="atividade-card">
              {passoAtual === 1 && (
                <>
                  <strong>Escolha a Atividade</strong>
                  <div className="atividade-botoes">
                    {atividades.map((atv) => (
                      <button
                        key={atv}
                        className={`botao-atividade ${
                          atividadeSelecionada === atv ? "selecionado" : ""
                        }`}
                        onClick={() => {
                          setAtividadeSelecionada(atv);
                          setPassoAtual(2);
                        }}
                      >
                        <img
                          src={icones[atv]}
                          alt={
                            atv === "Alongamento"
                              ? "Ícone de pessoa representando alongamento"
                              : atv === "Yoga"
                              ? "Ícone de pessoa representando prática de yoga"
                              : atv === "Caminhada"
                              ? "Ícone de pessoa caminhando, representando atividade de caminhada"
                              : atv === "Corrida"
                              ? "Ícone de pessoa caminhando, representando atividade de corrida"
                              : atv === "Pedalada"
                              ? "Ícone de bicicleta, representando atividade de pedalada"
                              : "Ícone de pessoa representando uma atividade personalizada"
                          }
                          className="atividade-icon"
                        />
                        {atv}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {passoAtual === 2 && atividadeSelecionada && (
                <>
                  <h4 style={{ marginBottom: "1rem" }}>
                    Atividade selecionada:{" "}
                    <strong>{atividadeSelecionada}</strong>
                  </h4>

                  <div className="grupo-campos">
                    <strong>Dados Padrão</strong>
                    <div className="campos">
                      {camposPadrao.map((campo) => (
                        <div className="campo" key={campo}>
                          <label>{campo}</label>
                          <input
                            type="text"
                            placeholder={campo}
                            className="campo-input"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grupo-campos">
                    <strong>Dados Específicos</strong>
                    <div className="campos">
                      {camposEspecificos.map((campo) => (
                        <div className="campo" key={campo}>
                          <label>{campo}</label>
                          <input
                            type="text"
                            placeholder={campo}
                            className="campo-input"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {passoAtual === 3 && (
                <>
                  <strong>Adicionar Amigos</strong>
                  <div className="campo">
                    <input
                      type="text"
                      placeholder="Buscar por username"
                      className="campo-input"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                    />
                  </div>

                  {busca && (
                    <div className="sugestoes">
                      {amigosFakes
                        .filter(
                          (a) =>
                            a.nome
                              .toLowerCase()
                              .includes(busca.toLowerCase()) &&
                            !amigosAdicionados.some(
                              (added) => added.id === a.id
                            )
                        )
                        .map((amigo) => (
                          <div
                            key={amigo.id}
                            className="sugestao-item"
                            onClick={() => {
                              setAmigosAdicionados([
                                ...amigosAdicionados,
                                amigo,
                              ]);
                              setBusca("");
                            }}
                          >
                            <img
                              src={amigo.avatar}
                              alt={`Avatar do mascote ${amigo.nome}`}
                              className="sugestao-avatar"
                            />
                            {amigo.nome}
                          </div>
                        ))}
                    </div>
                  )}

                  {amigosAdicionados.length > 0 && (
                    <div style={{ marginTop: "1rem" }}>
                      <strong>Adicionados:</strong>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        {amigosAdicionados.map((amigo) => (
                          <img
                            key={amigo.id}
                            src={amigo.avatar}
                            alt={`Avatar do mascote ${amigo.nome}`}
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <div className="botoes-navegacao">
                {passoAtual > 1 && (
                  <KaizooButton
                    type="dark"
                    onClick={() => setPassoAtual(passoAtual - 1)}
                  >
                    Voltar
                  </KaizooButton>
                )}
                {passoAtual < 3 && atividadeSelecionada && (
                  <KaizooButton
                    type="dark"
                    onClick={() => setPassoAtual(passoAtual + 1)}
                  >
                    Próximo
                  </KaizooButton>
                )}
                {passoAtual === 3 && (
                  <KaizooButton
                    type="highlight"
                    onClick={() => setAtividadeRegistrada(true)}
                  >
                    Registrar Atividade
                  </KaizooButton>
                )}
              </div>
            </div>
          </div>

          <div className="atividade-direita">
            {mascote && (
              <KaizooCard
                imagem={mascote.front}
                nivel={5}
                xpRestante="325XP"
                nome={mascote.nome}
                subtitulo={mascote.subtitulo}
              />
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}
