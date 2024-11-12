import React, { useState, useEffect } from 'react';
import "../../styles/bg13.css";
import "../../index.css";

export default function ListaClientes() {
    const [tipoCliente, setTipoCliente] = useState('titular');
    const [clientes, setClientes] = useState([]);

    const handleTipoClienteChange = (event) => {
        setTipoCliente(event.target.value);
    };

    useEffect(() => {
        async function fetchClientes() {
            try {
                const response = await fetch("http://localhost:5000/clientes/listar-clientes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setClientes(data);
                    console.log(data);
                } else {
                    throw new Error(`Erro ao buscar clientes: ${data.message}`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchClientes();
    }, []);

    const clientesFiltrados = clientes.filter(cliente => {
        if (tipoCliente === 'titular') {
            return cliente.titular_id === null;
        } else {
            return cliente.titular_id !== null;
        }
    });

    const formatarCPF = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };

    return (
        <div>
            <div className="bg13"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Clientes</h2>
                <hr></hr>

                <div className="form-group">
                    <p>Tipo Cliente:</p>
                    <select className="form-control" id="tipoCliente" value={tipoCliente} onChange={handleTipoClienteChange}>
                        <option value="titular">Titular</option>
                        <option value="dependente">Dependente</option>
                    </select>
                </div>

                <hr></hr>
                <div className="list-group">
                    {clientesFiltrados.length === 0 ? (
                        <p>Não há clientes desse tipo registrados</p>
                    ) : (
                        clientesFiltrados.map(cliente => {
                            const cpfDocumento = cliente.documentos.find(doc => doc.tipo_documento === 'CPF');
                            return (
                                <a 
                                    key={cliente.id} 
                                    href={`/cliente/${cliente.id}`} 
                                    className="list-group-item list-group-item-action d-flex justify-content-between"
                                >
                                    {cliente.nome} | {cpfDocumento ? formatarCPF(cpfDocumento.numero_documento) : 'CPF não encontrado'}
                                </a>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}