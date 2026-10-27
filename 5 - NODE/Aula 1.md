# Aula 1 — Introdução ao Node.js, Módulos e npm

---

## Objetivos da aula

Hoje o JavaScript sai do navegador e passa a rodar direto no computador. Ao final da aula, você deve conseguir:

- **Explicar** o que é Node.js, o papel do motor V8 e por que o Node não fica parado esperando tarefas demoradas.
- **Diferenciar** o que existe no navegador (`document`, `window`) do que existe no Node (`fs`, `os`, `process`).
- **Executar** arquivos `.js` pelo terminal com o comando `node`.
- **Criar** um `package.json`, instalar e remover pacotes e escrever scripts npm.
- **Organizar** o código em módulos próprios com `export` e `import`.
- **Ler e gravar** arquivos de texto e JSON com `fs/promises`.
- **Obter** informações do computador (memória, processador, plataforma) com `os`.

---

## Antes de começar

**Confira se está tudo instalado.** No terminal do VS Code, rode:

```bash
node -v
npm -v
```

Os dois devem mostrar um número de versão (por exemplo `v22.11.0` e `10.9.0`). Se der erro, instale a versão **LTS** do Node em [nodejs.org](https://nodejs.org). O npm vem junto.

**Usa Windows?** Se ao rodar `npm` aparecer a mensagem *"a execução de scripts foi desabilitada neste sistema"*, troque o terminal do VS Code para **Command Prompt** ou **Git Bash** (setinha ao lado do `+` no terminal). Outra opção é rodar uma vez, no PowerShell:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**Vale revisar:**

- `async/await` e `try/catch` (módulo de JavaScript assíncrono)
- `JSON.parse` e `JSON.stringify` (usados com `fetch` e `localStorage`)
- `import` e `export` (usados no React)
- Arrays de objetos com `forEach`, `filter` e `find`
- Comandos de terminal: `cd`, `ls` (ou `dir`), `mkdir`

---

## 1. Introdução ao Node.js

### O que é

Node.js é um **runtime**: um programa que executa JavaScript **fora do navegador**. Ele foi criado em 2009 a partir do motor V8, o mesmo do Google Chrome.

Por que isso importa:

- Você usa **a mesma linguagem** no front-end e no back-end.
- O Node é muito bom em tarefas de **entrada e saída**: ler arquivos, conversar com banco de dados, responder pedidos de outros programas.

### A receita e as cozinhas

Pense assim:

- O **código JavaScript** é a receita.
- O **motor V8** é o cozinheiro que sabe ler a receita.
- O **navegador** e o **Node** são duas cozinhas diferentes, com o mesmo cozinheiro.

A receita é a mesma, mas os utensílios mudam. No navegador existe o `document`, para mexer na página. No Node existe o `fs`, para mexer em arquivos, e o `os`, para consultar o computador.

### Navegador × Node.js

| | Navegador (Chrome) | Node.js |
| --- | --- | --- |
| Onde roda | Na máquina de quem visita o site | No servidor (ou no seu computador, enquanto desenvolve) |
| Para quê | Interface: mostrar coisas na tela e reagir a cliques | Lógica, dados, arquivos, APIs |
| Tem | `document`, `window`, `alert`, `localStorage` | `fs`, `os`, `process`, `http` |
| Não tem | Acesso livre aos arquivos do computador (por segurança) | DOM: não existe página |
| Como executa | Abrindo um HTML | `node arquivo.js` no terminal |
| Onde aparece o `console.log` | DevTools (F12) | No próprio terminal |
| Em comum | `console`, `setTimeout`, `Promise`, `JSON`, `fetch` | os mesmos |

> **Lembra do `fetch` para a ViaCEP?** Você estava do lado do **cliente**, pedindo dados. Do outro lado existia um programa recebendo o pedido e respondendo. Nas próximas aulas, esse programa vai ser **seu**, escrito em Node.

### Como o Node é por dentro

O Node é feito de três partes:

- **V8:** traduz o JavaScript para código de máquina, que o processador entende. É o que deixa o JS rápido.
- **libuv:** cuida das tarefas demoradas (ler o disco, acessar a rede, contar tempo) em segundo plano.
- **Módulos do Node:** ferramentas prontas como `fs`, `os` e `http`, que o navegador não oferece.

### Eventos assíncronos e o event loop

O JavaScript executa **uma coisa de cada vez**. Mesmo assim, o Node consegue atender muita coisa ao mesmo tempo, porque **não fica parado esperando**.

Imagine um garçom sozinho num restaurante. Ele anota o pedido da mesa 1, entrega para a cozinha e vai atender a mesa 2, em vez de ficar parado na porta da cozinha. Quando o prato fica pronto, a cozinha avisa e ele vai entregar.

- O garçom é o **JavaScript**.
- A cozinha é a **libuv**.
- O "aviso" é o **callback** ou a **Promise** resolvida.
- O vai-e-volta do garçom é o **event loop**.

### Exemplo 1: primeiro programa fora do navegador

Crie o arquivo `ola.js`:

```js
// ola.js — nosso primeiro programa fora do navegador
const libraryName = 'Biblioteca Municipal';
const books = ['Dom Casmurro', 'O Cortiço', 'Iracema'];

console.log(`Bem-vindo à ${libraryName}!`);
console.log(`Temos ${books.length} livros no acervo.`);

// process é um objeto que só existe no Node: informações sobre o programa em execução
console.log('Versão do Node:', process.version);
console.log('Pasta de onde rodei o programa:', process.cwd());

// Se você tirar o // da linha abaixo, o programa quebra: no Node não existe página, logo não existe document
// document.querySelector('h1');
```

No terminal, dentro da pasta do arquivo:

```bash
node ola.js
```

Saída esperada (a versão e a pasta variam):

```
Bem-vindo à Biblioteca Municipal!
Temos 3 livros no acervo.
Versão do Node: v22.11.0
Pasta de onde rodei o programa: C:\Users\aluno\biblioteca-node
```

Se você ativar a linha do `document`, aparece: `ReferenceError: document is not defined`.

### Exemplo 2: o event loop na prática

Crie `event-loop.js` e, **antes de rodar**, tente adivinhar em que ordem as mensagens vão aparecer:

```js
// event-loop.js — em que ordem as coisas acontecem?
console.log('Abrindo a biblioteca');

// Tarefa demorada: o Node agenda e segue em frente
setTimeout(() => {
  console.log('O livro reservado chegou (2 segundos depois)');
}, 2000);

// Mesmo com 0 ms, este aviso espera o código atual terminar
setTimeout(() => {
  console.log('Café pronto (0 ms, mas foi para a fila)');
}, 0);

console.log('Atendendo o próximo leitor enquanto espera');
```

Saída:

```
Abrindo a biblioteca
Atendendo o próximo leitor enquanto espera
Café pronto (0 ms, mas foi para a fila)
O livro reservado chegou (2 segundos depois)
```

O garçom terminou de atender o salão (o código de cima para baixo) antes de buscar qualquer prato na cozinha.

### Erros comuns

- **Digitar só `node` e ficar preso num `>`.** Isso é o REPL, um modo interativo. Para sair: `.exit` ou Ctrl+C duas vezes.
- **Rodar na pasta errada:** `Error: Cannot find module 'C:\...\ola.js'`. Confira com `ls` (ou `dir`) e entre na pasta certa com `cd`.
- **Usar `document`, `window` ou `alert` no Node:** `ReferenceError: ... is not defined`.
- **Esquecer de salvar (Ctrl+S)** antes de rodar e achar que "o código não mudou nada".
- **Achar que `setTimeout` com 0 ms executa na hora.** Ele sempre espera o código atual terminar.

---

## 2. Gerenciamento de pacotes com npm

### O que é

O **npm** (*Node Package Manager*) vem instalado junto com o Node. Ele é três coisas ao mesmo tempo:

1. Um **repositório online** ([npmjs.com](https://www.npmjs.com)) com milhões de pacotes prontos.
2. O **comando `npm`** no terminal.
3. O **arquivo `package.json`**, que descreve o seu projeto.

Ninguém reescreve do zero o que já existe: formatar datas, colorir o terminal, criar servidores, conectar no banco. Para isso usamos pacotes.

> **Você já usou o npm!** Quando rodou `npm create vite`, `npm install` e `npm run dev` no módulo de React, era o npm baixando o Vite, o React e o PrimeReact para dentro do projeto e executando um script. Agora vamos entender cada passo.

### Os três arquivos importantes

- **`package.json`** é a ficha do projeto e a lista de compras: nome, versão, scripts e quais pacotes ele precisa.
- **`node_modules/`** é a despensa: onde os pacotes baixados ficam guardados. Pode ser enorme e pode ser apagada; um `npm install` reconstrói tudo.
- **`package-lock.json`** é a nota fiscal: registra a versão exata de cada pacote, para que todo mundo instale exatamente igual.

### Comandos essenciais

| Comando | O que faz |
| --- | --- |
| `npm init -y` | Cria um `package.json` com valores padrão (o `-y` responde "sim" a todas as perguntas) |
| `npm install chalk` | Baixa o pacote para `node_modules` e anota em `dependencies` |
| `npm install` | Instala tudo que está listado no `package.json` (usado depois de clonar um repositório) |
| `npm uninstall chalk` | Remove o pacote e a anotação |
| `npm run dev` | Executa o script chamado `dev` |
| `npm start` | Atalho para `npm run start` |

### Versões

`"chalk": "^5.4.1"` quer dizer: versão **5** (maior), **4** (menor), **1** (correção).

O `^` aceita atualizações de menor e de correção (5.5.0, 5.4.2), mas nunca uma 6.x, que pode quebrar o seu código.

### Exemplo 3: projeto com pacote externo

No terminal:

```bash
mkdir biblioteca-node
cd biblioteca-node
npm init -y
npm install chalk
```

Edite o `package.json` para ficar assim (a versão do chalk pode ser diferente na sua máquina):

```json
{
  "name": "biblioteca-node",
  "version": "1.0.0",
  "description": "Sistema de biblioteca: versão Node.js",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "node --watch index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "chalk": "^5.4.1"
  }
}
```

- `"type": "module"` liga o `import`/`export` que você já usou no React.
- `start` roda o programa uma vez.
- `dev` usa `--watch`: o Node reinicia sozinho toda vez que você salva o arquivo. Para parar, Ctrl+C.

Crie o `index.js`:

```js
// index.js — usando um pacote externo instalado com npm
import chalk from 'chalk';

const books = [
  { title: 'Dom Casmurro', author: 'Machado de Assis', available: true },
  { title: 'O Cortiço', author: 'Aluísio Azevedo', available: false },
  { title: 'Iracema', author: 'José de Alencar', available: true },
];

console.log(chalk.bold.blue('=== Acervo da Biblioteca ==='));

books.forEach((book) => {
  // chalk.green e chalk.red devolvem o texto "pintado" para o terminal
  const status = book.available ? chalk.green('disponível') : chalk.red('emprestado');
  console.log(`${book.title} — ${book.author} [${status}]`);
});
```

Rode com `npm start`. Saída (colorida no terminal):

```
=== Acervo da Biblioteca ===
Dom Casmurro — Machado de Assis [disponível]
O Cortiço — Aluísio Azevedo [emprestado]
Iracema — José de Alencar [disponível]
```

### Não envie a despensa para o GitHub

Crie na raiz do projeto um arquivo chamado `.gitignore` com esta linha:

```
node_modules/
```

Quem clonar o seu projeto roda `npm install` e recebe tudo de novo, a partir do `package.json` e do `package-lock.json`.

### Erros comuns

- **Rodar `npm install` fora da pasta do projeto.** O npm cria arquivos no lugar errado ou dá erro `ENOENT`. Olhe sempre o caminho no terminal antes.
- **Esquecer o `"type": "module"`.** Aparece `Cannot use import statement outside a module` ou um aviso `MODULE_TYPELESS_PACKAGE_JSON`. A correção é a mesma: adicionar a linha.
- **Enviar `node_modules` para o GitHub** (são milhares de arquivos).
- **Digitar o nome do pacote errado.** Existem pacotes maliciosos com nomes parecidos com os populares. Confira em npmjs.com antes de instalar.
- **Deixar uma vírgula sobrando no `package.json`.** JSON não aceita vírgula depois do último item.

---

## 3. Trabalhando com módulos

### Cada arquivo é um módulo

No Node, cada arquivo `.js` é um **módulo**: uma caixa de código que **exporta** o que quer compartilhar e **importa** o que precisa. Existem três origens, e todas usam o mesmo `import`:

| Tipo | Exemplo | De onde vem |
| --- | --- | --- |
| Próprio | `import { formatBook } from './utils/format.js'` | Um arquivo seu (o caminho começa com `./`) |
| Interno (nativo) | `import { readFile } from 'node:fs/promises'` | Já vem com o Node, sem instalar nada |
| Externo | `import chalk from 'chalk'` | Instalado com npm, fica em `node_modules` |

O prefixo `node:` deixa claro que é um módulo nativo do Node.

Em tutoriais antigos você vai ver `const fs = require('fs')`. É o formato anterior (chamado CommonJS) e faz a mesma coisa. Neste curso usamos `import`.

> **Atenção, diferença do React:** no Vite, `import App from './App'` funcionava sem extensão. No Node, os seus módulos **precisam** do `.js` no final do caminho.

### Exemplo 4: módulo próprio

Crie a pasta `utils` e, dentro dela, o arquivo `format.js`:

```js
// utils/format.js — funções reutilizáveis do sistema da biblioteca

// Recebe um livro e devolve uma linha de texto bonita
export const formatBook = (book) => {
  const status = book.available ? 'disponível' : 'emprestado';
  return `#${book.id} ${book.title} (${book.author}, ${book.year}) — ${status}`;
};

// Conta quantos livros estão disponíveis
export const countAvailable = (books) => books.filter((book) => book.available).length;
```

---

## 4. Módulo `fs`: ler e gravar arquivos

### O que é

`fs` (*file system*) dá ao JavaScript acesso aos arquivos do computador, algo que o navegador proíbe por segurança.

Até ligarmos a API a um banco de dados de verdade, um arquivo JSON vai ser o "banco" provisório da nossa biblioteca.

### Duas formas de usar

- **Síncrona** (`readFileSync`): o programa **para e espera** o arquivo. É como ficar parado na fila do caixa.
- **Com Promises** (`node:fs/promises` + `await`): o Node pede o arquivo e fica livre para outras coisas até ele chegar. É como pegar uma senha e sentar.

Vamos usar a segunda forma. Num servidor, travar o programa significa deixar **todos** os usuários esperando.

Como o projeto usa `"type": "module"`, podemos usar `await` direto no arquivo, fora de qualquer função.

### Funções principais

| Função | O que faz |
| --- | --- |
| `readFile(caminho, 'utf-8')` | Lê o arquivo e devolve o texto |
| `writeFile(caminho, texto, 'utf-8')` | Cria ou **substitui** o arquivo inteiro |
| `appendFile(caminho, texto, 'utf-8')` | Acrescenta texto no final (bom para registros/logs) |
| `mkdir(caminho, { recursive: true })` | Cria uma pasta (sem erro se ela já existir) |

### Exemplo 5: o "banco" da biblioteca

Crie a pasta `data` e, dentro dela, `livros.json`:

```json
[
  { "id": 1, "title": "Dom Casmurro", "author": "Machado de Assis", "year": 1899, "available": true },
  { "id": 2, "title": "O Cortiço", "author": "Aluísio Azevedo", "year": 1890, "available": false },
  { "id": 3, "title": "Iracema", "author": "José de Alencar", "year": 1865, "available": true }
]
```

### Exemplo 6: ler um arquivo

`ler-livros.js`:

```js
// ler-livros.js — lê o acervo do arquivo JSON e mostra no terminal
import { readFile } from 'node:fs/promises';
import { formatBook, countAvailable } from './utils/format.js';

// readFile devolve TEXTO, igual ao que vem de uma resposta de fetch antes do .json()
const content = await readFile('./data/livros.json', 'utf-8');

// Texto → array de objetos
const books = JSON.parse(content);

books.forEach((book) => console.log(formatBook(book)));
console.log(`Disponíveis: ${countAvailable(books)} de ${books.length}`);
```

Rode com `node ler-livros.js`:

```
#1 Dom Casmurro (Machado de Assis, 1899) — disponível
#2 O Cortiço (Aluísio Azevedo, 1890) — emprestado
#3 Iracema (José de Alencar, 1865) — disponível
Disponíveis: 2 de 3
```

### Exemplo 7: gravar um arquivo e tratar erro

`adicionar-livro.js`:

```js
// adicionar-livro.js — acrescenta um livro ao acervo e salva no arquivo
import { readFile, writeFile } from 'node:fs/promises';

const FILE_PATH = './data/livros.json';

try {
  // 1. Ler o que já existe
  const content = await readFile(FILE_PATH, 'utf-8');
  const books = JSON.parse(content);

  // 2. Montar o novo livro (id simples: um a mais que o último id)
  const lastId = books.length > 0 ? books[books.length - 1].id : 0;
  const newBook = {
    id: lastId + 1,
    title: 'Vidas Secas',
    author: 'Graciliano Ramos',
    year: 1938,
    available: true,
  };

  books.push(newBook);

  // 3. Gravar de volta. null, 2 = JSON organizado com 2 espaços, fácil de ler
  await writeFile(FILE_PATH, JSON.stringify(books, null, 2), 'utf-8');
  console.log(`Livro "${newBook.title}" adicionado com id ${newBook.id}. Total: ${books.length}`);
} catch (error) {
  // ENOENT = "Error NO ENTry": o arquivo não foi encontrado
  if (error.code === 'ENOENT') {
    console.log(`Arquivo ${FILE_PATH} não encontrado. Você está na pasta certa?`);
  } else {
    console.log('Erro inesperado:', error.message);
  }
}
```

Na primeira execução:

```
Livro "Vidas Secas" adicionado com id 4. Total: 4
```

Rode de novo e abra o `livros.json`: o livro aparece **duplicado**, com id 5. O programa não verifica se o livro já existe. Guarde essa pergunta: "como evitar isso?". Vamos resolver quando chegarmos em validação, no módulo de Express.

---

## 5. Módulo `os`: informações do sistema

### O que é

`os` (*operating system*) consulta a máquina onde o Node está rodando: sistema, processador, memória, usuário.

Isso é útil porque servidores precisam se monitorar ("estou ficando sem memória?") e alguns programas precisam se comportar diferente no Windows e no Linux.

### Exemplo 8: ficha técnica do computador

`sistema.js`:

```js
// sistema.js — informações da máquina que está rodando o Node
import os from 'node:os';

const BYTES_IN_GB = 1024 * 1024 * 1024;

// Memória vem em bytes; dividimos para ter gigabytes. toFixed(1) = 1 casa decimal
const totalMemory = (os.totalmem() / BYTES_IN_GB).toFixed(1);
const freeMemory = (os.freemem() / BYTES_IN_GB).toFixed(1);

// uptime vem em segundos
const uptimeHours = (os.uptime() / 3600).toFixed(1);

console.log('Nome do computador:', os.hostname());
console.log('Plataforma:', os.platform()); // win32, linux ou darwin (macOS)
console.log('Arquitetura:', os.arch()); // x64, arm64...
console.log('Processador:', os.cpus()[0].model);
console.log('Núcleos:', os.cpus().length);
console.log(`Memória: ${freeMemory} GB livres de ${totalMemory} GB`);
console.log('Usuário:', os.userInfo().username);
console.log('Pasta pessoal:', os.homedir());
console.log(`Ligado há ${uptimeHours} horas`);
```

Saída (varia em cada máquina):

```
Nome do computador: LAB-PC-07
Plataforma: win32
Arquitetura: x64
Processador: Intel(R) Core(TM) i5-10400 CPU @ 2.90GHz
Núcleos: 12
Memória: 7.9 GB livres de 15.8 GB
Usuário: aluno
Pasta pessoal: C:\Users\aluno
Ligado há 3.4 horas
```

> Seu Windows é 64 bits e aparece `win32`? Normal: é só o nome histórico da plataforma no Node. A arquitetura real aparece em `os.arch()`.

### Erros comuns com módulos, `fs` e `os`

- **Esquecer o `.js` nos seus módulos:** `Cannot find module '.../utils/format'`.
- **Esquecer o `'utf-8'` no `readFile`:** vem algo como `<Buffer 5b 0a 20 ...>` em vez de texto.
- **Esquecer o `JSON.parse`** e tentar `books.forEach`: `books.forEach is not a function`, porque `books` ainda é texto.
- **Esquecer o `await`:** aparece `Promise { <pending> }`.
- **Rodar de outra pasta.** O caminho `./data/livros.json` é calculado a partir da pasta **onde o terminal está**, não de onde o arquivo `.js` está. Resultado: `ENOENT`.
- **Achar que `writeFile` acrescenta.** Ele **substitui** o arquivo inteiro. Para acrescentar, use `appendFile`.

---

## Como fica a pasta do projeto

```
biblioteca-node/
├── data/
│   └── livros.json
├── node_modules/        (ignorada pelo Git)
├── utils/
│   └── format.js
├── .gitignore
├── adicionar-livro.js
├── event-loop.js
├── index.js
├── ler-livros.js
├── ola.js
├── package-lock.json
├── package.json
└── sistema.js
```

---

## Exercícios

Todos são feitos dentro do projeto `biblioteca-node`.

### Exercício 1 (fácil): Cartão de visita da biblioteca

Crie `apresentacao.js` com:

- uma constante com o nome da biblioteca;
- uma constante com o endereço;
- um array com 5 títulos de livros.

O programa deve mostrar no terminal o nome, o endereço, a quantidade de livros (usando o array) e a versão do Node em uso.

**Pronto quando:** `node apresentacao.js` mostra 4 linhas, sem erro, e a quantidade de livros vem de `.length`, não de um número digitado.

### Exercício 2 (fácil): Data de devolução com um pacote npm

Instale o pacote `dayjs`. Crie `emprestimo.js` que mostre a data de hoje e a data de devolução (14 dias depois), ambas no formato dia/mês/ano. Crie no `package.json` um script chamado `emprestimo` que rode esse arquivo.

Dicas:

- `dayjs()` é "agora";
- `.add(14, 'day')` soma dias;
- `.format('DD/MM/YYYY')` formata (no dayjs o ano é `YYYY`).

**Pronto quando:** `npm run emprestimo` mostra algo como `Empréstimo: 26/10/2026 | Devolver até: 09/11/2026`, e `dayjs` aparece em `dependencies` no `package.json`.

### Exercício 3 (médio): Busca por autor em módulo próprio

1. Em `utils/format.js`, crie e exporte a função `findByAuthor(books, author)`, que devolve só os livros daquele autor.
2. Acrescente pelo menos mais um livro de Machado de Assis no `data/livros.json`.
3. Crie `buscar.js` que leia `data/livros.json`, use `findByAuthor` para buscar os livros de Machado de Assis e mostre cada um com `formatBook`.
4. Se não houver nenhum livro, mostre `Nenhum livro encontrado para <autor>`.

**Pronto quando:** a busca por "Machado de Assis" lista 2 ou mais livros, e trocando para um autor que não existe aparece a mensagem de nenhum encontrado.

### Exercício 4 (médio): Relatório do computador em arquivo

Crie `relatorio-sistema.js` que monte um texto com:

- a data e a hora da geração;
- pelo menos 5 informações do módulo `os` (nome do computador, plataforma, núcleos, memória livre e total em GB, usuário).

Grave esse texto em `relatorios/sistema.txt`, uma informação por linha. A pasta `relatorios` deve ser criada pelo próprio programa se não existir.

**Pronto quando:** você apaga a pasta `relatorios`, roda o programa, e a pasta e o arquivo aparecem com as informações.

### Exercício 5 (médio/difícil): Devolver um livro

Crie `devolver-livro.js` com uma constante `BOOK_ID` no topo. O programa deve:

1. Ler `data/livros.json`.
2. Encontrar o livro com aquele id. Se não existir, mostrar `Livro com id X não encontrado` e parar.
3. Se o livro já estiver disponível, mostrar `O livro já está disponível` e parar.
4. Caso contrário, mudar `available` para `true`, salvar o JSON e acrescentar uma linha em `data/historico.log` neste formato:

```
[26/10/2026 19:42] Devolvido: #2 O Cortiço
```

**Pronto quando:**

- com `BOOK_ID = 2`, a primeira execução atualiza o JSON e cria a linha no log;
- a segunda execução diz que o livro já está disponível;
- com `BOOK_ID = 99`, diz que não encontrou;
- o log vai acumulando linhas, nunca é apagado.

### Exercício 6 (desafio): Painel do acervo

Crie `painel.js`, com um script npm chamado `painel`, que:

- leia `data/livros.json`; se o arquivo não existir, crie-o com um array vazio (`[]`), mostre um aviso em amarelo e continue;
- mostre um título em azul e cada livro com cor de status (verde para disponível, vermelho para emprestado);
- mostre os totais: total, disponíveis e emprestados;
- mostre `Acervo vazio` quando não houver livros;
- mostre no rodapé, em cinza, o nome do computador, a plataforma e a data de hoje (use `dayjs`);
- reaproveite `formatBook` e `countAvailable` de `utils/format.js`.

**Pronto quando:** funciona com o acervo normal; e, se você renomear o `livros.json`, o painel cria um arquivo vazio, avisa e mostra `Acervo vazio`, sem quebrar.

---

## Para revisar

Tente responder sem olhar o material:

1. Se o Chrome e o Node usam o mesmo motor V8, por que `document.querySelector` funciona em um e não no outro?
2. Você apagou sem querer a pasta `node_modules`. E agora? E se tivesse apagado o `package.json`?
3. Por que preferimos `readFile` de `fs/promises` com `await` em vez de `readFileSync` num servidor?

---

## Tarefa para casa: estatísticas do acervo

No projeto `biblioteca-node`:

1. Termine os exercícios que ficaram pendentes em sala.
2. Crie `estatisticas.js`, com um script npm chamado `estatisticas`, que leia `data/livros.json` e grave `relatorios/acervo.txt` com:
   - total de livros;
   - quantos estão disponíveis e quantos estão emprestados;
   - o livro mais antigo (título e ano);
   - no rodapé, o nome do computador e a data de geração.
3. Suba o projeto para um repositório no GitHub, com o `.gitignore` correto.

**Pronto quando:** o repositório **não** tem a pasta `node_modules`, e um colega consegue clonar, rodar `npm install` e depois `npm run estatisticas` sem erro.

---

## Próxima aula

Hoje o Node leu arquivos e conversou com o computador. Na próxima aula ele vai **responder pedidos pela rede** com o módulo `http`. O nosso `livros.json` vai virar a primeira resposta da nossa API.

---

## Para saber mais

- [Documentação oficial: aprenda Node.js](https://nodejs.org/en/learn)
- [Módulo `fs`](https://nodejs.org/api/fs.html)
- [Módulo `os`](https://nodejs.org/api/os.html)
- [Documentação do npm](https://docs.npmjs.com)
- [Pacote chalk](https://www.npmjs.com/package/chalk) · [Pacote dayjs](https://www.npmjs.com/package/dayjs)
