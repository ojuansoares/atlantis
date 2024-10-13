import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ListagemEdicaoDependente from "../listagens/listagemEdicaoDependente";
import ListagemAcomodacoesSimples from "../listagens/listagemAcomodacoesSimples";

export default class CadastroClienteDependenteAcomodacao extends Processo {
    processar(): void {
        console.clear()
        let armazem = Armazem.InstanciaUnica;

        if (!armazem.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Vincular! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        console.log('Iniciando vínculo de um Dependente a uma Acomodação...')

        this.processo = new ListagemEdicaoDependente()
        this.processo.processar()

        let sub = true
        let clienteCPF: string = '';
        while (sub) {
            clienteCPF = this.entrada.receberTexto('CPF do Dependente para Vincular a uma Acomodação:')
        
            const clienteEncontrado = armazem.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoa Física' && doc.Numero === clienteCPF) && cliente.Titular !== ''
            );

            if (clienteEncontrado) {
                sub = false;
                break;
            } else {
                console.log('Cliente não encontrado');
                return;
            }
        }

        if (armazem.Acomodacoes.some(d => d.Acomodados.some(a => a == clienteCPF))) {
            console.log('Cliente já vinculado a uma acomodação!');
            return;
        }

        this.processo = new ListagemAcomodacoesSimples()
        this.processo.processar()

        let sub2 = true
        let indexAcomodacao = 0
        while (sub2) {
            indexAcomodacao = this.entrada.receberNumero('Índice da Acomodação para Vincular ao Dependente:')
        
            if (indexAcomodacao >= 0 && indexAcomodacao < armazem.Acomodacoes.length) {

                if (armazem.Acomodacoes[indexAcomodacao].LimiteAcomodados == armazem.Acomodacoes[indexAcomodacao].Acomodados.length) {
                    console.log('Acomodação lotada');
                    return;
                }
                sub2 = false;
                break;
            } else {
                console.log('Acomodação não encontrada');
                return;
            }
        }

        // Vinculando acomodação ao Cliente
        const cliente = armazem.Clientes.find(cliente => 
            cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoa Física' && doc.Numero === clienteCPF) && cliente.Titular !== '');
        if (cliente) {
            cliente.Acomodacao = armazem.Acomodacoes[indexAcomodacao].NomeAcomodacao;
        }

        console.log(`Cliente ${clienteCPF} vinculado a Acomodação`)

        // Vinculando Cliente a Acomodação
        armazem.Acomodacoes[indexAcomodacao].Acomodados.push(clienteCPF);

        console.log(`Acomoção ${armazem.Acomodacoes[indexAcomodacao].NomeAcomodacao} vinculada ao Cliente`)

        console.log('Finalizando o vínculo do cliente a uma acomodação...');
    }
}