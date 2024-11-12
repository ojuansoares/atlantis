import React, { useEffect, useState } from "react";
import "../../styles/bg6.css";
import "../../index.css";

export default function ListaDependentesTitular() {
    const [titulares, setTitulares] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/clientes/dependentes-por-titular')
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => setTitulares(data))
            .catch(error => console.error('Erro ao obter titulares com dependentes:', error));
    }, []);

    const getCpf = (documentos) => {
        const cpfDoc = documentos.find(doc => doc.tipo_documento === "CPF");
        return cpfDoc ? formatarCPF(cpfDoc.numero_documento) : "CPF não encontrado";
    };

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const renderDependente = (dependente) => {
        return (
            <a 
                key={dependente.id} 
                href={`/cliente/${dependente.id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {dependente.nome} | {getCpf(dependente.documentos)}
            </a>
        );
    };

    const renderTitular = (titular) => {
        return (
            <div key={titular.id}>
                <div className="d-flex flex-column">
                    <strong>Titular:</strong>
                    <div className="list-group mt-2 mb-1">
                        <a
                            href={`/cliente/${titular.id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                            {titular.nome} | {getCpf(titular.documentos)}
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Dependentes:</strong>
                    <div className="list-group mt-2 mb-2">
                        {Array.isArray(titular.dependentes) && titular.dependentes.length > 0 ? (
                            titular.dependentes.map(dependente => renderDependente(dependente))
                        ) : (
                            <p>Não há dependentes</p>
                        )}
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    };

    return (
        <div>
            <div className="bg6"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Dependentes por Titular</h2>
                <hr></hr>
                {titulares.map(titular => renderTitular(titular))}
            </div>
        </div>
    );
}