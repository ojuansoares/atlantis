import React, { useState } from 'react';
import "../../styles/bg17.css";
import "../../index.css";

export default function ListaClientes() {
    const [tipoCliente, setTipoCliente] = useState('titular');

    const handleTipoClienteChange = (event) => {
        setTipoCliente(event.target.value);
    };

    const clientes = [
        { id: 1, nome: 'Juan', tipo: 'titular', cpf: '111.111.111-11' },
        { id: 2, nome: 'Paulo', tipo: 'dependente', cpf: '222.222.222-22' },
        { id: 3, nome: 'Maria', tipo: 'titular', cpf: '333.333.333-33' },
        { id: 4, nome: 'Isabelle', tipo: 'dependente', cpf: '444.444.444-44' },
        { id: 5, nome: 'Cleiton', tipo: 'titular', cpf: '555.555.555-55' },
        { id: 6, nome: 'Jeniffer', tipo: 'dependente', cpf: '666.666.666-66' },
    ];

    const clientesFiltrados = clientes.filter(cliente => cliente.tipo === tipoCliente);

    return (
        <div>
            <div className="bg17"></div>
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
                    {clientesFiltrados.map(cliente => (
                        <a 
                            key={cliente.id} 
                            href={`/${tipoCliente}/:id`} 
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                            {cliente.nome} | {cliente.cpf}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}