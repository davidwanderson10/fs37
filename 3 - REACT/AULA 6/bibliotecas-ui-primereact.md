# Aula: Bibliotecas de UI para React — PrimeReact

## Objetivos de aprendizagem

Ao final desta aula, o aluno será capaz de:

- Explicar o que é uma biblioteca de componentes de UI e por que ela acelera o desenvolvimento
- Criar um projeto React com Vite do zero
- Instalar e configurar o PrimeReact em um projeto Vite
- Utilizar componentes prontos (`Button`, `InputText`, `Dropdown`, `DataTable`, `Dialog`, `Tag`, `Toast`) de forma combinada
- Aplicar um tema visual pronto e entender como trocá-lo

---

## 1. Por que usar uma biblioteca de componentes?

Até agora, no curso, construímos toda a interface "na mão": HTML semântico, CSS próprio, e no React, componentes de layout criados do zero. Isso é ótimo para aprender os fundamentos, mas em projetos reais, times inteiros perderiam semanas recriando coisas como:

- Uma tabela com paginação, ordenação e filtro
- Um modal acessível (que fecha com `Esc`, trava o foco, etc.)
- Um seletor de data
- Um sistema de notificações (toasts)

Uma **biblioteca de componentes de UI** entrega esses blocos prontos, testados e acessíveis — você só encaixa e estiliza.

### Panorama rápido do ecossistema React

| Biblioteca | Características |
|---|---|
| **PrimeReact** | 90+ componentes, temas prontos, boa curva de aprendizado, muito usada em sistemas internos/admin |
| **Material UI (MUI)** | Segue o Material Design do Google, altamente customizável, ecossistema enorme |
| **Ant Design** | Muito usada em dashboards corporativos, visual denso e funcional |
| **Chakra UI** | Foco em simplicidade e composição via props de estilo |

Hoje vamos trabalhar com o **PrimeReact**, pela combinação de: grande quantidade de componentes prontos, boa documentação e temas visuais que já saem bonitos sem esforço — ideal para prototipar rápido.

---

## 2. Criando o projeto com Vite

O Vite já é nosso gerador de projetos padrão no curso (rápido, sem configuração complexa). Para um projeto React puro:

```bash
npm create vite@latest meu-projeto -- --template react
cd meu-projeto
npm install
npm run dev
```

Isso cria a estrutura:

```
meu-projeto/
├── index.html
├── package.json
├── src/
│   ├── main.jsx     ← ponto de entrada, onde montamos o <App />
│   ├── App.jsx       ← componente raiz
│   └── index.css
└── vite.config.js
```

---

## 3. Instalando o PrimeReact

> **Atenção de versão:** o PrimeReact está em transição para uma nova arquitetura (v11, baseada em componentes "headless"). Para esta aula, vamos fixar a **versão 10.x**, que é a mais estável, documentada e usada na maioria dos tutoriais e projetos em produção hoje.

```bash
npm install primereact@^10 primeicons
```

- `primereact` → os componentes em si
- `primeicons` → biblioteca de ícones usada por vários componentes (`pi pi-check`, `pi pi-trash` etc.)

### Importando o tema

O PrimeReact funciona em **modo "styled"**: você importa um arquivo CSS de tema e todos os componentes já nascem estilizados. Isso é feito **uma única vez**, no `main.jsx`:

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Para trocar o visual de **toda a aplicação de uma vez**, basta trocar `lara-light-cyan` por outro tema disponível em `node_modules/primereact/resources/themes/` (ex: `saga-blue`, `bootstrap4-light-purple`, `md-dark-indigo`).

---

## 4. Conhecendo os componentes principais

Cada componente é importado individualmente — isso mantém o bundle final pequeno, já que só entra no pacote o que você realmente usa:

```jsx
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { Tag } from 'primereact/tag'
import { Toast } from 'primereact/toast'
```

### `Button`

```jsx
<Button label="Salvar" icon="pi pi-check" />
<Button label="Cancelar" text />
<Button icon="pi pi-trash" rounded text severity="danger" />
```

### `InputText` e `Dropdown` (campos de formulário)

Assim como um `<input>` comum, controlamos pelo par `value` / `onChange` — o padrão de componente controlado que já usamos em JS puro:

```jsx
const [nome, setNome] = useState('')

<InputText value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" />
```

O `Dropdown` funciona de forma parecida, mas recebe uma lista de `options` e devolve o valor selecionado em `e.value`:

```jsx
const opcoes = [
  { label: 'Alta', value: 'Alta' },
  { label: 'Baixa', value: 'Baixa' },
]

<Dropdown value={prioridade} options={opcoes} onChange={(e) => setPrioridade(e.value)} placeholder="Selecione" />
```

### `DataTable` + `Column`

O componente mais poderoso da biblioteca. Recebe um array de objetos em `value`, e cada `Column` "aponta" para um campo:

