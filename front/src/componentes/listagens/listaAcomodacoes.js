import React, { useEffect, useState } from "react";
import "../../styles/bg9.css";
import "../../index.css";

export default function ListaAcomodacoes() {
    const [acomodacoes, setAcomodacoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/acomodacoes/listar-acomodacoes')
            .then(response => response.json())
            .then(data => setAcomodacoes(data))
            .catch(error => console.error('Erro ao obter acomodações:', error));
    }, []);

    const renderAcomodacao = (acomodacao) => {
        return (
            <div className="list-group-item list-group-item-action d-flex justify-content-between" key={acomodacao.id}>
                <div>
                    <p><strong>Nome:</strong> <span className="item-text">{acomodacao.nome}</span></p>
                    <p><strong>Descrição:</strong> <span className="item-text">{acomodacao.descricao}</span></p>
                    <p><strong>Limite de Acomodados:</strong> <span className="quantidade-text">{acomodacao.limite_acomodados}</span></p>
                    <p><strong>Quantidade de leitos para solteiros:</strong> <span className="quantidade-text">{acomodacao.leitosSolteiros}</span></p>
                    <p><strong>Quantidade de leitos para casais:</strong> <span className="quantidade-text">{acomodacao.leitosCasais}</span></p>
                    <p><strong>Climatização:</strong> <span className="quantidade-text">{acomodacao.climatizacao ? 'Sim' : 'Não'}</span></p>
                    <p><strong>Quantidade de garagens disponíveis:</strong> <span className="quantidade-text">{acomodacao.garagens}</span></p>
                    <p><strong>Quantidade de suítes:</strong> <span className="quantidade-text">{acomodacao.suites}</span></p>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="bg9"></div>
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
