import React, { useState } from 'react';
import "../styles/bg8.css"
import "../index.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CadastroCompra() {
    const [setIdComprador] = useState(1);
    const [setTipoCompra] = useState('');
    const [setProdutoServico] = useState('');
    const [setIdPet] = useState(1);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'idComprador':
                setIdComprador(value);
                break;
            case 'tipoCompra':
                setTipoCompra(value);
                break;
            case 'produtoServico':
                setProdutoServico(value);
                break;
            case 'idPet':
                setIdPet(value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const notify = () => toast.success("Compra cadastrada com sucesso!");
        notify();
        setTimeout(() => {
            window.location.href = '/registrarcompra';
        }, 1200);
    };

    return (
        <div>
            <div className="bg8"></div>
            <div className="container-fluid fundo-escuro">
                <h2>Cadastro de Compra</h2>
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <select className="form-control" name="idComprador" onChange={handleInputChange}>
                            <option value="" disabled selected>ID do Comprador</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-control" name="tipoCompra" onChange={handleInputChange}>
                            <option value="" disabled selected>Tipo da compra</option>
                            <option value="Produto">Produto</option>
                            <option value="Serviço">Serviço</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-control" name="produtoServico" onChange={handleInputChange}>
                            <option value="" disabled selected>Qual Produto/Serviço</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <select className="form-control" name="idPet" onChange={handleInputChange}>
                            <option value="" disabled selected>ID do Pet para a Compra</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-secondary" type="submit">Cadastrar</button>
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