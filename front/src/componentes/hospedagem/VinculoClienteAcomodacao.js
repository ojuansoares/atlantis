/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import "../../index.css";
import "../../styles/bg2.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VinculoClienteAcomodacao() {
    const [acao, setAcao] = useState('Vincular');
    const [tipoCliente, setTipoCliente] = useState('Titular');
    const [clientes, setClientes] = useState({ titulares: [], dependentes: [] });
    const [cliente, setCliente] = useState('');
    const [acomodacao, setAcomodacao] = useState('');
    const [acomodacoes, setAcomodacoes] = useState([]);
    const [clientesAcomodados, setClientesAcomodados] = useState([]);
    const [clienteInfo, setClienteInfo] = useState([]);

    useEffect(() => {
        carregarAcomodacoes();
        carregarClientes();

        if (acao === 'Desvincular' && acomodacao) {
            carregarClientesAcomodados();
        }
    }, [acao, acomodacao]);

    useEffect(() => {
        if (clientesAcomodados.length > 0) {
            carregarInfoClientesAcomodados();
        } else {
            setClienteInfo([]);
        }
    }, [clientesAcomodados]);

    const carregarAcomodacoes = () => {
        fetchData('http://localhost:5000/acomodacoes/listar-acomodacoes', setAcomodacoes, 'Erro ao carregar acomodações');
    };

    const carregarClientes = () => {
        fetchData("http://localhost:5000/clientes/listar-clientes", (data) => {
            const titulares = data.filter(cliente => cliente.titular_id === null);
            const dependentes = data.filter(cliente => cliente.titular_id !== null);
            setClientes({ titulares, dependentes });
        }, 'Erro ao buscar clientes');
    };

    const carregarClientesAcomodados = () => {
        fetchData(`http://localhost:5000/acomodacao_cliente/clientes-por-acomodacao/${acomodacao}`, setClientesAcomodados, 'Erro ao carregar clientes acomodados');
    };

    const carregarInfoClientesAcomodados = () => {
        const clientesPromises = clientesAcomodados.map(clienteId => 
            fetch(`http://localhost:5000/clientes/cliente/${clienteId}`).then(response => response.json())
        );

        Promise.all(clientesPromises)
            .then(setClienteInfo)
            .catch(() => console.error('Erro ao carregar informações dos clientes'));
    };

    const fetchData = async (url, callback, errorMessage) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
                callback(data);
            } else {
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!cliente || !acomodacao) {
            toast.error("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        acao === 'Vincular' ? vincularCliente() : desvincularCliente();
    };

    const vincularCliente = async () => {
        const clienteAcomodado = await fetchDataWithResponse(`http://localhost:5000/acomodacao_cliente/verifica-cliente/${cliente}`);
        if (clienteAcomodado.acomodado) {
            toast.error("O cliente já está acomodado em outra acomodação.");
            return;
        }

        const limiteAtingido = await fetchDataWithResponse(`http://localhost:5000/acomodacao_cliente/verifica-limite/${acomodacao}`);
        if (limiteAtingido.limiteAtingido) {
            toast.error("A acomodação atingiu o limite de ocupação.");
            return;
        }

        realizarVinculo();
    };

    const desvincularCliente = () => {
        fetch(`http://localhost:5000/acomodacao_cliente/desvincular-cliente/${acomodacao}/${cliente}`, { method: 'DELETE' })
            .then(response => response.ok ? toast.success("Cliente desvinculado com sucesso!") : toast.error("Erro ao desvincular cliente."))
            .catch(error => toast.error("Erro ao desvincular cliente: " + error))
            .finally(() => setTimeout(() => window.location.href = '/vinculo', 1200));
    };

    const realizarVinculo = () => {
        fetch('http://localhost:5000/acomodacao_cliente/vincular-cliente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cliente_id: cliente, acomodacao_id: acomodacao, data_entrada: new Date() }),
        })
        .then(response => response.ok ? toast.success("Cliente vinculado com sucesso!") : toast.error("Erro ao vincular cliente."))
        .catch(error => toast.error("Erro ao vincular cliente: " + error))
        .finally(() => setTimeout(() => window.location.href = '/vinculo', 1200));
    };

    const fetchDataWithResponse = async (url) => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            return {};
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/clientes';
    };

    const renderClientesOptions = (clientesList) => (
        clientesList.map(c => {
            const cpfDocumento = c.documentos.find(doc => doc.tipo_documento === 'CPF');
            return (
                <option key={c.id} value={c.id}>
                    {c.nome} | {cpfDocumento ? cpfDocumento.numero_documento : 'CPF não encontrado'}
                </option>
            );
        })
    );

    return (
        <div>
            <div className="bg2"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Vínculo de Cliente a Acomodação</h2>
                <hr />
                <p>Ação:</p>
                <div className="input-group mb-3">
                    <select className="form-select" value={acao} onChange={(e) => setAcao(e.target.value)} required>
                        <option value="Vincular">Vincular</option>
                        <option value="Desvincular">Desvincular</option>
                    </select>
                </div>
                <hr />
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
                                    {tipoCliente === 'Titular' ? renderClientesOptions(clientes.titulares) : renderClientesOptions(clientes.dependentes)}
                                </select>
                            </div>
                        </>
                    )}
                    <p>Acomodação:</p>
                    <div className="input-group mb-3">
                        <select className="form-select" value={acomodacao} onChange={(e) => setAcomodacao(e.target.value)} required>
                            <option value="">Selecione a Acomodação</option>
                            {acomodacoes.map((a) => (
                                <option key={a.id} value={a.id}>{a.nome}</option>
                            ))}
                        </select>
                    </div>

                    {acao === 'Desvincular' && acomodacao && (
                        <>
                            <p>Cliente:</p>
                            <div className="input-group mb-3">
                                <select className="form-select" value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                                    <option value="">Selecione o Cliente</option>
                                    {renderClientesOptions(clienteInfo)}
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
        </div>
    );
}
