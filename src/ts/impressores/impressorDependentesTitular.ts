import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class ImpressorDependentesTitular implements Impressor {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        this.cliente = cliente;
    }

    imprimir(): string {
        let armazem = Armazem.InstanciaUnica;

        let CPF = this.cliente.Documentos.find(d => d.Tipo == 'Cadastro de Pessoas Física');
        let impressao = `****************************\n`
                      + `| Titular Nome: ${this.cliente.Nome} ` + `| Titular CPF: ${CPF?.Numero}\n` + `| Dependentes:\n`;

        let dependentesImpressao = this.cliente.Dependentes.map((dependente) => {

            let clienteDependente = armazem.Clientes.find(d => d.Documentos.some(c => c.Tipo == 'Cadastro de Pessoas Física' && c.Numero == dependente));

            if (clienteDependente) {
                return `| Nome: ${clienteDependente.Nome} | CPF: ${dependente}`;
            } else {
                return `| CPF: ${dependente} (Dependente não encontrado)`;
            }
            
        }).join('\n');

        impressao = impressao + dependentesImpressao + `\n****************************`;
        return impressao;
    }
}