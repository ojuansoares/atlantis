import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import ListagemEdicaoDependente from "../listagens/listagemEdicaoDependente";

export default class DelecaoClienteDependente extends Processo {
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Deletar! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        let armazem = Armazem.InstanciaUnica

        console.log('Iniciando a deleção de um cliente dependente...')

        this.processo = new ListagemEdicaoDependente()
        this.processo.processar()

        let sub = true
        let dependenteCPF: string = '';
        let dependenteEspecifico: Cliente = new Cliente('', '', new Date())
        while (sub) {
            dependenteCPF = this.entrada.receberTexto('CPF do Dependente Que Deseja Deletar: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === dependenteCPF) && cliente.Titular !== ''
            );

            if (clienteEncontrado) {
                dependenteEspecifico = clienteEncontrado
                sub = false;
            } else {
                console.log('Dependente não encontrado');
                return;
            }
        }

        // guardando index do dependente
        let dependenteIndex = armazem.Clientes.findIndex(cliente => cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === dependenteCPF))

        // guardando index do titular do dependente
        let titularIndex = armazem.Clientes.findIndex(cliente => cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === dependenteEspecifico.Titular))

        // guardando o indice do dependente dentro da lista de dependentes do titular
        let indexListaDependente = armazem.Clientes[titularIndex].Dependentes.findIndex(d => d === dependenteCPF)

        // removendo o dependente atual da lista do titular
        armazem.Clientes[titularIndex].Dependentes.splice(indexListaDependente, 1)

        console.log(`Dependente ${dependenteCPF} removido da lista de dependentes do titular ${dependenteEspecifico.Titular}`)

        // deletando o dependente
        armazem.Clientes.splice(dependenteIndex, 1)

        console.log(`Dependente ${dependenteCPF} deletado com sucesso.`)

        console.log('Finalizando a deleção do cliente titular...')
    }
}