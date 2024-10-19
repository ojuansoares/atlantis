import React from "react";
import "../../styles/bg7.css";
import "../../index.css";

export default function ListaTitularDependentes() {
    const renderTitular = (nome, cpf, id) => {
        return (
            <a 
                key={id} 
                href={`/titular/${id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {nome} | {cpf}
            </a>
        );
    };

    const renderDependente = (nome, cpf, titular, id) => {
        return (
            <>
                <div>
                    <div className="d-flex flex-column"></div>
                    <strong>Dependente:</strong>
                    <div className="list-group mt-2 mb-2">
                        <a
                            href={`/dependente/${id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                            {nome} | {cpf}
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Titular:</strong>
                    <div className="list-group mt-2">
                        {renderTitular(titular.nome, titular.cpf, titular.id)}
                    </div>
                </div>
            </>
        );
    };

    return (
        <div>
            <div className="bg7"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Titulares por Dependente</h2>
                <hr></hr>
                
                {renderDependente("Sheila", "1245654321", { id: 1, nome: "Joaozinho", cpf: "8765432" }, 1)}

                <hr></hr>

                {renderDependente("Marcos", "2345678901", { id: 2, nome: "Paulinho", cpf: "1234567" }, 2)}

                <hr></hr>

                {renderDependente("Talita", "3456789012", { id: 2, nome: "Paulinho", cpf: "1234567" }, 3)}

                <hr></hr>

                {renderDependente("Renato", "4567890123", { id: 3, nome: "Pedrinho", cpf: "2345678" }, 4)}
                
            </div>
        </div>
    );
}
