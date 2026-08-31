# Projeto em Equipe — Sprint de 1 Semana (React + PrimeReact)

| Formato | Duração | Equipes | Stack obrigatória | Gestão |
|---|---|---|---|---|
| Projeto em grupo, fluxo de mercado | 1 semana (kickoff hoje) | Grupos de 4–5 pessoas | React + Vite + PrimeReact | Trello |

## Objetivo pedagógico

Simular, em pequena escala, o ciclo de um projeto real de front-end: da definição de escopo até a entrega, passando por gestão de tarefas em quadro Kanban e fluxo de trabalho em Git com múltiplos desenvolvedores. O aprendizado técnico (React/PrimeReact) já foi coberto — esta semana é sobre **processo e colaboração**, tão importante quanto o código em si no mercado.

---

## Cronograma sugerido da semana

| Dia | Foco |
|---|---|
| **Hoje (Dia 1)** | Formação de equipes, definição de tema e escopo, papéis, Trello e repositório Git configurados, primeiras tarefas distribuídas |
| Dia 2–3 | Desenvolvimento das funcionalidades essenciais (MVP) |
| Dia 4 | Checkpoint rápido (cada equipe reporta progresso e bloqueios — pode ser assíncrono, no próprio Trello) |
| Dia 5–6 | Finalização de funcionalidades, revisão de código entre membros do time, ajustes visuais |
| Dia 7 | Entrega: repositório final, board do Trello atualizado, apresentação curta (5 min por equipe) |

---

## Roteiro do kickoff de hoje

### 1. Formar as equipes (grupos de 4–5)

Sugestão de critério: misturar níveis de desempenho/ritmo dentro de cada grupo, em vez de deixar só afinidade decidir — isso mais se parece com um time de trabalho real, onde você não escolhe todos os colegas.

### 2. Definir papéis dentro da equipe

Como o projeto é só front-end, os "papéis" são mais sobre responsabilidade de área do que hierarquia. Sugestão de divisão para grupos de 4–5:

| Papel | Responsabilidade |
|---|---|
| **Tech Lead / integrador** | Cuida da estrutura do projeto, resolve conflitos de merge, garante que as partes se encaixam |
| **Dev de UI** | Componentes visuais, layout, uso do PrimeReact e tema |
| **Dev de dados/estado** | Lógica de estado, formulários, validações, integração com API (se houver) |
| **Dev de dados/estado (2)** ou **QA** | Apoia o item acima ou foca em testar fluxos, revisar PRs dos colegas, achar bugs |
| **PM do dia (rotativo)** | Mantém o Trello atualizado, acompanha prazos — pode revezar a cada 1–2 dias |

Todos escrevem código — a divisão é sobre **foco principal**, não sobre quem "só organiza".

### 3. Definir o tema do projeto

Cada equipe escolhe (ou você sorteia) um tema. O critério mais importante: o tema precisa **naturalmente pedir** os componentes já vistos em aula — formulário + modal + tabela + feedback (toast). Alguns temas prontos, todos no formato "cadastro + listagem + gestão":

- **Gestão de tarefas de equipe** (Kanban simplificado, times/pessoas responsáveis)
- **Catálogo de biblioteca** (livros, empréstimos, status de disponibilidade)
- **Controle financeiro pessoal** (receitas/despesas, categorias, saldo)
- **Sistema de reservas** (salas, equipamentos ou mesas — com data/hora)
- **Cadastro de clientes/CRM simples** (contatos, status do funil, histórico)
- **Painel de eventos** (inscrições, participantes, check-in)

Se uma equipe quiser propor outro tema, o critério de aprovação é: **"dá pra fazer um CRUD com pelo menos 3 componentes do PrimeReact diferentes"?**

### 4. Definir como os dados vão ser guardados (sem backend)

Importante: essa turma ainda não viu backend nem banco de dados — só front-end e consumo de API. Isso não é uma limitação para o projeto, é só uma decisão de escopo que a equipe precisa tomar **antes** de escrever o MVP, porque muda o que dá para prometer. Duas opções válidas, cada equipe escolhe uma (ou combina as duas):

