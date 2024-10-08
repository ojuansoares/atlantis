import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";

export default class EdicaoClienteTitular extends Processo {
    processar(): void {

        this.processo = new ListagemEdicaoTitular()
        this.processo.processar()

        let sub = true
        let clienteIndex: number = -1;
        while (sub) {
            clienteIndex = this.entrada.receberNumero('Qual Cliente Titular Deseja Editar?')
            if (clienteIndex < Armazem.InstanciaUnica.Clientes.length) {
                sub = false
            } else {
                console.log('Cliente não encontrado, tente novamente.')
            }
        }

        let clienteEditar = Armazem.InstanciaUnica.Clientes[clienteIndex]

        

        return

        console.log('Iniciando Edição do Cliente Titular (Deixe em Branco para Não Editar).')
        let nome = this.entrada.receberTexto('Qual o novo nome cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o novo nome social do cliente?')
        let dataNascimento = this.entrada.receberData('Qual a nova data de nascimento?')
        let cliente = new Cliente(nome, nomeSocial, dataNascimento)

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}