import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Armazem from "../../dominio/armazem";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero: string
        let rgExistente: boolean

        do {
            numero = this.entrada.receberTexto('Qual o número do documento?')
            rgExistente = Armazem.InstanciaUnica.Clientes.some(cliente =>
                cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.RG && doc.Numero === numero)
            )
            if (rgExistente) {
                console.log('RG já existe. Por favor, insira um RG diferente.')
            } else if (isNaN(Number(numero))) {
                console.log('RG inválido. Por favor, insira um RG composto apenas por números.')
                rgExistente = true
            }
        } while (rgExistente || !numero)

        let dataExpedicao: Date
        do {
            dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
            if (isNaN(dataExpedicao.getTime())) {
                console.log('Data inválida. Por favor, insira uma data válida.')
            }
        } while (isNaN(dataExpedicao.getTime()))

        let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)
        this.cliente.Documentos.push(rg)
    }
}