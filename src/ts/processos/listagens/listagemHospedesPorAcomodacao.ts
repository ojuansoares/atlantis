import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Impressor from "../../interfaces/impressor";
import Acomodacao from "../../modelos/acomodacao";
import ListagemAcomodacoesSimples from "./listagemAcomodacoesSimples";

export default class ListagemHospedesPorAcomodacao extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        console.clear()
        let armazem = Armazem.InstanciaUnica;

        if (!this.acomodacoes.some(a => a.Acomodados.length !== 0)) {
            console.log(`\nNão há Clientes Acomodados para listar! \nVincule um Cliente a uma Acomodação Primeiro.\n`)
            return;
        }

        console.log('Iniciando da listagem de Hospedes por Acomodação...')

        this.processo = new ListagemAcomodacoesSimples()
        this.processo.processar()

        let sub2 = true
        let indexAcomodacao = 0
        while (sub2) {
            indexAcomodacao = this.entrada.receberNumero('Índice da Acomodação para Desvincular um Cliente:')
        
            if (indexAcomodacao >= 0 && indexAcomodacao < this.acomodacoes.length) {
                if (this.acomodacoes[indexAcomodacao].Acomodados.length == 0) {
                    console.log('Não há Acomodados Vinculados a esta Acomodação');
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
        this.acomodacoes[indexAcomodacao].Acomodados.forEach((acomodado) => {
            let cliente = armazem.Clientes.find(c => c.Documentos.some(d => d.Tipo === 'Cadastro de Pessoa Física' && d.Numero === acomodado));
            if (cliente) {
                console.log(`| Nome: ${cliente.Nome} | CPF: ${acomodado}`)
            }
        })
        console.log(`****************************`)

    }
}