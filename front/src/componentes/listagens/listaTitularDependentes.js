import React, { useEffect, useState } from "react";
import "../../styles/bg7.css";
import "../../index.css";

export default function ListaTitularDependentes() {
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

    const renderTitular = (titular) => {
        return (
            <a 
                key={titular.id} 
                href={`/cliente/${titular.id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {titular.nome} | {getCpf(titular.documentos)}
            </a>
        );
    };

    const renderDependente = (dependente, titular) => {
        return (
            <div key={dependente.id}>
                <div className="d-flex flex-column">
                    <strong>Dependente:</strong>
                    <div className="list-group mt-2 mb-2">
                        <a
                            href={`/cliente/${dependente.id}`}
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                            {dependente.nome} | {getCpf(dependente.documentos)}
                        </a>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Titular:</strong>
                    <div className="list-group mt-2">
                        {renderTitular(titular)}
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    };

    return (
        <div>
            <div className="bg7"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Titulares por Dependente</h2>
                <hr></hr>
                {titulares.map(titular => (
                    titular.dependentes.map(dependente => renderDependente(dependente, titular))
                ))}
            </div>
        </div>
    );
}