| Opção | Como funciona | Quando faz sentido |
|---|---|---|
| **`localStorage`** | Tudo que a equipe cadastrar (livro, tarefa, cliente etc.) é salvo no navegador, como já foi visto na aula de `localStorage`/`sessionStorage` | Projeto 100% autônomo, sem depender de internet ou de API externa |
| **API pública/mock já pronta** | A equipe consome uma API existente (ex: `JSONPlaceholder`, ou uma API mock gerada em [mockapi.io](https://mockapi.io) — grátis, sem precisar programar nada no servidor) para listar/simular cadastro, do mesmo jeito que foi feito na aula de consumo de API | Quando a equipe quer praticar `fetch`/`async-await` de novo, dentro do projeto |

**O que não entra no escopo desta semana:** criar um servidor próprio, banco de dados, autenticação real ou qualquer backend customizado — isso é conteúdo de módulos futuros. Se uma equipe tiver essa ideia, o ajuste é redirecionar para uma das duas opções acima.

Vale reforçar isso ao apresentar os temas: por exemplo, no "Controle financeiro pessoal", os dados ficam salvos com `localStorage` — a cada recarregar a página, o que foi cadastrado continua lá, mesmo sem servidor nenhum.

### 5. Definir o escopo (MVP)

Aqui é onde times reais perdem mais tempo — ou perdem tempo por não fazer isso. Cada equipe escreve, em 15–20 minutos, a lista de funcionalidades separada em duas colunas:

**Essencial (MVP — precisa existir para o projeto "funcionar")**
- Ex: cadastrar item, listar itens, editar, excluir, campo obrigatório validado

**Desejável (só se sobrar tempo)**
- Ex: filtros avançados, gráfico, modo escuro, exportar dados

Formato de escopo por funcionalidade (user story simplificada):

```
Como [tipo de usuário], quero [ação], para [benefício].

Critério de pronto: [o que precisa acontecer na tela pra considerar feito]
```

Exemplo:
```
Como bibliotecário, quero cadastrar um novo livro, para manter o acervo atualizado.

Critério de pronto: formulário em modal, validação de campos obrigatórios,
livro aparece na tabela após salvar, toast de confirmação.
```

### 6. Configurar o Trello

Cada equipe cria um board gratuito. Estrutura de colunas sugerida:

```
Backlog  →  A Fazer  →  Em Andamento  →  Em Revisão  →  Concluído
```

- **Backlog**: todas as funcionalidades (MVP + desejável), como cards
- **A Fazer**: o que foi puxado para a sprint da semana
- **Em Andamento**: no máximo 1–2 cards por pessoa ao mesmo tempo (evita começar tudo e terminar nada)
- **Em Revisão**: aguardando outro colega revisar o código antes do merge
- **Concluído**: já mergeado na branch principal

Cada card deve ter: título curto no formato de ação (ex: "Criar formulário de novo livro"), responsável marcado, e um checklist pequeno se for uma tarefa maior.

### 7. Configurar o repositório Git

Um integrante cria o repositório no GitHub e adiciona os demais como colaboradores. Fluxo de trabalho sugerido (já compatível com o que foi visto na aula de Git/GitHub):

**Branches**
```
main                    → sempre estável, é o que "funciona"
feature/nome-da-tarefa  → uma branch por card do Trello
```

Exemplos de nome de branch: `feature/form-cadastro-livro`, `feature/tabela-listagem`, `fix/validacao-email`.

**Fluxo por tarefa**
1. Pegar um card do Trello, mover para "Em Andamento"
2. Criar a branch a partir da `main` atualizada
3. Codar, commitando em pequenos passos com mensagens claras (`git commit -m "adiciona validação do campo email"`)
4. Abrir um **Pull Request** para a `main`
5. Mover o card para "Em Revisão"
6. Pelo menos **um outro colega do time** lê o PR e aprova (ou pede ajustes)
7. Faz o merge, apaga a branch, move o card para "Concluído"

Esse passo 6 é o mais importante do exercício: ninguém faz merge do próprio código sem alguém olhar. É assim que evita que o projeto quebre silenciosamente.

**README obrigatório**
O repositório precisa ter um `README.md` com: nome do projeto, integrantes, como rodar (`npm install && npm run dev`), e lista de funcionalidades implementadas.

### 8. Quebrar e distribuir as primeiras tarefas

Com o escopo do MVP definido, cada equipe:
1. Transforma cada funcionalidade essencial em 1 ou mais cards no Trello
2. Estima juntos: "isso é rápido, médio ou trabalhoso?"
3. Cada pessoa puxa 1 card para começar hoje — ninguém sai da aula sem uma tarefa clara

---

## Checklist de saída do kickoff (antes de liberar as equipes)

- [ ] Equipe formada e papéis combinados
- [ ] Tema escolhido e aprovado
- [ ] MVP escrito (lista de funcionalidades essenciais)
- [ ] Board do Trello criado com as colunas e o backlog populado
- [ ] Repositório no GitHub criado, todos como colaboradores, projeto Vite + PrimeReact já rodando localmente para todos
- [ ] Cada integrante com pelo menos 1 card puxado para hoje

---

## Critérios de avaliação (entrega no Dia 7)

| Critério | Peso |
|---|---|
| MVP funcionando (roda sem erros, funcionalidades essenciais completas) | 35% |
| Uso correto do Git (branches, PRs, histórico de commits com mensagens claras) | 20% |
| Uso do Trello ao longo da semana (board refletindo o progresso real, não só no último dia) | 15% |
| Qualidade do uso do PrimeReact (componentes bem escolhidos para cada necessidade) | 15% |
| Apresentação final (clareza ao explicar decisões de escopo e divisão do time) | 15% |

---

## Dicas para o checkpoint do Dia 4

Peça para cada equipe responder rapidamente (pode ser um comentário fixado no Trello):
1. O que já está pronto?
2. O que está travado, e por quê?
3. O MVP ainda é realista até o Dia 7, ou precisa cortar algo?

Isso simula um "daily" ou "checkpoint de sprint" de mercado, sem precisar de uma reunião longa.
