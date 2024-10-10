import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";

export default class DelecaoClienteTitular extends Processo {
    processar(): void {
        let armazem = Armazem.InstanciaUnica

        console.log('Iniciando a deleção de um cliente titular...')

        const quantidadeClientes = Armazem.InstanciaUnica.Clientes.length
        if (quantidadeClientes === 0) {
            console.log('Não há clientes para deletar.');
            return;
        }

        this.processo = new ListagemEdicaoTitular()
        this.processo.processar()

        let sub = true
        let clienteCPF: string = '';
        while (sub) {
            clienteCPF = this.entrada.receberTexto('CPF do Cliente Titular Que Deseja Deletar: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === clienteCPF) && 
                cliente.Titular === undefined
            );

            if (clienteEncontrado) {
                sub = false;
            } else {
                console.log('Cliente não encontrado');
                return;
            }
        }

        if (clienteCPF) {
            const clienteIndex = armazem.Clientes.findIndex(cliente => cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === clienteCPF))

            const cliente = armazem.Clientes[clienteIndex];
            if (cliente.Dependentes.length > 0) {
                const confirmacao = this.entrada.receberTexto('O Cliente Titular Possui Dependentes. Tem Certeza Que Deseja Deletar o Cliente Junto Com Seus Dependentes? (S/N): ');
                if (confirmacao.toLowerCase() !== 's') {
                    console.log('Operação de Deleção Cancelada.');
                    return;
                }
            }

            armazem.Clientes.splice(clienteIndex, 1)

            console.log('Cliente deletado com sucesso.')
        } else {
            console.log('Cliente não encontrado.')
        }

        console.log('Finalizando a deleção do cliente titular...')
    }
}