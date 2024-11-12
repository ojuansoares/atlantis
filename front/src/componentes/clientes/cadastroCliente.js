import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import "../../index.css"
import "../../styles/bg10.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroCliente() {
    const [clientes, setClientes] = useState([]);
    const [tipoCliente, setTipoCliente] = useState('Titular');
    const [nome, setNome] = useState('');
    const [nomeSocial, setNomeSocial] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataEmissaoCpf, setDataEmissaoCpf] = useState('');
    const [documentos, setDocumentos] = useState([]);
    const [telefones, setTelefones] = useState([{ ddd: '', numero: '' }]);
    const [enderecos, setEnderecos] = useState([{ rua: '', bairro: '', cidade: '', estado: '', pais: '', cep: '' }]);
    const [titular, setTitular] = useState('');
    const [submit, setSubmit] = useState(false);

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
                setDocumentos(prevDocs => prevDocs.map(doc => doc.tipo === 'CPF' ? { ...doc, numero: value } : doc));
                break;
            case 'dataNascimento':
                setDataNascimento(value);
                break;
            case 'dataEmissaoCpf':
                setDataEmissaoCpf(value);
                setDocumentos(prevDocs => prevDocs.map(doc => doc.tipo === 'CPF' ? { ...doc, dataEmissao: value } : doc));
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

    const handleEnderecoChange = (index, event) => {
        const { name, value } = event.target;
        const newEnderecos = enderecos.map((endereco, enderecoIndex) => {
            if (index !== enderecoIndex) return endereco;
            return { ...endereco, [name]: value };
        });

        setEnderecos(newEnderecos);
    }

    const addDocumento = () => {
        if (documentos.length < 2) {
            setDocumentos([...documentos, { tipo: '', numero: '', dataEmissao: '' }]);
        } else {
            toast.error("Você pode adicionar no máximo 2 documentos adicionais.");
        }
    }

    const removeDocumento = () => {
        if (documentos.length >= 1) {
            setDocumentos(documentos.slice(0, -1));
        }
    }

    const addTelefone = () => {
        setTelefones([...telefones, { ddd: '', numero: '' }]);
    }

    const removeTelefone = () => {
        if (telefones.length > 1) {
            setTelefones(telefones.slice(0, -1));
        } else {
            toast.error("Você deve ter pelo menos um telefone.");
        }
    }

    const addEndereco = () => {
        setEnderecos([...enderecos, { rua: '', bairro: '', cidade: '', estado: '', pais: '', cep: '' }]);
    }

    const removeEndereco = () => {
        if (enderecos.length > 1) {
            setEnderecos(enderecos.slice(0, -1));
        } else {
            toast.error("Você deve ter pelo menos um endereço.");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!nome || !nomeSocial || !cpf || !dataNascimento || !dataEmissaoCpf || (tipoCliente === 'Titular' && documentos.some(documento => !documento.numero || !documento.dataEmissao)) || (tipoCliente === 'Titular' && telefones.some(telefone => !telefone.ddd || !telefone.numero)) || (tipoCliente === 'Dependente' && !titular)) {
            toast.error("Por favor, preencha todos os campos obrigatórios!");
            return;
        }

        setSubmit(true);
    };

    useEffect(() => {
        async function buscaTitulares() {
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
                    throw new Error(`Erro ao buscar clientes: ${clientes.message}`);
                }
            } catch (error) {
                console.error(error);}
        }

        buscaTitulares();
    }, [clientes.message]);

    const titulares = clientes.filter(cliente => 
        cliente.titular_id === null
    );

    useEffect(() => {
        const postCliente = async () => {

            const documentosComCpf = [...documentos, { tipo: 'CPF', numero: cpf.replace(/\D/g, ''), dataEmissao: dataEmissaoCpf }];

            const cliente = {
                nome,
                nome_social: nomeSocial,
                data_nascimento: dataNascimento,
                titular_id: tipoCliente === 'Dependente' ? titular : null,
                telefones: telefones.map(tel => ({ DDD: tel.ddd, numero: tel.numero })),
                enderecos: enderecos.map(end => ({ rua: end.rua, bairro: end.bairro, cidade: end.cidade, estado: end.estado, pais: end.pais, cep: end.cep })),
                documentos: documentosComCpf.map(doc => ({ tipo_documento: doc.tipo, numero_documento: doc.numero, data_expedicao: doc.dataEmissao }))
            };

            const isNumeric = (str) => /^\d+$/.test(str);

            console.log(JSON.stringify(cliente));

            for (let doc of documentosComCpf) {
                if (!isNumeric(doc.numero)) {
                    toast.error(`O documento tipo "${doc.tipo}" deve conter apenas dígitos.`);
                    return;
                }
            }

            if (documentosComCpf.length === 3) {
                const numerosDocumentos = documentosComCpf.map(doc => doc.numero);
                const numerosUnicos = new Set(numerosDocumentos);

                if (numerosDocumentos.length !== numerosUnicos.size) {
                    toast.error("Não é permitido ter dois documentos com números iguais.");
                    return;
                }
            }

            if (documentosComCpf.length === 3) {
                const tiposDocumentos = documentosComCpf.map(doc => doc.tipo);
                const tiposUnicos = new Set(tiposDocumentos);

                if (tiposDocumentos.length !== tiposUnicos.size) {
                    toast.error("Não é permitido ter dois documentos do mesmo tipo.");
                    return;
                }
            }

            const verificarDocumentos = async () => {
                for (let i = 0; i < documentosComCpf.length; i++) {
                    const doc = documentosComCpf[i];
                    try {
                        const response = await fetch('http://localhost:5000/clientes/verificar-documento', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ numero_documento: doc.numero }),
                        });
                        const data = await response.json();
                        if (data.exists) {
                            toast.error(`Documento tipo "${doc.tipo}" já existe.`);
                            return false;
                        }
                    } catch (error) {
                        console.error("Erro ao verificar documento:", error);
                        return false;
                    }
                }
                return true;
            };
    
            const documentosValidos = await verificarDocumentos();
            if (!documentosValidos) {
                return;
            }
            
            try {
                const response = await fetch('http://localhost:5000/clientes/criar-cliente', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(cliente),
                });

                if (response.ok) {
                    console.log('Cliente cadastrado:', cliente);
                    toast.success("Cliente cadastrado com sucesso!");
                    setTimeout(() => {
                        window.location.href = '/clientes';
                    }, 1200);
                } else {
                    toast.error("Erro ao cadastrar cliente.");
                }
            } catch (error) {
                toast.error("Erro ao cadastrar cliente: " + error.message);
            }
        };

        if (submit) {
            postCliente();
            setSubmit(false);
        }
    }, [submit, nome, nomeSocial, cpf, dataNascimento, dataEmissaoCpf, documentos, telefones, enderecos, tipoCliente, titular]);


    const handleCancel = (event) => {
        event.preventDefault();
        window.location.href = '/clientes';
    };

    return (
        <div>
            <div className="bg10"></div>
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

                    <label>Nome</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Nome" aria-describedby="basic-addon1" name="nome" value={nome} onChange={handleInputChange} required />
                    </div>

                    <label>Nome social</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Nome social" aria-describedby="basic-addon1" name="nomeSocial" value={nomeSocial} onChange={handleInputChange} required />
                    </div>

                    <label>Data de Nascimento</label>
                    <div className="input-group mb-3">
                        <input type="date" className="form-control" name="dataNascimento" value={dataNascimento} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={handleInputChange} required />
                    </div>

                    <label>CPF</label>
                    <div className="input-group mb-3">
                        <InputMask
                            mask="999.999.999-99"
                            type="text" 
                            className="form-control" 
                            aria-label="CPF" 
                            aria-describedby="basic-addon1" 
                            name="cpf" 
                            value={cpf} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>

                    <label>Data de emissão do CPF</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" aria-label="Data de emissão do CPF" aria-describedby="basic-addon1" name="dataEmissaoCpf" value={dataEmissaoCpf} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={handleInputChange} required />
                    </div>

                    <hr></hr>

                    <p>Documentos: </p>

                    {documentos.map((documento, index) => (
                        <div key={index}>
                            <label>Tipo de Documento</label>
                            <div className="input-group mb-3">
                                <select className="form-select" name="tipo" value={documento.tipo} onChange={(event) => handleDocumentoChange(index, event)} required>
                                    <option value="RG">RG</option>
                                    <option value="Passaporte">Passaporte</option>
                                </select>
                            </div>
                            <label>Número do Documento</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Número do Documento" aria-describedby="basic-addon1" name="numero" value={documento.numero} onChange={(event) => handleDocumentoChange(index, event)} required />
                            </div>
                            <label>Data de emissão do Documento</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Data de emissão do Documento" aria-describedby="basic-addon1" name="dataEmissao" value={documento.dataEmissao} onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} onChange={(event) => handleDocumentoChange(index, event)} required />
                            </div>
                            {index < documentos.length - 1 && <hr></hr>}
                        </div>
                    ))}

                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-outline-secondary mb-3" onClick={addDocumento}>Adicionar Documento</button>
                        <button type="button" className="btn btn-outline-danger mb-3" onClick={removeDocumento}>Remover Documento</button>
                    </div>

                    <hr></hr>

                    <p>Telefones: </p>

                    {telefones.map((telefone, index) => (
                        <div key={index}>
                            <label>DDD</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="DDD" aria-describedby="basic-addon1" name="ddd" value={telefone.ddd} onChange={(event) => handleTelefoneChange(index, event)} required />
                            </div>
                            <label>Número de Telefone</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Número de Telefone" aria-describedby="basic-addon1" name="numero" value={telefone.numero} onChange={(event) => handleTelefoneChange(index, event)} required />
                            </div>
                            {index < telefones.length - 1 && <hr></hr>}
                        </div>
                    ))}

                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-outline-secondary mb-3" onClick={addTelefone}>Adicionar Telefone</button>
                        <button type="button" className="btn btn-outline-danger mb-3" onClick={removeTelefone}>Remover Telefone</button>
                    </div>

                    <hr></hr>

                    <p>Endereços: </p>
                    {enderecos.map((endereco, index) => (
                        <div key={index}>
                            <label>Rua</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Rua" aria-describedby="basic-addon1" name="rua" value={endereco.rua} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            <label>Bairro</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Bairro" aria-describedby="basic-addon1" name="bairro" value={endereco.bairro} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            <label>Cidade</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Cidade" aria-describedby="basic-addon1" name="cidade" value={endereco.cidade} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            <label>Estado</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="Estado" aria-describedby="basic-addon1" name="estado" value={endereco.estado} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            <label>País</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="País" aria-describedby="basic-addon1" name="pais" value={endereco.pais} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            <label>CEP</label>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" aria-label="CEP" aria-describedby="basic-addon1" name="cep" value={endereco.cep} onChange={(event) => handleEnderecoChange(index, event)} required />
                            </div>
                            {index < enderecos.length - 1 && <hr></hr>}
                        </div>
                    ))}
                    
                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-outline-secondary mb-3" onClick={addEndereco}>Adicionar Endereço</button>
                        <button type="button" className="btn btn-outline-danger mb-3" onClick={removeEndereco}>Remover Endereço</button>
                    </div>

                    {tipoCliente === 'Dependente' && (
                        <div>
                            <hr></hr>
                            <p>Titular:</p>
                            <label>Selecione o Titular</label>
                            <div className="input-group mb-3">
                                <select className="form-select" name="titular" value={titular} onChange={handleInputChange} required>
                                    <option value="">Selecione o Titular</option>
                                    {titulares.map(titular => (
                                        <option key={titular.id} value={titular.id}>
                                            {titular.id} - {titular.nome}
                                        </option>
                                    ))}
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
        </div>
    )
}