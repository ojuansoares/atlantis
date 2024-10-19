import React, { useState } from 'react';
import "../../index.css"
import "../../styles/bg17.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroCliente() {
    const [tipoCliente, setTipoCliente] = useState('Titular');
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataEmissaoCpf, setDataEmissaoCpf] = useState('');
    const [numDocumentos, setNumDocumentos] = useState('');
    const [documentos, setDocumentos] = useState([{ tipo: 'RG', numero: '', dataEmissao: '' }]);
    const [numTelefones, setNumTelefones] = useState('');
    const [telefones, setTelefones] = useState([{ ddd: '', numero: '' }]);
    const [titular, setTitular] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'nome':
                setNome(value);
                break;
            case 'nomeSocial':
                setNomeSocial(value);
                break;
            case 'cpf':
                setCpf(value);
                break;
            case 'dataEmissaoCpf':
                setDataEmissaoCpf(value);
                break;
            case 'numDocumentos':
                setNumDocumentos(value);
                setDocumentos(Array.from({ length: value }, () => ({ tipo: 'RG', numero: '', dataEmissao: '' })));
                break;
            case 'numTelefones':
                setNumTelefones(value);
                setTelefones(Array.from({ length: value }, () => ({ ddd: '', numero: '' })));
                break;
            case 'titular':
                setTitular(value);
                break;
            default:
                break;
        }
    }

    const handleDocumentoChange = (index, event) => {
        const { name, value } = event.target;
        const newDocumentos = documentos.map((documento, docIndex) => {
            if (index !== docIndex) return documento;
            return { ...documento, [name]: value };
        });

        setDocumentos(newDocumentos);
    }

    const handleTelefoneChange = (index, event) => {
        const { name, value } = event.target;
        const newTelefones = telefones.map((telefone, telefoneIndex) => {
            if (index !== telefoneIndex) return telefone;
            return { ...telefone, [name]: value };
        });

        setTelefones(newTelefones);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!nome || !nomeSocial || !cpf || !dataEmissaoCpf || (tipoCliente === 'Titular' && (!numDocumentos || documentos.some(documento => !documento.numero || !documento.dataEmissao))) || (tipoCliente === 'Titular' && (!numTelefones || telefones.some(telefone => !telefone.ddd || !telefone.numero))) || (tipoCliente === 'Dependente' && !titular)) {
            toast.error("Por favor, preencha todos os campos obrigatórios!");
            return;
        }
        const cliente = {
            tipoCliente,
            nome,
            nomeSocial,
            cpf,
            dataEmissaoCpf,
            documentos,
            telefones,
            titular: tipoCliente === 'Dependente' ? titular : null
        };
        console.log('Cliente cadastrado:', cliente);
        toast.success("Cliente cadastrado com sucesso!");
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
                <h2>Cadastro de Cliente</h2>
                <hr></hr>
                <p>Tipo Cliente:</p>
                <div className="input-group mb-3">
                    <select className="form-select" value={tipoCliente} onChange={(e) => setTipoCliente(e.target.value)} required>
                        <option value="Titular">Titular</option>
                        <option value="Dependente">Dependente</option>
                    </select>
                </div>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" name="nome" value={nome} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" name="nomeSocial" value={nomeSocial} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="CPF" aria-label="CPF" aria-describedby="basic-addon1" name="cpf" value={cpf} onChange={handleInputChange} required />
                    </div>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Data de emissão do CPF" aria-label="Data de emissão do CPF" aria-describedby="basic-addon1" name="dataEmissaoCpf" value={dataEmissaoCpf} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={handleInputChange} required />
                    </div>
                    <hr></hr>
                    <p>Documentos: </p>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Quantos Documentos quer adicionar?" aria-label="Quantos Documentos quer adicionar?" aria-describedby="basic-addon1" name="numDocumentos" value={numDocumentos} onChange={handleInputChange}/>
                    </div>
                    {documentos.map((documento, index) => (
                        <div key={index}>
                            <div className="input-group mb-3">
                                <select className="form-select" name="tipo" value={documento.tipo} onChange={(event) => handleDocumentoChange(index, event)} required>
                                    <option value="RG">RG</option>
                                    <option value="Passaporte">Passaporte</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Número do Documento" aria-label="Número do Documento" aria-describedby="basic-addon1" name="numero" value={documento.numero} onChange={(event) => handleDocumentoChange(index, event)} required />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Data de emissão do Documento" aria-label="Data de emissão do Documento" aria-describedby="basic-addon1" name="dataEmissao" value={documento.dataEmissao} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={(event) => handleDocumentoChange(index, event)} required />
                            </div>
                        </div>
                    ))}
                    <hr></hr>
                    <p>Telefones: </p>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" placeholder="Quantos Telefones quer adicionar?" aria-label="Quantos Telefones quer adicionar?" aria-describedby="basic-addon1" name="numTelefones" value={numTelefones} onChange={handleInputChange} required />
                    </div>
                    {telefones.map((telefone, index) => (
                        <div key={index}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="DDD" aria-label="DDD" aria-describedby="basic-addon1" name="ddd" value={telefone.ddd} onChange={(event) => handleTelefoneChange(index, event)} required />
                            </div>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Número de Telefone" aria-label="Número de Telefone" aria-describedby="basic-addon1" name="numero" value={telefone.numero} onChange={(event) => handleTelefoneChange(index, event)} required />
                            </div>
                        </div>
                    ))}
                    {tipoCliente === 'Dependente' && (
                        <div>
                            <hr></hr>
                            <p>Titular:</p>
                        <div className="input-group mb-3">
                            <select className="form-select" name="titular" value={titular} onChange={handleInputChange} required>
                                <option value="">Selecione o Titular</option>
                                <option value="Titular 1">Titular 1 - CPF 123.456.789-00</option>
                                <option value="Titular 2">Titular 2 - CPF 987.654.321-00</option>
                            </select>
                        </div>
                        </div>
                    )}
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-secondary" type="submit">Cadastrar</button>
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