import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import Armazem from "../../dominio/armazem";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let numero: string
        let passaporteExistente: boolean

        do {
            numero = this.entrada.receberTexto('Qual o número do documento?')
            passaporteExistente = Armazem.InstanciaUnica.Clientes.some(cliente =>
                cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.Passaporte && doc.Numero === numero)
            )
            if (passaporteExistente) {
                console.log('Passaporte já existe. Por favor, insira um passaporte diferente.')
            } else if (isNaN(Number(numero))) {
                console.log('Número de passaporte inválido. Por favor, insira um número composto apenas por números.')
                passaporteExistente = true
            }
        } while (passaporteExistente || !numero)

        let dataExpedicao: Date
        do {
            dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
            if (isNaN(dataExpedicao.getTime())) {
                console.log('Data inválida. Por favor, insira uma data válida.')
            }
        } while (isNaN(dataExpedicao.getTime()))

        let pass = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)
        this.cliente.Documentos.push(pass)
    }
}