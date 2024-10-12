import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";
import Impressor from "../../interfaces/impressor";
import ImpressorCliente from "../../impressores/impressorCliente";
import ListagemEdicaoDependente from "./listagemEdicaoDependente";

export default class ListagemTitularDependente extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular == '')) {
            console.log(`\nNão há Clientes Titulares para Visualizar! \nCrie um Cliente Titular Primeiro.\n`)
            return;
        }

        if (!Armazem.InstanciaUnica.Clientes.some(c => c.Titular !== '')) {
            console.log(`\nNão há Clientes Dependentes para Visualizar! \nCrie um Cliente Dependente Primeiro.\n`)
            return;
        }

        console.log('Iniciando a listagem do titular por um dependente específico...')

        this.processo = new ListagemEdicaoDependente()
        this.processo.processar()

        let sub = true
        let dependenteCPF: string = '';
        let dependenteEncontrado: Cliente = new Cliente('', '', new Date());
        while (sub) {
            dependenteCPF = this.entrada.receberTexto('CPF do Dependente: ')
        
            const clienteEncontrado = Armazem.InstanciaUnica.Clientes.find(cliente => 
                cliente.Documentos.some(doc => doc.Tipo === 'Cadastro de Pessoas Física' && doc.Numero === dependenteCPF) && 
                cliente.Titular !== '' 
            );

            if (clienteEncontrado) {
                dependenteEncontrado = clienteEncontrado
                sub = false;
                break;
            } else {
                console.log('Titular Não Encontrado');
                return;
            }
        }

        // guardando o index do Titular pelo CPF no Titular do dependente
        let indexTitular = Armazem.InstanciaUnica.Clientes.findIndex(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoas Física' && d.Numero == dependenteEncontrado.Titular))

        console.log("Titular:")
        // impressão do titular
        this.impressor = new ImpressorCliente(Armazem.InstanciaUnica.Clientes[indexTitular])
        console.log(this.impressor.imprimir())

        console.log('Finalizando a listagem do titular por um dependente específico...')

    }
}