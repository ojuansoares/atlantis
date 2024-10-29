import React from "react";
import "../../styles/bg6.css";
import "../../index.css";

export default function ListaDependentesTitular() {
    const renderDependente = (nome, cpf, id) => {
        return (
            <a 
                key={id} 
                href={`/dependente/${id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {nome} | {cpf}
            </a>
        );
    };

    const renderTitular = (nome, cpf, dependentes, id) => {
        return (
            <div>
                <div className="d-flex flex-column">
                <strong>Titular:</strong>
                <div className="list-group  mt-2 mb-2">
                    <a 
                        href={`/titular/${id}`} 
                        className="list-group-item list-group-item-action d-flex justify-content-between"
                    >
                        {nome} | {cpf}
                    </a>
                </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Dependentes:</strong>
                    <div className="list-group mt-2">
                        {dependentes.map((dependente) => (
                            renderDependente(dependente.nome, dependente.cpf, dependente.id)
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="bg6"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Dependentes por Titular</h2>
                <hr></hr>
                
                    {renderTitular("Joaozinho", "8765432", [{ id: 1, nome: "Sheila", cpf: "1245654321" }], 1)}

                    <hr></hr>

                    {renderTitular("Paulinho", "1234567", [{ id: 2, nome: "Marcos", cpf: "2345678901" }, { id: 3, nome: "Talita", cpf: "3456789012" }], 2)}

                    <hr></hr>

                    {renderTitular("Pedrinho", "2345678", [{ id: 4, nome: "Renato", cpf: "4567890123" }], 3)}
                
            </div>
        </div>
    );
}
