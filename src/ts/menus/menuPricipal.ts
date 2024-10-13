import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Por favor, selecione uma opção...`)
        console.log(`----------------------`)
        console.log(`| Opções para Cliente:`)
        console.log(`----------------------`)
        console.log(`| 1 - Cadastrar Cliente`)
        console.log(`| 2 - Editar Cliente`)
        console.log(`| 3 - Listar Cliente(s)`)
        console.log(`| 4 - Excluir Cliente`)
        console.log(`----------------------`)
        console.log(`| Opções Para Gestão:`)
        console.log(`----------------------`)
        console.log(`| 5 - Listar Acomodações`)
        console.log(`| 6 - Listar Hospedes por Acomodação`)
        console.log(`| 7 - Vincular Hospede a Acomodação`)
        console.log(`| 8 - Desvincular Hospede de Acomodação`)
        console.log(`----------------------`)
        console.log(`****************************`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}