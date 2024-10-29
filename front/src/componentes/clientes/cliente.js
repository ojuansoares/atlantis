import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "../../index.css";
import "../../styles/bg13.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Cliente() {
    const { id } = useParams();
    const [cliente, setCliente] = useState({
        nome: '',
        nome_social: '',
        data_nascimento: '',
        telefones: [],
        enderecos: [],
        documentos: []
    });

    useEffect(() => {
        async function fetchCliente() {
            try {
                const response = await fetch(`http://localhost:5000/clientes/cliente/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setCliente(data);
                    console.log(data);
                } else {
                    throw new Error(`Erro ao buscar cliente: ${data.message}`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchCliente();
    }, [id]);

    const deletarCliente = async () => {
        try {
            const response = await fetch(`http://localhost:5000/clientes/deletar-cliente/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Erro ao deletar cliente: ${data.message}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleDelete = () => {
        confirmAlert({
            title: 'Deletar Cliente',
            message: 'Tem certeza que deseja deletar este cliente?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {

                        deletarCliente();
                        
                        const notify = () => toast.success("Cliente deletado com sucesso!");
                        notify();
                        setTimeout(() => {
                            window.location.href = '/clientes';
                        }, 1200);
                    }
                },
                {
                    label: 'Não',
                }
            ]
        });
    };

    const handleEdit = () => {
        window.location.href = `/editarcliente/${id}`;
    };

    if (!cliente) {
        return <p>Carregando...</p>;
    }

    const tipoCliente = () => {
        if (cliente.titular_id === null) {
            return 'Titular';
        } else {
            return 'Dependente';
    }

    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function fetchTitular() {
            if (cliente.titular_id) {
                try {
                    const response = await fetch(`http://localhost:5000/clientes/cliente/${cliente.titular_id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setCliente(prevState => ({
                            ...prevState,
                            titular_nome: data.nome,
                            titular_cpf: data.documentos.find(doc => doc.tipo_documento === 'CPF')?.numero_documento || 'CPF não encontrado'
                        }));
                    } else {
                        throw new Error(`Erro ao buscar titular: ${data.message}`);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }

        fetchTitular();
    }, [cliente.titular_id]);

    return (
        <div>
            <div className="bg13"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Informações do Cliente {tipoCliente()}</h2>
                <hr />
                <p><strong>Nome:</strong> {cliente.nome}</p>
                <p><strong>Nome Social:</strong> {cliente.nome_social}</p>
                <p><strong>Data de Nascimento:</strong> {new Date(cliente.data_nascimento).toLocaleDateString()}</p>
                <hr />
                
                <h3>Telefones</h3>
                {cliente.telefones.map((telefone, index) => (
                    <p key={index}><strong>Telefone:</strong> ({telefone.DDD}) {telefone.numero}</p>
                ))}
                <hr />
                
                <h3>Endereço</h3>
                {cliente.enderecos.length > 0 && (
                    <>
                        <p><strong>Rua:</strong> {cliente.enderecos[0].rua}</p>
                        <p><strong>Bairro:</strong> {cliente.enderecos[0].bairro}</p>
                        <p><strong>Cidade:</strong> {cliente.enderecos[0].cidade}</p>
                        <p><strong>Estado:</strong> {cliente.enderecos[0].estado}</p>
                        <p><strong>CEP:</strong> {cliente.enderecos[0].cep}</p>
                    </>
                )}
                <hr />
                
                <h3>Documentos</h3>
                {cliente.documentos.map((documento, index) => (
                    <div key={index}>
                        <p><strong>Tipo:</strong> {documento.tipo_documento}</p>
                        <p><strong>Número:</strong> {documento.numero_documento}</p>
                        <p><strong>Data de Emissão:</strong> {new Date(documento.data_expedicao).toLocaleDateString()}</p>
                    </div>
                ))}

                {cliente.titular_id && (
                    <>
                    <hr />
                    <h3>Titular</h3>
                    <div className="list-group">
                        <a 
                            href={`/cliente/${cliente.titular_id}`} 
                            className="list-group-item list-group-item-action d-flex justify-content-between"
                        >
                            {cliente.titular_nome} | {cliente.titular_cpf ? cliente.titular_cpf : 'CPF não encontrado'}
                        </a>
                    </div>
                    <br></br>
                    </>
                )}

                
                <div className="gap-2 d-flex">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleEdit}>Editar</button>
                    <button className="btn btn-outline-danger" type="button" onClick={handleDelete}>Deletar</button>
                </div>

            </div>
            <ToastContainer position="top-center" theme="dark" />
        </div>
    );
}
