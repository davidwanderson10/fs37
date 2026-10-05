# Lista de Exercícios SQL — Tabelas, Foreign Keys e JOINs (PostgreSQL)

Oct 5, 2026 · @David Nogueira

## Como usar esta lista

Os alunos vão construir, passo a passo, o banco de uma escola de cursos livres no PostgreSQL: professores, cursos, alunos e matrículas. Cada parte usa o resultado da anterior, então os exercícios devem ser feitos na ordem.

1. **Parte 1** — criar as tabelas (ainda sem relacionamento).
2. **Parte 2** — inserir dados e fazer consultas simples.
3. **Parte 3** — criar as foreign keys e testar a integridade.
4. **Parte 4** — consultar com JOINs.

Os dados da Parte 2 foram pensados de propósito: há um professor sem curso, um curso sem professor e um aluno sem matrícula. É isso que faz o INNER, LEFT, RIGHT e FULL JOIN darem resultados diferentes na Parte 4.

Antes de começar, cada aluno cria seu banco:

```sql
CREATE DATABASE escola;
-- no psql: \c escola
```

## Parte 1 — Criando as tabelas

Nesta parte as tabelas ficam soltas: a coluna `professor_id` existe em `cursos`, mas ainda **não** é uma foreign key. Isso é proposital — na Parte 3 o aluno vai ver o problema e corrigir.

**Exercício 1.1** — Crie a tabela `professores` com: `id` (chave primária automática), `nome` (texto até 100, obrigatório), `email` (texto até 100, único) e `especialidade` (texto até 50).

**Exercício 1.2** — Crie a tabela `alunos` com: `id` (chave primária automática), `nome` (obrigatório), `email` (único), `data_nascimento` (DATE) e `cidade` (texto até 50, valor padrão `'Fortaleza'`).

**Exercício 1.3** — Crie a tabela `cursos` com: `id` (chave primária automática), `nome` (obrigatório), `carga_horaria` (inteiro, deve ser maior que zero) e `professor_id` (inteiro, **sem** foreign key por enquanto).

**Exercício 1.4** — Liste as tabelas criadas (`\dt` no psql) e veja a estrutura de `cursos` (`\d cursos`). Anote: que restrições aparecem?

**Pergunta para discussão:** o que impede alguém de cadastrar um curso com `professor_id = 999`, se esse professor não existe?

## Parte 2 — Inserindo dados

Os alunos devem inserir exatamente estes dados, na ordem. Os IDs gerados vão de 1 em diante e são usados nas partes seguintes.

**Exercício 2.1** — Insira os professores:

| Nome | E-mail | Especialidade |
| --- | --- | --- |
| Ana Souza | ana@escola.com | Banco de Dados |
| Bruno Lima | bruno@escola.com | Programação |
| Carla Mendes | carla@escola.com | Redes |
| Diego Rocha | diego@escola.com | Design |

**Exercício 2.2** — Insira os cursos (o último não tem professor ainda — use `NULL`):

| Nome | Carga horária | professor\_id |
| --- | --- | --- |
| SQL Básico | 40 | 1 |
| Modelagem de Dados | 30 | 1 |
| Python | 60 | 2 |
| JavaScript | 60 | 2 |
| Redes de Computadores | 40 | 3 |
| Git e GitHub | 20 | NULL |

**Exercício 2.3** — Insira os alunos. Em Maria, Pedro e Rafael **não** informe a cidade, para testar o valor padrão:

| Nome | E-mail | Nascimento | Cidade |
| --- | --- | --- | --- |
| Maria Oliveira | maria@email.com | 2004-03-15 | (padrão) |
| João Santos | joao@email.com | 2003-07-22 | Caucaia |
| Pedro Alves | pedro@email.com | 2005-01-10 | (padrão) |
| Luana Costa | luana@email.com | 2004-11-30 | Maracanaú |
| Rafael Gomes | rafael@email.com | 2002-09-05 | (padrão) |
| Beatriz Lima | beatriz@email.com | 2005-06-18 | Eusébio |

**Exercício 2.4** — Insira o curso "Curso Fantasma", 10 horas, `professor_id = 999`. Funcionou? Por quê? (Não apague ainda — ele será usado na Parte 3.)

**Exercício 2.5** — Tente inserir um curso com `carga_horaria = 0` e um aluno com o e-mail `maria@email.com`. Anote os erros.

**Exercício 2.6** — Consultas simples:

1. Todos os alunos ordenados por nome.
2. Os alunos que moram em Fortaleza.
3. Os cursos com carga horária maior ou igual a 40.
4. Quantos cursos cada `professor_id` tem (use `GROUP BY`).
5. O curso sem professor (`IS NULL`).

## Parte 3 — Foreign keys

Agora o banco passa a garantir os relacionamentos: um curso só pode apontar para um professor que existe, e uma matrícula só liga aluno e curso reais.

**Exercício 3.1** — Transforme `cursos.professor_id` em foreign key para `professores(id)`, com `ALTER TABLE`. O comando vai **falhar**. Leia a mensagem de erro e explique o motivo.

**Exercício 3.2** — Encontre o registro que está causando o erro com uma consulta que liste os cursos cujo `professor_id` não existe em `professores` (dica: `NOT IN` com subconsulta, ignorando os `NULL`). Apague esse curso e rode o `ALTER TABLE` de novo.

