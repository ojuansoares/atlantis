import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ListagemAcomodacoesSimples from "../listagens/listagemAcomodacoesSimples";

export default class DelecaoClienteAcomodacao extends Processo {
    processar(): void {
        console.clear()
        let armazem = Armazem.InstanciaUnica;
        console.log('Iniciando o desvínculo de um Cliente a uma Acomodação...')

        this.processo = new ListagemAcomodacoesSimples()
        this.processo.processar()

        let sub2 = true
        let indexAcomodacao = 0
        while (sub2) {
            indexAcomodacao = this.entrada.receberNumero('Índice da Acomodação para Desvincular um Cliente:')
        
            if (indexAcomodacao >= 0 && indexAcomodacao < armazem.Acomodacoes.length) {
                if (armazem.Acomodacoes[indexAcomodacao].Acomodados.length == 0) {
                    console.log('Não há Acomodados para Desvincular');
                    return;
                }
                sub2 = false;
                break;
            } else {
                console.log('Acomodação não encontrada');
                return;
            }
        }

        console.log(`\nClientes Acomodados:`)
        console.log(`****************************`)
        armazem.Acomodacoes[indexAcomodacao].Acomodados.forEach((acomodado) => {
            let cliente = armazem.Clientes.find(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoa Física' && d.Numero === acomodado));
            if (cliente) {
                console.log(`| Nome: ${cliente.Nome} | CPF: ${acomodado}`)
            }
        })
        console.log(`****************************`)

        let sub = true
        let clienteCPF: string = '';
        let indexCPF: number = 0;
        while (sub) {
            clienteCPF = this.entrada.receberTexto('CPF do Titular para Desvincular da Acomodação:')
        
            if (armazem.Acomodacoes[indexAcomodacao].Acomodados.some(c => c == clienteCPF)) {
                indexCPF = armazem.Acomodacoes[indexAcomodacao].Acomodados.findIndex(c => c == clienteCPF);
                sub = false;
                break;
            } else {
                console.log('Cliente não encontrado');
                return;
            }
        }
    
        // Desvinculando do Cliente da Acomodação
        armazem.Acomodacoes[indexAcomodacao].Acomodados.splice(indexCPF, 1);
        console.log(`Cliente ${clienteCPF} desvinculado da Acomodação`)

        // Desvinculando a Acomodação do Cliente
        const cliente = armazem.Clientes.find(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoa Física' && d.Numero === clienteCPF));
        if (cliente) {
            cliente.Acomodacao = '';
        }
        console.log(`Acomoção ${armazem.Acomodacoes[indexAcomodacao].NomeAcomodacao} desvinculada do Cliente`)

        console.log('Finalizando o desvínculo do cliente a uma acomodação...');
    }
}