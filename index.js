import express from 'express';
const app = express();
const host = '0.0.0.0'; 
const porta = 2000; 

function gerarPaginaTabuada(requisicao, resposta) {
    try {
        const numero = Number(requisicao.query.numero);  
        let respostadamultiplicacao = `
        <!DOCTYPE html>	
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tabuada do ${numero}</title>
            </head>
            <body>
                <h1>Tabuada ${numero}</h1>
                <ul>`; 
        for (let i = 0; i <= 10; i++) {
            const linha = `<li>${numero} x ${i} = ${numero * i}</li>`;
            respostadamultiplicacao += linha;
        }
        respostadamultiplicacao += `
                </ul>
            </body>
        </html>`;
        resposta.end(respostadamultiplicacao);
    } catch (erro) {
        resposta.end(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Erro ao processar a tabuada de um número</title>
            </head>
            <body>
                <h2>Erro ao acessar a TABUADA</h2>
                <h2>Para garantir seu acesso digite: http://localhost:2000/tabuada?numero=2</h2>
                <h3>${erro.message}</h3> 
            </body>
        </html>
        `);
    }
}

app.get('/tabuada', gerarPaginaTabuada);

app.listen(porta, host,  () => {
    console.log(`Servidor executando em http://${host}:${porta}.`);
});