**Exercício 3.3** — Crie a tabela `matriculas`, que liga alunos e cursos (relacionamento N:N):

- `id` chave primária automática;
- `aluno_id` obrigatório, foreign key para `alunos` — se o aluno for apagado, suas matrículas também são (`ON DELETE CASCADE`);
- `curso_id` obrigatório, foreign key para `cursos` — não permite apagar curso com aluno matriculado (`ON DELETE RESTRICT`);
- `data_matricula` com padrão a data de hoje;
- `nota` decimal entre 0 e 10, podendo ficar vazia (curso em andamento);
- o mesmo aluno não pode se matricular duas vezes no mesmo curso.

**Exercício 3.4** — Confira os IDs com `SELECT id, nome FROM alunos;` e `SELECT id, nome FROM cursos;`. Depois insira as matrículas:

| Aluno | Curso | Nota |
| --- | --- | --- |
| Maria Oliveira (1) | SQL Básico (1) | 9.5 |
| Maria Oliveira (1) | Modelagem de Dados (2) | 8.0 |
| João Santos (2) | Python (3) | 7.0 |
| João Santos (2) | JavaScript (4) | 6.5 |
| Pedro Alves (3) | SQL Básico (1) | 5.0 |
| Pedro Alves (3) | Redes de Computadores (5) | 8.5 |
| Luana Costa (4) | Python (3) | 10.0 |
| Luana Costa (4) | SQL Básico (1) | (vazia) |
| Rafael Gomes (5) | Git e GitHub (6) | 9.0 |

Beatriz Lima fica sem matrícula de propósito.

**Exercício 3.5** — Teste a integridade. Para cada comando, anote se funcionou e qual foi o erro:

1. Matricular o aluno 99 no curso 1.
2. Matricular Maria (1) de novo em SQL Básico (1).
3. Lançar nota 11 para uma matrícula.
4. Apagar a professora Ana Souza (1).
5. Apagar o curso Git e GitHub (6).

**Exercício 3.6** — Teste o `CASCADE` sem perder dados: dentro de uma transação (`BEGIN;`), apague o aluno Rafael, conte as matrículas, e depois desfaça com `ROLLBACK;`. Confira que Rafael voltou.

## Parte 4 — JOINs

Com as tabelas relacionadas, os alunos cruzam os dados. O número de linhas esperado está entre parênteses para eles conferirem sozinhos.

**Exercício 4.1 — INNER JOIN** — Liste o nome de cada curso e o nome do professor. (5 linhas) Por que Git e GitHub não apareceu?

**Exercício 4.2 — LEFT JOIN** — Liste todos os professores e seus cursos, inclusive quem não tem curso. (6 linhas — Diego aparece com curso vazio)

**Exercício 4.3 — RIGHT JOIN** — Liste todos os cursos e seus professores, inclusive o curso sem professor. (6 linhas)

**Exercício 4.4 — FULL JOIN** — Liste professores e cursos, mostrando tanto o professor sem curso quanto o curso sem professor. (7 linhas)

**Exercício 4.5 — Encontrando quem "sobra"** — Usando LEFT JOIN e `IS NULL`, liste apenas os professores que não dão nenhum curso. (1 linha: Diego)

**Exercício 4.6 — Três tabelas** — Liste nome do aluno, nome do curso e nota de cada matrícula, ordenado por aluno. (9 linhas)

**Exercício 4.7 — Quatro tabelas** — Mostre aluno, curso e professor de cada matrícula, só dos cursos com carga horária de 40 horas ou mais. (7 linhas)

**Exercício 4.8** — Liste os alunos que não estão matriculados em nenhum curso. (1 linha: Beatriz)

**Exercício 4.9 — JOIN + GROUP BY** — Para cada curso, mostre a quantidade de alunos e a média das notas, arredondada para 2 casas. (6 linhas — SQL Básico tem 3 alunos e média 7.25; por que não é 4.83?)

**Exercício 4.10** — Para cada professor, mostre quantos alunos **diferentes** ele tem, incluindo quem tem zero. (4 linhas — Ana tem 3, Diego tem 0)

**Exercício 4.11 — HAVING** — Liste apenas os cursos com mais de 1 aluno matriculado. (2 linhas)

## Desafios finais

Para quem terminar antes. Juntam tudo o que foi visto.

**Desafio 1 — Boletim** — Crie a view `vw_boletim` com aluno, curso, professor, nota e situação: "Aprovado" (nota ≥ 7), "Reprovado" (nota < 7) ou "Cursando" (sem nota). Use `CASE`.

**Desafio 2** — Liste os alunos matriculados em mais de um curso, com os nomes dos cursos numa única coluna separados por vírgula (`STRING_AGG`). (3 linhas)

**Desafio 3 — Self join** — Liste os pares de alunos que fazem o mesmo curso, sem repetir o par invertido. (4 linhas)

**Desafio 4 — Nova tabela** — Crie a tabela `salas` (`id`, `nome`, `capacidade`), cadastre 2 salas e adicione em `cursos` a coluna `sala_id` com foreign key opcional (`ON DELETE SET NULL`). Coloque SQL Básico e Python em salas e liste todos os cursos com a sala (ou "Sem sala", usando `COALESCE`).
