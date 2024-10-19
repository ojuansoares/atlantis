import React from "react";
import "../../styles/bg14.css";
import "../../index.css";

export default function ListaAcomodacoes() {
    const acomodacoes = [
        {
            nomenclatura: "Acomodação simples para casal",
            leitosSolteiros: 0,
            leitosCasais: 1,
            climatizacao: "sim",
            garagens: 1,
            suites: 1
        },
        {
            nomenclatura: "Acomodação para família com até duas crianças",
            leitosSolteiros: 2,
            leitosCasais: 1,
            climatizacao: "sim",
            garagens: 1,
            suites: 1
        },
        {
            nomenclatura: "Acomodação para família com até cinco crianças",
            leitosSolteiros: 5,
            leitosCasais: 1,
            climatizacao: "sim",
            garagens: 2,
            suites: 2
        },
        {
            nomenclatura: "Acomodação para até duas famílias, casal e três crianças cada",
            leitosSolteiros: 6,
            leitosCasais: 2,
            climatizacao: "sim",
            garagens: 2,
            suites: 3
        },
        {
            nomenclatura: "Acomodação simples para solteiro(a)",
            leitosSolteiros: 1,
            leitosCasais: 0,
            climatizacao: "sim",
            garagens: 0,
            suites: 1
        },
        {
            nomenclatura: "Acomodação com garagem para solteiro(a)",
            leitosSolteiros: 0,
            leitosCasais: 1,
            climatizacao: "sim",
            garagens: 1,
            suites: 1
        }
    ];

    const renderAcomodacao = (acomodacao) => {
        return (
            <div className="list-group-item list-group-item-action d-flex justify-content-between" key={acomodacao.nomenclatura}>
                <div>
                    <p><strong>Nomenclatura:</strong> <span className="item-text">{acomodacao.nomenclatura}</span></p>
                    <p><strong>Quantidade de leitos para solteiros:</strong> <span className="quantidade-text">{acomodacao.leitosSolteiros}</span></p>
                    <p><strong>Quantidade de leitos para casais:</strong> <span className="quantidade-text">{acomodacao.leitosCasais}</span></p>
                    <p><strong>Climatização:</strong> <span className="quantidade-text">{acomodacao.climatizacao}</span></p>
                    <p><strong>Quantidade de garagens disponíveis:</strong> <span className="quantidade-text">{acomodacao.garagens}</span></p>
                    <p><strong>Quantidade de suites:</strong> <span className="quantidade-text">{acomodacao.suites}</span></p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="bg14"></div>
            <div className="container-fluid fundo-escuro">
                <div className="list-group">
                    <h2>Listagem das acomodações ofertadas:</h2>
                    <hr></hr>
                    {acomodacoes.map(acomodacao => renderAcomodacao(acomodacao))}
                </div>
            </div>
        </div>
    );
}
