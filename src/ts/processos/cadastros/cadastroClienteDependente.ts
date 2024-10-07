import Processo from "../../abstracoes/processo";

export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente dependente...')
    }
}