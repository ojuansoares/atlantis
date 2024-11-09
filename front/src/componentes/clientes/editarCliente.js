import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import "../../index.css";
import "../../styles/bg13.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

export default function EditarCliente() {
    const { id } = useParams();
    const [state, setState] = useState({
        nome: '',
        nome_social: '',
        data_nascimento: '',
        telefones: [{ DDD: '', numero: '' }],
        enderecos: [{ rua: '', bairro: '', cidade: '', estado: '', cep: '' }],
        documentos: [
            { tipo_documento: 'RG', numero_documento: '', data_expedicao: '' },
            { tipo_documento: 'CPF', numero_documento: '', data_expedicao: '' }
        ]
    });

    useEffect(() => {
        async function fetchCliente() {
            try {
                const response = await fetch(`http://localhost:5000/clientes/cliente/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setState({
                        ...data,
                        data_nascimento: data.data_nascimento.split("T")[0],
                        documentos: data.documentos.map(doc => ({
                            ...doc,
                            data_expedicao: doc.data_expedicao ? doc.data_expedicao.split("T")[0] : ''
                        }))
                    });
                } else {
                    throw new Error(`Erro ao buscar cliente: ${data.message}`);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchCliente();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const handleTelefoneChange = (index, event) => {
        const { name, value } = event.target;
        const newTelefones = state.telefones.map((telefone, telefoneIndex) => {
            if (index !== telefoneIndex) return telefone;
            return { ...telefone, [name]: value };
        });

        setState(prevState => ({ ...prevState, telefones: newTelefones }));
    }

    const handleDocumentoChange = (index, event) => {
        const { name, value } = event.target;
        const newDocumentos = state.documentos.map((documento, documentoIndex) => {
            if (index !== documentoIndex) return documento;
            return { ...documento, [name]: value };
        });

        setState(prevState => ({ ...prevState, documentos: newDocumentos }));
    }

    const handleEnderecoChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            enderecos: [{ ...prevState.enderecos[0], [name]: value }]
        }));
    }

    const verificarDocumentos = async () => {
        for (let i = 0; i < state.documentos.length; i++) {
            const doc = state.documentos[i];
            try {
                const response = await fetch('http://localhost:5000/clientes/verificar-documento', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ numero_documento: doc.numero_documento }),
                });
                const data = await response.json();
                if (data.exists) {
                    toast.error(`Documento tipo "${doc.tipo_documento}" já existe.`);
                    return false;
                }
            } catch (error) {
                console.error("Erro ao verificar documento:", error);
                return false;
            }
        }
        return true;
    };

    const handleSave = async (event) => {
        event.preventDefault();

        if (state.documentos.length === 3) {
            const numerosDocumentos = state.documentos.map(doc => doc.numero_documento);
            const numerosUnicos = new Set(numerosDocumentos);

            if (numerosDocumentos.length !== numerosUnicos.size) {
                toast.error("Não é permitido ter dois documentos com números iguais.");
                return;
            }
        }

        const documentosValidos = await verificarDocumentos();
        if (!documentosValidos) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/clientes/atualizar-cliente/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(state),
            });

            if (response.ok) {
                toast.success("Cliente editado com sucesso!");
                setTimeout(() => {
                    window.location.href = `/cliente/${id}`;
                }, 1200);
            } else {
                toast.error("Erro ao editar cliente.");
            }
        } catch (error) {
            toast.error("Erro ao editar cliente: " + error.message);
        }
    };

    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = `/cliente/${id}`;
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
                        <input type="text" className="form-control" placeholder="Nome" name="nome" value={state.nome} onChange={handleInputChange} />
                    </div>
                    <label>Nome Social</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome Social" name="nome_social" value={state.nome_social} onChange={handleInputChange} />
                    </div>
                    <label>Data de Nascimento</label>
                    <div className="input-group mb-3">
                        <input type="date" className="form-control" name="data_nascimento" value={state.data_nascimento} onChange={handleInputChange} />
                    </div>
                    {state.telefones.map((telefone, index) => (
                        <div key={index}>
                            <label>Telefone {index + 1}</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="DDD" name="DDD" value={telefone.DDD} onChange={event => handleTelefoneChange(index, event)} />
                                <input type="text" className="form-control" placeholder="Número" name="numero" value={telefone.numero} onChange={event => handleTelefoneChange(index, event)} />
                            </div>
                        </div>
                    ))}
                    <h3>Endereço</h3>
                    <label>Rua</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Rua" name="rua" value={state.enderecos[0].rua} onChange={handleEnderecoChange} />
                    </div>
                    <label>Bairro</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Bairro" name="bairro" value={state.enderecos[0].bairro} onChange={handleEnderecoChange} />
                    </div>
                    <label>Cidade</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Cidade" name="cidade" value={state.enderecos[0].cidade} onChange={handleEnderecoChange} />
                    </div>
                    <label>Estado</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Estado" name="estado" value={state.enderecos[0].estado} onChange={handleEnderecoChange} />
                    </div>
                    <label>CEP</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="CEP" name="cep" value={state.enderecos[0].cep} onChange={handleEnderecoChange} />
                    </div>
                    <h3>Documentos</h3>
                    {state.documentos.map((documento, index) => (
                        <div key={index}>
                            <h4 className="d-flex justify-content-start gap-2">{documento.tipo_documento}</h4>
                            <label>Número</label>
                            <div className="input-group mb-3">
                                {documento.tipo_documento === 'CPF' ? (
                                    <InputMask
                                        mask="999.999.999-99"
                                        className="form-control"
                                        placeholder="Número do CPF"
                                        name="numero_documento"
                                        value={documento.numero_documento}
                                        onChange={event => handleDocumentoChange(index, event)}
                                    />
                                ) : (
                                    <InputMask
                                        mask="99.999.999-9"
                                        className="form-control"
                                        placeholder="Número do RG"
                                        name="numero_documento"
                                        value={documento.numero_documento}
                                        onChange={event => handleDocumentoChange(index, event)}
                                    />
                                )}
                            </div>
                            <label>Data de Emissão</label>
                            <div className="input-group mb-3">
                                <input
                                    type="date"
                                    className="form-control"
                                    name="data_expedicao"
                                    value={documento.data_expedicao}
                                    onChange={event => handleDocumentoChange(index, event)}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSave}>Salvar</button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleCancel}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}