```jsx
<DataTable value={tarefas} paginator rows={5} stripedRows>
  <Column field="titulo" header="Título" />
  <Column field="status" header="Status" />
</DataTable>
```

Uma coluna também pode renderizar algo customizado com a prop `body`, recebendo a linha inteira:

```jsx
<Column body={(linha) => <Tag value={linha.status} severity="info" />} header="Status" />
```

### `Dialog` (modal)

Controlado por um booleano de visibilidade — o mesmo padrão que já vimos ao mostrar/esconder elementos no DOM com JS puro, só que aqui é reativo:

```jsx
const [aberto, setAberto] = useState(false)

<Dialog header="Nova tarefa" visible={aberto} onHide={() => setAberto(false)}>
  conteúdo do modal
</Dialog>
```

### `Toast` (notificações)

Diferente dos outros, o `Toast` é controlado de forma **imperativa**, via `useRef`:

```jsx
const toast = useRef(null)

<Toast ref={toast} />

toast.current.show({ severity: 'success', summary: 'Feito!', detail: 'Tarefa salva.' })
```

`severity` pode ser `success`, `info`, `warn` ou `error` — e já vem com cor e ícone certos automaticamente.

---

## 5. Projeto prático: Gerenciador de tarefas

Vamos aplicar tudo isso em um mini-projeto: uma lista de tarefas com **criar** (via modal) e **remover** (direto na tabela), com feedback em toast.

O projeto completo (`primereact-demo.zip`, pronto para `npm install && npm run dev`) contém:

- **`src/App.jsx`** — o componente principal, combinando `DataTable`, `Dialog`, `InputText`, `Dropdown`, `Tag`, `Toast` e `Button`
- **`src/main.jsx`** — configuração do tema
- **`src/index.css`** — pequenos ajustes visuais de layout (não é PrimeReact, é CSS nosso mesmo)

### Estrutura da lógica

```jsx
const [tarefas, setTarefas] = useState(tarefasIniciais)
const [dialogAberto, setDialogAberto] = useState(false)

function salvarTarefa() {
  const nova = { id: Date.now(), titulo: novoTitulo, prioridade: novaPrioridade, status: 'Pendente' }
  setTarefas((atual) => [nova, ...atual])
  setDialogAberto(false)
  toast.current.show({ severity: 'success', summary: 'Tarefa criada', detail: nova.titulo })
}

function removerTarefa(tarefa) {
  setTarefas((atual) => atual.filter((t) => t.id !== tarefa.id))
}
```

Repare que a lógica de estado é **exatamente** o que já fizemos em JS puro com arrays (`filter`, spread para adicionar item no início) — a diferença é que aqui o React re-renderiza a tabela sozinho quando o estado muda, e o PrimeReact cuida de toda a parte visual (bordas, hover, paginação, cores das tags).

### Sugestão de condução em aula

1. Mostrar o projeto rodando (`npm run dev`) antes de abrir o código — deixar os alunos verem o resultado final
2. Abrir `App.jsx` e ler o fluxo: estado → tabela → botão → modal → salvar → toast
3. Provocar: "e se eu quisesse adicionar um filtro por prioridade?" (gancho para próxima aula ou desafio avançado)

---

## Exercícios

### 🟢 Iniciante

1. Adicione um novo campo `responsavel` (texto livre) no formulário de criação de tarefa e exiba-o em uma nova coluna na tabela.
2. Troque o tema do projeto (arquivo importado em `main.jsx`) por outro disponível em `node_modules/primereact/resources/themes/` e observe o que muda.

### 🟡 Intermediário

3. Adicione um botão de "editar" em cada linha que abra o mesmo `Dialog` de criação, mas pré-preenchido com os dados da tarefa clicada (dica: um único estado `tarefaEmEdicao` pode controlar se é criação ou edição).
4. Implemente um `Dropdown` de filtro por status acima da tabela, que filtre o array exibido no `DataTable` sem alterar o array original de tarefas.

### 🔴 Avançado

5. Substitua o `Dropdown` de prioridade por um `SelectButton` (pesquise na documentação do PrimeReact) e adicione confirmação antes de remover uma tarefa usando o componente `ConfirmDialog`.
6. Persista as tarefas no `localStorage` (conteúdo já visto em aula anterior), sincronizando toda alteração de `tarefas` com o storage via `useEffect`.

---


## Recursos complementares

- [Documentação oficial do PrimeReact](https://primereact.org/)
- [Lista completa de componentes](https://primereact.org/button/) *(navegue pelo menu lateral)*
- [Temas disponíveis](https://primereact.org/theming/)
- [Vite — Guia oficial](https://vite.dev/guide/)
- [MDN — Componentes controlados em formulários](https://developer.mozilla.org/pt-BR/docs/Learn/Forms)
