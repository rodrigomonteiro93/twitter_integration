    Instalação e execução

Comandos personalizados no package.json na raiz do projeto (será necessário o uso de 2 servidores)
- npm run create-api

Este comando executa a instalação de dependências, criação de banco de dados Sqlite com migração usando ORM Sequelize e inicia o servidor.

- npm run create-frontend

Este comando executa a instalação de dependências, e inicia o servidor.

------------------

    Avisos

* <b>Só será possivel visualizar o tweet aprovado se você estiver com uma segunda aba aberta na página /telao no momento da aprovação.</b>
* <b>Ao voltar na home você pode alterar a hashtag.</b>

------------------

    Servidor API

API desenvolvida com nodejs, Sequelize, Sqlite e socket.io.

------------------

    Routes API (Get)

* http://localhost:3333/tweets/hashtag ( hashtag = hashtag que ira consultar na API do twitter. )
* http://localhost:3333/tweet/id ( id = id do tweet salvo no banco de dados. )
* http://localhost:3333/tweets/approve/id ( id = id do tweet salvo no banco de dados. )
* http://localhost:3333/tweets/reprove/id  ( id = id do tweet salvo no banco de dados. )

------------------

    UI

UI desenvolvido com React, react-router-dom V6, axios e socket.io

------------------

    Routes UI

* http://localhost:3000/
* http://localhost:3000/tweets ( página de aprovação dos tweets, explicação do funcionamento mais abaixo. )
* http://localhost:3000/telao ( página de exibição dos tweets após aprovar, explicação do funcionamento mais abaixo. )


------------------

    Funcionamento Request de tweets

* Na página home deve-se informar por qual hashtag será feita a Query na API do Twitter.
* Ao submeter o formulário esta hashtag é salva no localstorage e o usuário é redirecionado para a página /tweets.
* Ao acessar a página /tweets é disparada uma request para a API onde ocorre o seguinte processo:
* * Primeiro busca por todos os tweets no banco de dados com aquela hashtag enviada.
* * Filtro este resultado buscando todos os Pendentes.
* * Se existir algum Pendente estes são envio os 10 primeiros para a view.
* * Se não encontra nenhum Pendente é disparada uma Request para a API do Twitter trazendo 50 ultimos resultados pela Hashtag.
* * Se não encontra novos tweets retorna vazio para o UI e uma nova request sera feita depois de 10 segundos.
* * Se encontrar tweets é feita uma filtro para retirar os retweets e os já cadastrados no banco de dados (query executada no inicio do processo).
* * Pega os ultimos 10 resultados deste ultimo filtro, salva no banco e envia para a View.

------------------

    Funcionamento Aprovação/Rejeição de tweets

Abrir a página telão para fazer a conexão do Ui com o servidor via

* Ao Aprovar um tweet é disparada uma request que vai mudar status para true e salvar o id do usuário. ( Momentaneamente salvando fixo 1 ).
* * É Emitida uma notificação via socket.io para o servidor enviando o id aprovado.
* * O servidor avisa todos os usuarios que estão assistindo a página /telao. ( IMPORTANTE deixar esta tela aberta ).
* * A página /telao recebe a notificação e busca o tweet no backend.
* * É retirado o tweet anterior e exibido o recem aprovado.
* Ao Rejeitar um tweet é disparada uma request que vai mudar o status para false.