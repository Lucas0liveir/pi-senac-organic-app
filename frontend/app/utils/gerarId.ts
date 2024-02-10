export function gerarIdPedido() {
    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const hora = dataAtual.getHours().toString().padStart(2, '0');
    const minuto = dataAtual.getMinutes().toString().padStart(2, '0');
    const segundo = dataAtual.getSeconds().toString().padStart(2, '0');
    const milissegundo = dataAtual.getMilliseconds().toString().padStart(3, '0');
    const numeroAleatorio = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    const idPedido = `${ano}${mes}${dia}${hora}${minuto}${segundo}${milissegundo}${numeroAleatorio}`;

    return idPedido;
}