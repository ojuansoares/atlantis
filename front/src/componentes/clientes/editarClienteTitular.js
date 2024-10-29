import React, { useState } from 'react';
import "../../index.css"
import "../../styles/bg13.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditarClienteTitular() {
    const [state, setState] = useState({
        Nome: 'João Silva',
        NomeSocial: 'Joana Silva',
        Acomodacao: 'Acomodação simples para solteiro(a)',
        DataNascimento: '2000-01-01',
        DataCadastro: '2020-01-01',
        Telefones: ['(11) 1234-5678', '(11) 9876-5432'],
        Endereco: {
            rua: 'Rua Exemplo',
            numero: 123,
            cidade: 'Cidade Exemplo',
            estado: 'Estado Exemplo',
            cep: '12345-678'
        },
        Documentos: [
            { tipo: 'RG', numero: '12.345.678-9', dataEmissao: '1999-01-01' },
            { tipo: 'CPF', numero: '123.456.789-00', dataEmissao: '2000-01-01' }
        ]
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleTelefoneChange = (index, event) => {
        const newTelefones = state.Telefones.map((telefone, telefoneIndex) => {
            if (index !== telefoneIndex) return telefone;
            return event.target.value;
        });

        setState(prevState => ({ ...prevState, Telefones: newTelefones }));
    }

    const handleDocumentoChange = (index, event) => {
        const newDocumentos = state.Documentos.map((documento, documentoIndex) => {
            if (index !== documentoIndex) return documento;
            return { ...documento, [event.target.name]: event.target.value };
        });

        setState(prevState => ({ ...prevState, Documentos: newDocumentos }));
    }

    const handleEnderecoChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            Endereco: { ...prevState.Endereco, [name]: value }
        }));
    }

    const handleSave = (event) => {
        event.preventDefault();
        const notify = () => toast.success("Cliente editado com sucesso!");
        notify();
        setTimeout(() => {
            window.location.href = '/titular/id:';
        }, 1200);
    };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/titular/id:';
    };

    return (
        <div>
            <div className="bg13"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Editar Cliente Titular</h2>
                <hr></hr>
                <form>
                    <label>Nome</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" name="Nome" value={state.Nome} onChange={handleInputChange} />
                    </div>
                    <label>Nome Social</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome Social" name="NomeSocial" value={state.NomeSocial} onChange={handleInputChange} />
                    </div>
                    <label>Data de Nascimento</label>
                    <div className="input-group mb-3">
                        <input type="date" className="form-control" name="DataNascimento" value={state.DataNascimento} onChange={handleInputChange} />
                    </div>
                    {state.Telefones.map((telefone, index) => (
                        <div key={index}>
                            <label>Telefone {index + 1}</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder={`Telefone ${index + 1}`} value={telefone} onChange={event => handleTelefoneChange(index, event)} />
                            </div>
                        </div>
                    ))}
                    <h3>Endereço</h3>
                    <label>Rua</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Rua" name="rua" value={state.Endereco.rua} onChange={handleEnderecoChange} />
                    </div>
                    <label>Número</label>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Número" name="numero" value={state.Endereco.numero} onChange={handleEnderecoChange} />
                    </div>
                    <label>Cidade</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Cidade" name="cidade" value={state.Endereco.cidade} onChange={handleEnderecoChange} />
                    </div>
                    <label>Estado</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Estado" name="estado" value={state.Endereco.estado} onChange={handleEnderecoChange} />
                    </div>
                    <label>CEP</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="CEP" name="cep" value={state.Endereco.cep} onChange={handleEnderecoChange} />
                    </div>
                    <h3>Documentos</h3>
                    {state.Documentos.map((documento, index) => (
                        <div key={index}>
                            <h4 className="d-flex justify-content-start gap-2">{documento.tipo}</h4>
                            <label>Número</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Número" name="numero" value={documento.numero} onChange={event => handleDocumentoChange(index, event)} />
                            </div>
                            <label>Data de Emissão</label>
                            <div className="input-group mb-3">
                                <input type="date" className="form-control" name="dataEmissao" value={documento.dataEmissao} onChange={event => handleDocumentoChange(index, event)} />
                            </div>
                        </div>
                    ))}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSave}>Salvar</button>
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
