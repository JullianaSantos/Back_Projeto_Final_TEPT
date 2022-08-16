# Back_Projeto_Final
Backend do projeto final - Programa Start

<h1 align="center"> Instituto TEPT </h1>


O Instituto TEPT é uma telemedicina que visa o atendimento especializado para pessoas que sofrem de TEPT (Transtorno Estresse Pós-Traumático), causado por brigas de transito, acidentes, assaltos e etc. Nosso 
objetivo é que pessoas com poucos recursos tenham acesso ao tratamento de qualidade com psicólogos, psiquiatras
e assistes sociais. 


Tecnologias Utilizadas

Para o desenvolvimento do back-end do projeto, utilizamos o Noje Js por ter grande harmonia com o front-end já que ambos utilizam o JavaScript, além de ter um ótimo uso de mémoria e por ser de baixo custo.

Usamos algumas bibliotecas e frameworks para que aplicação rodasse da melhor forma e para que estivesse de acordo com o objetivo do nosso projeto, foram elas: 

 * bcryptjs: método de criptografia do tipo hash para senhas; <br>
 * body-parser: converte o body da requisição para vários formatos, inclusive json; <br>
 * cors: informa aos navegadores se determinado recurso pode ser ou não acessado;<br>
 * dotenv: é utilizada para orquestrar as variáveis ambiente de um projeto;<br>
 * express: fornece recursos para aplicativos web e auxilia na contrução dos métodos HTTP;<br>
 * heroku: é uma plataforma na nuvem utilizada para fazer o deploy de várias aplicações back-end seja para hospedagem, testes em produção ou escalar as aplicações; <br>
 * jsonwebtoken: é um sistema de transferência de dados que pode ser enviado via URL, POST ou em um cabeçalho HTTP (header) de maneira segura; <br>
 * mongoose: é uma ODM do MongoDB que facilita o uso do mesmo e a modelagem de dados; <br>
 * multer: é um middleware node.js para manipulação multipart/form-data, usado principalmente para fazer upload de arquivos; <br>
 * nodemailer: módulo que facilita o envio de emails no nodejs. 

Estrutura da Aplicação 

Nossa api está estruturada em uma pasta principal chamada src que contém 8 subpastas com a base da aplicação. A pasta config contém as configurações do token, da conexão com o banco de dados MongoDB e da parte de upload de imagem. A pasta controllers contém a lógica dos CRUDs da nossa aplicação. A de middlewares contém as autenticações com o jwt. A dos models contém o modelo de organização dos dados que serão enviados para o banco de dados. A modules possui as configurações e estrutura dos emails que serão enviados. A pasta de requests possui as requisições HTTPs(post/put/get/delete) e as validações das mesmas. Já a tmp é para onde as imagens inicialmente irão depois que usuário fizer o update, as informações delas serão encaminhadas para o banco de dados. O nosso index possui as rotas de inicialização, além da porta que será utilizada a url ou o localhost. O gitignore foi utilizado para não subir para o github dados sensiveis. 

Funcionalidades

O usuário conseguirá se cadastrar no nosso site, fazer o login, mudar a foto de perfil, fazer modificações das suas informações, marcar consultas, caso ele esqueça a senha, conseguirá facilmente modificá-la. Poderá também entrar em contato mandando suas sugestões ou dúvidas.


Conclusão

 O Instituto TEPT visa a praticidade do usuário, observando sempre o nosso público alvo que precisa de algo rápido e que não lhe cause qualquer tipo de estresse. Além de ser uma ótima plataforma para que os nossos médicos trabalhem. 

<br>

# Equipe Desenvolvedora: Rocket of Technology(ROT)

* [Ananias Nicolau](https://github.com/NaniasNic)
* [Erika Ximenes](https://github.com/Erikaximenes)
* [Dayanny Gyselly](https://github.com/Dayanny1)
* [Julliana Vitória](https://github.com/DevJulliana)