# Back_Projeto_Final
Backend do projeto final - Programa Start

<h1 align="center"> Instituto TEPT </h1>


O Instituto TEPT é uma telemedicina que visa o atendimento especializado para pessoas que sofrem de TEPT (Transtorno Estresse Pós Traumatico), causado por brigas de transito, acidentes, assaltos e etc. Nosso 
objetivo é que pessoas com poucos recursos tenham acesso ao tratamento de qualidade com psicólogos, psiquiatras
e assistes sociais. 


Tecnologias Utilizadas

Para o desenvolvimento do back-end do projeto, utilizamos o Noje Js por ter grande harmonia com o front-end já que ambos utilizam o JavaScript, além de ter um ótimo uso de mémoria e por ser de baixo custo.

Usamos algumas bibliotecas e frameworks para que aplicação rodasse da melhor forma e para que estivesse de acordo com o objetivo do nosso projeto, foram elas: 

bcryptjs: método de criptografia do tipo hash para senhas; <br>
body-parser: converte o body da requisição para vários formatos, inclusive json; <br>
cors: informa aos navegadores se determinado recurso pode ser ou não acessado;<br>
dotenv: é utilizada para orquestrar as variáveis ambiente de um projeto;<br>
express: fornece recursos para aplicativos web e auxilia na contrução dos métodos HTTP;<br>
heroku: plataforma nuvem que faz deploy de várias aplicações back-end seja para hospedagem, testes em produção ou escalar as aplicações; <br>
jsonwebtoken: sistema de transferência de dados que pode ser enviado via URL, POST ou em um cabeçalho HTTP (header) de maneira segura; <br>
mongoose: é uma ORM do MongoDB que facilita o uso do mesmo e a modelagem de dados do objeto; <br>
multer: é um middleware node.js para manipulação multipart/form-data, usado principalmente para fazer upload de arquivos; <br>
nodemailer: módulo que facilita o envio de emails no nodejs. 

Estrutura da Aplicação 

Nossa api está estruturada em uma pasta principal chamada src que contém 8 subpastas com a base da aplicação. A pasta config contém as configurações do token, da conexão com o banco de dados MongoDB e da parte de upload de imagem. A pasta controllers 
