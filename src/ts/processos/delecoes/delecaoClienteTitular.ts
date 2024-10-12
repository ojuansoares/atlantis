import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ListagemEdicaoTitular from "../listagens/listagemEdicaoTitular";

export default class DelecaoClienteTitular extends Processo {
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular == '')) {
            console.log(`\nNão há Clientes Titulares para Deletar! \nCrie um Cliente Titular Primeiro.\n`)
            return;
        }

        let armazem = Armazem.InstanciaUnica

        console.log('Iniciando a deleção de um cliente titular...')

        this.processo = new ListagemEdicaoTitular()
        this.processo.processar()

        let sub = true
        let titularCPF: string = '';
        while (sub) {
            titularCPF = this.entrada.receberTexto('CPF do Cliente Titular Que Deseja Deletar: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === titularCPF) && cliente.Titular == ''
            );

            if (clienteEncontrado) {
                sub = false;
            } else {
                console.log('Titular não encontrado');
                return;
            }
        }

        if (titularCPF) {
            const titularIndex = armazem.Clientes.findIndex(cliente => cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === titularCPF))

            const titular = armazem.Clientes[titularIndex];
            if (titular.Dependentes.length > 0) {

                const confirmacao = this.entrada.receberTexto('O Cliente Titular Possui Dependentes. Tem Certeza Que Deseja Deletar o Cliente Junto Com Seus Dependentes? (S/N): ');

                if (confirmacao.toLowerCase() !== 's') {
                    console.log('Operação de Deleção Cancelada.');
                    return;
                }

                // para cada cpf de dependente, deletar um por um
                Armazem.InstanciaUnica.Clientes[titularIndex].Dependentes.forEach((dependente) => {

                    // achando index do dependente dentro dos clientes do sistema
                    let indexD = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoas Física' && d.Numero === dependente))

                    // deletando o dependente
                    armazem.Clientes.splice(indexD, 1)

                    console.log(`Dependente ${dependente} deletado com sucesso.`)
                })

            }

            armazem.Clientes.splice(titularIndex, 1)

            console.log(`Titular ${titularCPF} deletado com sucesso.`)
        } else {
            console.log('Titular não encontrado.')
        }

        console.log('Finalizando a deleção do cliente titular...')
    }
}