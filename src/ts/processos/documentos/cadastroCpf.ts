import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Armazem from "../../dominio/armazem";

export default class CadastroCpf extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {

        let numero: string
        let cpfExistente: boolean

        do {
            numero = this.entrada.receberTexto('Qual o número do documento?')
            cpfExistente = Armazem.InstanciaUnica.Clientes.some(cliente =>
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === numero)
            )
            if (cpfExistente) {
                console.log('CPF já existe. Por favor, insira um CPF diferente.')
            } else if (isNaN(Number(numero))) {
                console.log('CPF inválido. Por favor, insira um CPF composto apenas por números.')
                cpfExistente = true
            }
        } while (cpfExistente || !numero)

        let dataExpedicao: Date
        do {
            dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
            if (isNaN(dataExpedicao.getTime())) {
                console.log('Data inválida. Por favor, insira uma data válida.')
            }
        } while (isNaN(dataExpedicao.getTime()))
        let cpf = new Documento(numero, TipoDocumento.CPF, dataExpedicao)
        this.cliente.Documentos.push(cpf)
    }
}