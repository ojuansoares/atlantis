import React, { useState, useEffect } from 'react';
import "../../index.css"
import "../../styles/bg17.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VinculoClienteAcomodacao() {
    const [acao, setAcao] = useState('Vincular');
    const [tipoCliente, setTipoCliente] = useState('Titular');
    const [cliente, setCliente] = useState('');
    const [acomodacao, setAcomodacao] = useState('');
    const [clientesVinculados, setClientesVinculados] = useState([]);

    const NomeAcomodacao = {
        SolteiroSimples: 'Acomodação simples para solteiro(a)',
        CasalSimples: 'Acomodação simples para casal',
        FamiliaSimples: 'Acomodação para família com até duas crianças',
        FamiliaMais: 'Acomodação para família com até cinco crianças',
        SolteiroMais: 'Acomodação com garagem para solteiro(a)',
        FamiliaSuper: 'Acomodação para até duas famílias, casal e três crianças cada'
    };

    useEffect(() => {
        if (acao === 'Desvincular' && acomodacao) {
            // Simulate fetching clients linked to the selected accommodation
            const fetchedClientes = [
                { nome: 'Cliente 1', cpf: '123.456.789-00' },
                { nome: 'Cliente 2', cpf: '987.654.321-00' }
            ];
            setClientesVinculados(fetchedClientes);
        } else {
            setClientesVinculados([]);
        }
    }, [acao, acomodacao]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!cliente || !acomodacao) {
            toast.error("Por favor, preencha todos os campos obrigatórios!");
            return;
        }
        if (acao === 'Vincular') {
            console.log(`Cliente ${cliente} vinculado à ${acomodacao}`);
            toast.success("Cliente vinculado com sucesso!");
        } else {
            console.log(`Cliente ${cliente} desvinculado de ${acomodacao}`);
            toast.success("Cliente desvinculado com sucesso!");
        }
        setTimeout(() => {
            window.location.href = '/cadastrocliente';
        }, 1200);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/clientes';
    };

    return (
        <div>
            <div className="bg17"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Vínculo de Cliente a Acomodação</h2>
                <hr></hr>
                <p>Ação:</p>
                <div className="input-group mb-3">
                    <select className="form-select" value={acao} onChange={(e) => setAcao(e.target.value)} required>
                        <option value="Vincular">Vincular</option>
                        <option value="Desvincular">Desvincular</option>
                    </select>
                </div>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    {acao === 'Vincular' && (
                        <>
                            <p>Tipo Cliente:</p>
                            <div className="input-group mb-3">
                                <select className="form-select" value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)} required>
                                    <option value="Titular">Titular</option>
                                    <option value="Dependente">Dependente</option>
                                </select>
                            </div>
                            <p>Cliente:</p>
                            <div className="input-group mb-3">
                                <select className="form-select" value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                                    <option value="">Selecione o Cliente</option>
                                    {tipoCliente === 'Titular' ? (
                                        // Simulate fetching titular clients
                                        [{ nome: 'Titular 1', cpf: '111.222.333-44' }, { nome: 'Titular 2', cpf: '555.666.777-88' }].map((cliente, index) => (
                                            <option key={index} value={cliente.nome}>{cliente.nome} - CPF {cliente.cpf}</option>
                                        ))
                                    ) : (
                                        // Simulate fetching dependente clients
                                        [{ nome: 'Dependente 1', cpf: '999.888.777-66' }, { nome: 'Dependente 2', cpf: '444.333.222-11' }].map((cliente, index) => (
                                            <option key={index} value={cliente.nome}>{cliente.nome} - CPF {cliente.cpf}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </>
                    )}
                    <p>Acomodação:</p>
                    <div className="input-group mb-3">
                        <select className="form-select" value={acomodacao} onChange={(e) => setAcomodacao(e.target.value)} required>
                            <option value="">Selecione a Acomodação</option>
                            {Object.values(NomeAcomodacao).map((nome, index) => (
                                <option key={index} value={nome}>{nome}</option>
                            ))}
                        </select>
                    </div>
                    {acao === 'Desvincular' && acomodacao && (
                        <>
                            <p>Cliente:</p>
                            <div className="input-group mb-3">
                                <select className="form-select" value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                                    <option value="">Selecione o Cliente</option>
                                    {clientesVinculados.map((cliente, index) => (
                                        <option key={index} value={cliente.nome}>{cliente.nome} - CPF {cliente.cpf}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary" type="submit">{acao}</button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                theme="dark"
            />
        </div>
    )
}
