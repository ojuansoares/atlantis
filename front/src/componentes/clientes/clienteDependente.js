import React, { useState } from 'react';
import "../../index.css"
import "../../styles/bg13.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClienteDependente() {
    const [state] = useState({
        Nome: 'Maria Oliveira',
        NomeSocial: 'Mariana Oliveira',
        Acomodacao: 'Acomodação simples para casal',
        DataNascimento: new Date('1995-05-15'),
        DataCadastro: new Date('2021-06-10'),
        Telefones: ['(21) 2345-6789', '(21) 8765-4321'],
        Endereco: {
            rua: 'Avenida das Flores',
            numero: 456,
            cidade: 'Cidade Jardim',
            estado: 'Estado Verde',
            cep: '98765-432'
        },
        Documentos: [
            { tipo: 'RG', numero: '98.765.432-1', dataEmissao: '2010-05-15' },
            { tipo: 'CPF', numero: '987.654.321-00', dataEmissao: '2011-06-10' }
        ]
    });

    const handleDelete = () => {
        confirmAlert({
            title: 'Deletar Cliente',
            message: 'Tem certeza que deseja deletar este cliente?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
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
    }

    const handleEdit = () => {
        window.location.href = `/editarclientedependente/:id`;
    }

    return (
        <div>
            <div className="bg13"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Informações do Cliente Dependente</h2>
                <hr></hr>
                <p><strong>Nome:</strong> {state.Nome}</p>
                <p><strong>Nome Social:</strong> {state.NomeSocial}</p>
                <p><strong>Tipo Acomodação:</strong> {state.Acomodacao}</p>
                <p><strong>Data de Nascimento:</strong> {state.DataNascimento.toLocaleDateString()}</p>
                <p><strong>Data de Cadastro:</strong> {state.DataCadastro.toLocaleDateString()}</p>
                <hr></hr>
                <h3>Telefones</h3>
                {state.Telefones.map((telefone, index) => (
                    <p key={index}><strong>Telefone:</strong> {telefone}</p>
                ))}
                <hr></hr>
                <h3>Endereço</h3>
                <p><strong>Rua:</strong> {state.Endereco.rua}</p>
                <p><strong>Número:</strong> {state.Endereco.numero}</p>
                <p><strong>Cidade:</strong> {state.Endereco.cidade}</p>
                <p><strong>Estado:</strong> {state.Endereco.estado}</p>
                <p><strong>CEP:</strong> {state.Endereco.cep}</p>
                <hr></hr>
                <h3>Documentos</h3>
                {state.Documentos.map((documento, index) => (
                    <div key={index}>
                        <p><strong>Tipo:</strong> {documento.tipo}</p>
                        <p><strong>Número:</strong> {documento.numero}</p>
                        <p><strong>Data de Emissão:</strong> {new Date(documento.dataEmissao).toLocaleDateString()}</p>
                    </div>
                ))}
                <div className="gap-2 d-flex">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleEdit}>Editar</button>
                    <button className="btn btn-outline-danger" type="button" onClick={handleDelete}>Deletar</button>
                </div>
            </div>
            <ToastContainer
            position="top-center"
            theme="dark"
            />
        </div>
    )
}