import React, { useEffect, useState } from "react";
import "../../styles/bg3.css";
import "../../index.css";

export default function ListaHospedesAcomodacao() {
    const [acomodacoes, setAcomodacoes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [vinculos, setVinculos] = useState({});

    useEffect(() => {
        // Fetch acomodações
        fetch('http://localhost:5000/acomodacoes/listar-acomodacoes')
            .then(response => response.json())
            .then(data => setAcomodacoes(data))
            .catch(error => console.error('Erro ao obter acomodações:', error));

        // Fetch clientes
        fetch('http://localhost:5000/clientes/listar-clientes')
            .then(response => response.json())
            .then(data => setClientes(data))
            .catch(error => console.error('Erro ao obter clientes:', error));

        // Fetch vínculos
        fetch('http://localhost:5000/acomodacao_cliente/listar-vinculos-por-acomodacao')
            .then(response => response.json())
            .then(data => setVinculos(data))
            .catch(error => console.error('Erro ao obter vínculos:', error));
    }, []);

    const getCpf = (documentos) => {
        const cpfDoc = documentos.find(doc => doc.tipo_documento === "CPF");
        return cpfDoc ? formatarCPF(cpfDoc.numero_documento) : "CPF não encontrado";
    };

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    const renderHospede = (hospede) => {
        return (
            <a 
                key={hospede.id} 
                href={`/cliente/${hospede.id}`} 
                className="list-group-item list-group-item-action d-flex justify-content-between"
            >
                {hospede.nome} | {getCpf(hospede.documentos)}
            </a>
        );
    };

    const renderAcomodacao = (acomodacao, hospedes) => {
        return (
            <div key={acomodacao.id}>
                <div className="d-flex flex-column">
                    <strong>Acomodação:</strong>
                    <div className="list-group mt-2 mb-2">
                        <div className="list-group-item list-group-item-action d-flex justify-content-between">
                            {acomodacao.nome}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <strong>Hóspedes:</strong>
                    <div className="list-group mt-2">
                        {hospedes.length > 0 ? (
                            hospedes.map(hospede => renderHospede(hospede))
                        ) : (
                            <p>Não há hóspedes</p>
                        )}
                    </div>
                </div>
                <hr></hr>
            </div>
        );
    };

    const getHospedes = (acomodacaoId) => {
        const hospedesIds = vinculos[acomodacaoId] || [];
        return hospedesIds.map(id => clientes.find(cliente => cliente.id === id)).filter(Boolean);
    };

    return (
        <div>
            <div className="bg3"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Listagem de Hóspedes por Acomodação</h2>
                <hr></hr>
                {acomodacoes.map(acomodacao => renderAcomodacao(acomodacao, getHospedes(acomodacao.id)))}
            </div>
        </div>
    );
}