import React from "react";
import "../../styles/bg3.css";
import "../../index.css";

export default function ListaHospedesAcomodacao() {
    const renderHospede = (nome, cpf, id, tipo) => {
        return (
            <a 
                key={id} 
                href={`/${tipo.toLowerCase()}/${id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {nome} | {cpf}
            </a>
        );
    };

    const renderAcomodacao = (nomeAcomodacao, hospedes, id) => {
        return (
            <div key={id}>
                <div className="d-flex flex-column">
                    <strong>Acomodação:</strong>
                    <div className="list-group mt-2 mb-2">
                        <div className="list-group-item list-group-item-action d-flex justify-content-between">
                            {nomeAcomodacao}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Hóspedes:</strong>
                    <div className="list-group mt-2">
                        {hospedes.map((hospede) => (
                            renderHospede(hospede.nome, hospede.cpf, hospede.id, hospede.tipo)
                        ))}
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    };

    return (
        <div>
            <div className="bg3"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Hóspedes por Acomodação</h2>
                <hr></hr>
                
                {renderAcomodacao("Acomodação simples para casal", [{ id: 1, nome: "Carlos", cpf: "1234567890", tipo: "Titular" }], 1)}

                {renderAcomodacao("Acomodação para família com até duas crianças", [{ id: 2, nome: "Ana", cpf: "2345678901", tipo: "Titular" }, { id: 3, nome: "Bia", cpf: "3456789012", tipo: "Dependente" }], 2)}

                {renderAcomodacao("Acomodação para família com até cinco crianças", [{ id: 4, nome: "Pedro", cpf: "4567890123", tipo: "Titular" }], 3)}

                {renderAcomodacao("Acomodação para até duas famílias, casal e três crianças cada", [{ id: 5, nome: "João", cpf: "5678901234", tipo: "Titular" }, { id: 6, nome: "Maria", cpf: "6789012345", tipo: "Dependente" }], 4)}

                {renderAcomodacao("Acomodação simples para solteiro(a)", [{ id: 7, nome: "Lucas", cpf: "7890123456", tipo: "Titular" }], 5)}

                {renderAcomodacao("Acomodação com garagem para solteiro(a)", [{ id: 8, nome: "Fernanda", cpf: "8901234567", tipo: "Titular" }], 6)}
                
            </div>
        </div>
    );
}
