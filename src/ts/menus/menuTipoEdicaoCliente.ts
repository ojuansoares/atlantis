import Menu from "../interfaces/menu";

export default class MenuTipoEdicaoCliente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Qual o tipo do cliente para edição? `)
        console.log(`----------------------`)
        console.log(`| 1 - Titular`)
        console.log(`| 2 - Dependente`)
        console.log(`----------------------`)
    }
}