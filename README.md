# Projeto de jogo da memória

- [Hospedado em](#hospedado-em)
- [Bibliotecas](#bibliotecas)
- [Startup de projeto](#startup-de-projeto)
- [Requisitos funcionais](#requisitos-funcionais)
- [Regras de negócio](#regras-de-negocio)
- [Casos de uso](#casos-de-uso)
  - [Registar jogador](#registar-jogador)
  - [Começar Partida](#começar-partida)
  - [Selecionar Jogada](#selecionar-jogada)
  - [Verificar jogada valida](#verificar-jogada-valida)
  - [Encerrar o jogo](#encerrar-o-jogo)
  - [Resetar um jogo](#resetar-um-jogo)
  - [Escolher novo jogador](#escolher-novo-jogador)
  - [Ranking de partidas](#ranking-de-partidas)
- [Rotas da aplicação](#rotas-da-aplicação)
- [Stores](#stores)
- [Componentes](#componentes)
- [Models](#models)

## Hospedado em

[https://memorygame.igormeirelles.dev/](https://memorygame.igormeirelles.dev/)

## Bibliotecas

- Vue 3
- Pinia
- Vue Router
- vue-confetti-explosion
- uuid

## Startup de projeto

```
node: 22.14.0
npm: 11.7.0
```

```sh
npm install
```

```sh
npm run dev
```

## Requisitos funcionais

- Como jogador eu gostaria de jogar uma partida de jogo da memoria
- Como jogador eu gostaria de escolher uma carta por vez com o fim de escolher uma jogada
- Como jogador eu gostaria de inserir o meu nome com o fim de controlar as partidas que jogo
- Como jogador eu gostaria de ver o ranking de todas as partidas realizadas

## Regras de negocio

- O Jogo da memoria consiste em um numero de x de pares de cartas cujo valor não será mostrado até que a mesma seja escolhida. O jogo é consistido em rodadas e o numero de rodadas deve ser contabilizado. O Jogo termina quando todos os pares de cartas forem exibidos.
- Toda carta tem o seu par e possui parte de trás (valor escondido) e parte da frente (valor exibido). A carta deve possuir id, conteúdo (o que é exibido para o jogador, pode ser imagem ou pode ser um texto), valor da carta (o que será comparado pelo sistema para garantir igualdade), visível ou não
- Uma rodada/round é definida a partir do momento em que duas cartas do jogo são selecionadas. Uma rodada é concluída toda vez que o usuário escolhe duas cartas
- O jogo finaliza quando todas as cartas estiverem visíveis
- Uma jogada é considera inválida toda vez que o par de cartas exibido é diferente
- As cardas de uma jogada inválida devem ser escondidas apos a finalização da rodada
- Apenas uma carta por vez deve ser exibida por jogada
- Não deve ser possível jogar sem entrar com um nome
- Não deve ser possível uma partidas só pode começar com um jogador registro. Partidas sem jogador devem ser invalidadas

## Casos de uso

### Registar jogador

Deve ser possível para um jogador se registar com o nome na tela principal do jogo antes de começar a partida.

Deve ser apresentado ao usuário um campo de input que será responsável por guardar o nome de usuário e um botão para que ele possa confirmar o registro.

Após o registro o usuário deve ser direcionado para o tabuleiro do jogo

### Começar Partida

O sistema deve capaz de preparar as condições para que uma partida comece dentre elas: Zerar e embaralhar o tabuleiro, zerar scores, zerar escolhas de jogador.

Ao iniciar a partida deve ser exibido para o usuário as cartas do jogo com valores escondidos. Deve também ser possível visualizar o nome do jogador atual e a quantidade de rodadas da partida atual

### Selecionar Jogada

Deve ser possível para o jogador selecionar uma carta que esteja escondida com o fim de realizar uma jogada.

A seleção de uma única carta a torna visível.

### Verificar jogada valida

Ao selecionar duas jogadas o sistema deve verificar se as cartas são idênticas.

Caso sejam idênticas o sistema deve considerar a jogada valida e não esconder a carta.

Caso sejam diferentes o sistema deve esconder ambas as cartas com o cuidado de mostrar ao jogador as duas cartas escolhidas.

### Encerrar o jogo

O sistema deve ser capaz de encerrar o jogo uma vez que todas as cartas do jogo estejam exibidas com os seus respectivos pares.

Ao encerrar o jogo deve ser mostrado ao usuário uma interação de finalização e opções para que o jogo seja iniciado novamente ou um novo usuário seja escolhido.

Ao encerrar uma jogo o jogador registrado deve ser adicionado ao ranking de jogadores.

### Resetar um jogo

Logica semelhante a Começar a partida, porém não precisa escolher novamente um jogador, apenas restaurar as condições iniciais do jogo

### Escolher novo jogador

Deve ser possível para um jogador que terminou uma partida escolher outro nome de jogador para jogar novamente.

Ao escolher a opção de novo jogador deve ser direcionado para a tela inicial do jogo.

### Ranking de partidas

O sistema deve exibir na tela principal o ranking de jogadores em ordem crescente do jogador com menos jogadas para o jogador com mais jogadas

O ranking deve mostrar a posição, nome e quantidade de rounds realizados

## Segurança da aplicação

Rotas que possuem o meta `requiresAuth` não serão acessíveis sem um nome de usuário que é especificado na rota principal `/` o nome é guardado na store e acessado dentro do vueRouter

## Rotas da aplicação

### /

Responsável por exibir a tela de registro: (input com nome de usuário), dar inicio ao jogo e exibir ranking de jogadas

### /game

rota responsável pela logica e usabilidade do jogo. protegida pela variável `currentPlayerName` existente na store de player, caso a mesma não tenha preenchimento o método `beforeEach`do vue router vai redirecionar o usuário para a tela principal

## Stores

Foi utilizado o pinia para gerenciamento de estado global da aplicação com dois módulos de state o `player` e o `game`

### Player

Responsável por guardar as variáveis que estão relacionadas com o usuário como:

- nome do usuário que está jogando (`currentPlayerName`)
- ranking de jogadas (`ranking`) que deve ser acessado utilizando a o getter `rankingOrdered` para exibição de jogos ordenados

### Game

Responsável por toda a regra de negocio do jogo como:

- Start de jogo (action `startGame`): responsável por embaralhar as cardas criadas no seed da função `seedCards` e guarda-las na variável , zerar as jogadas do usuário `chosenCards` e resetar os rounds do usuário (`gameRounds` acessada pelo getter `rounds`)

- Logica de execução de jogada (action: `executePlay`): A cada jogada um objeto do tipo `Card` é adicionado ao array de `chosenCards`, quando o array possui dois elementos a logica de igualdade de cartas é executada. Por fim a função incrementa uma rodada a variável de (`gameRounds`) e reseta as jogadas feitas `chosenCards`

- Logica de igualdade de cartas: Caso todas as cartas da variável `chosenCads` sejam diferentes a logica dispara um `setTimeout` para esconder as cartas exibidas anteriormente, isso para que o jogador possa ter tempo para ler o par de cartas que foi mostrado incorretamente. Caso as cartas sejam iguais ele deixa a exibição do jogo em amostra

## Pages

Nessa pasta se encontram as views/pages do jogo em questão. As pages são responsáveis por conter todos os componentes que são exibidos por uma pagina.

Na aplicação foram utilizadas duas paginas: `HomeView` e `GameView` cada um com a sua respectiva rota registrada dentro de `routes/index.tsx`

Uma observação é que a logica de puxar um jogo ganho para o ranking está dentro da page `GameView`, foi utilizado um hook `watch` para monitorar a variável `endGame` da store de game e quando o fim do jogo é atingido (todas as cartas são exibidas) é chamada a action `addPlayerToRanking` da store de player com as informações de jogador e o array de ranking é incrementado

## Componentes

Foram divididos em componentes globais da ui `/componentes/ui` e componentes de tela `/componentes/:name`

Divididos em alguns módulos:

### /memory-board

Os componentes que sao exibidos no tabuleiro do jogo como:

- Card de item (`MemoryCard.vue`)
- Header de contador e exibição de jogador (`MemoryCounter.vue`)
- Mensagem de jogo vencido e seus controles (botões) (`WinnerMessage.vue`)

### /player-selection

Responsável pela seção de escolha de jogador:

- Titulo de exibição do nome do jogo com instruções (`TitlePlayerSelection.vue`)
- Inputs e botões utilizados estão dentro do (`CardPlayerSelection.vue`) e são componentes globais da aplicação

### /ranking

Responsável pela exibição do ranking na tela

- `Ranking.vue`: guarda os componentes e o acesso a variável da store de player para buscar o ranking das jogadas

- `PlayerRanking.vue`: responsável pelo nome do usuário e sua estilização

- `Position.vue`: guarda a posição de usuário e a estilização desse jogador

- `ScoreRanking.vue`: guarda a quantidade de rounds que foi levado para que o usuário conseguisse finalizar o jogo e sua estilização

- `RankingCard.vue`: orquestra os componentes  `PlayerRanking.vue`, `Position.vue`, `ScoreRanking.vue` e a estilização de sua exibição

### /ui

Responsável pelos componentes globais da aplicação

- `InputApp.vue`: guarda o input utilizado na aplicação

- `ButtonApp.vue`: guarda o botão da aplicação e suas varições `primary` ou secondary, sendo estilizado em acordo com a variação escolhida.

## Models

Responsável pelas entidades utilizadas na aplicação.

`Card.ts`:
 ela é responsável por conter as informações de um card do jogo da memoria, optou-se por utilizar classe para que a logica de exibição `showCard`/`hideCard` não ficasse de fora do escopo dos parâmetros que constituem um card, respeitando assim o encapsulamento`
