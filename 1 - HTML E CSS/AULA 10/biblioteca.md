# 🎨 Tailwind CSS — Utility-First Framework


## 1. O que é Tailwind CSS?

**Tailwind CSS** é um framework CSS de código aberto que adota a filosofia **"utility-first"** (utilitários em primeiro lugar). Em vez de classes semânticas como `.btn` ou `.card`, o Tailwind oferece centenas de **classes pequenas e específicas** que você combina diretamente no HTML.

### Comparação de Abordagens

| Abordagem | Como funciona |
|-----------|--------------|
| CSS tradicional | Você escreve regras CSS separadas para cada componente |
| Bootstrap | Você usa componentes prontos com classes semânticas (`.btn-primary`, `.card`) |
| **Tailwind CSS** | Você compõe estilos diretamente no HTML com classes utilitárias |

### Exemplo Prático

**CSS Tradicional:**
```html
<!-- HTML -->
<button class="botao-primario">Enviar</button>
```
```css
/* CSS */
.botao-primario {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
}
```

**Com Tailwind:**
```html
<button class="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
  Enviar
</button>
```

> **Observe:** Com Tailwind, não existe um arquivo CSS separado para esse botão. O estilo vive junto com o HTML.

---

## 2. Por que usar Tailwind?

### ✅ Vantagens

- **Sem "sair do HTML"** — você estiliza sem trocar de arquivo
- **Sem conflitos de nomes** — classes utilitárias não colidem entre si
- **Responsividade fácil** — prefixos como `md:`, `lg:` são intuitivos
- **Design system embutido** — escala de cores, tamanhos e espaçamentos padronizados
- **CSS menor em produção** — remove classes não utilizadas automaticamente (PurgeCSS)

### ❌ Desvantagens

- HTML pode ficar verboso com muitas classes
- Curva inicial de aprendizado (decorar os nomes das classes)
- Menos semântico visualmente à primeira vista

---

## 3. Instalação e Configuração

### Opção 1 — CDN (para aprendizado rápido)

Adicione no `<head>` do HTML:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

> ⚠️ **Não recomendado para produção.** Ideal apenas para testes e protótipos.

---

### Opção 2 — npm (recomendado para projetos reais)

```bash
# 1. Inicializar o projeto Node
npm init -y

# 2. Instalar Tailwind
npm install -D tailwindcss

# 3. Criar o arquivo de configuração
npx tailwindcss init
```

**Arquivo `tailwind.config.js` gerado:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Criar o arquivo CSS de entrada (`src/input.css`):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Compilar o CSS:**
```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

**Conectar no HTML:**
```html
<link href="/dist/output.css" rel="stylesheet">
```

---

## 4. Lógica das Classes Utilitárias

A maioria das classes do Tailwind segue um padrão lógico:

```
[propriedade]-[valor]
```

### Exemplos

| Classe Tailwind | CSS Equivalente |
|----------------|-----------------|
| `text-red-500` | `color: #ef4444` |
| `bg-blue-200` | `background-color: #bfdbfe` |
| `p-4` | `padding: 1rem` |
| `m-2` | `margin: 0.5rem` |
| `px-6` | `padding-left: 1.5rem; padding-right: 1.5rem` |
| `py-3` | `padding-top: 0.75rem; padding-bottom: 0.75rem` |
| `text-xl` | `font-size: 1.25rem` |
| `font-bold` | `font-weight: 700` |
| `rounded-lg` | `border-radius: 0.5rem` |
| `shadow-md` | `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)` |
| `w-full` | `width: 100%` |
| `flex` | `display: flex` |
| `grid` | `display: grid` |
| `hidden` | `display: none` |

---

## 5. Sistema de Cores

O Tailwind possui uma paleta de cores embutida com **10 tons** (100 a 900) para cada cor.

```
[cor]-[intensidade]
```

### Exemplos de tons de azul

```html
<div class="bg-blue-100">Muito claro</div>
<div class="bg-blue-300">Claro</div>
<div class="bg-blue-500">Médio (padrão)</div>
<div class="bg-blue-700">Escuro</div>
<div class="bg-blue-900">Muito escuro</div>
```

### Cores disponíveis

`slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`

---

## 6. Espaçamentos (Padding e Margin)

O Tailwind usa uma **escala baseada em 4px** (0.25rem):

| Classe | Valor | Pixels |
|--------|-------|--------|
| `p-0` | 0 | 0px |
| `p-1` | 0.25rem | 4px |
| `p-2` | 0.5rem | 8px |
| `p-4` | 1rem | 16px |
| `p-6` | 1.5rem | 24px |
| `p-8` | 2rem | 32px |
| `p-12` | 3rem | 48px |
| `p-16` | 4rem | 64px |

### Direções Específicas

```
p  → todos os lados
px → horizontal (esquerda + direita)
py → vertical (cima + baixo)
pt → top (cima)
pb → bottom (baixo)
pl → left (esquerda)
pr → right (direita)
```

O mesmo padrão se aplica para `m` (margin).

---

## 7. Tipografia

```html
<!-- Tamanhos de fonte -->
<p class="text-xs">Muito pequeno</p>
<p class="text-sm">Pequeno</p>
<p class="text-base">Normal (16px)</p>
<p class="text-lg">Grande</p>
<p class="text-xl">Extra grande</p>
<p class="text-2xl">2x grande</p>
<p class="text-4xl">4x grande</p>

<!-- Peso da fonte -->
<p class="font-thin">Thin</p>
<p class="font-normal">Normal</p>
<p class="font-semibold">Semibold</p>
<p class="font-bold">Bold</p>

<!-- Alinhamento -->
<p class="text-left">Esquerda</p>
<p class="text-center">Centro</p>
<p class="text-right">Direita</p>

<!-- Decoração -->
<p class="underline">Sublinhado</p>
<p class="line-through">Tachado</p>
<p class="uppercase">MAIÚSCULAS</p>
<p class="capitalize">Primeira Maiúscula</p>
```

---

## 8. Flexbox com Tailwind

```html
<!-- Container flex básico -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Direção -->
<div class="flex flex-row">     <!-- padrão: horizontal -->
<div class="flex flex-col">     <!-- vertical -->

<!-- Alinhamento principal (justify) -->
<div class="flex justify-start">      <!-- início -->
<div class="flex justify-center">     <!-- centro -->
<div class="flex justify-end">        <!-- fim -->
<div class="flex justify-between">    <!-- espaço entre -->
<div class="flex justify-around">     <!-- espaço ao redor -->

<!-- Alinhamento cruzado (align) -->
<div class="flex items-start">
<div class="flex items-center">
<div class="flex items-end">
<div class="flex items-stretch">

<!-- Gap entre itens -->
<div class="flex gap-4">    <!-- 1rem entre itens -->
<div class="flex gap-8">    <!-- 2rem entre itens -->
```

### Exemplo: Barra de Navegação

```html
<nav class="flex items-center justify-between px-8 py-4 bg-gray-800">
  <span class="text-white text-xl font-bold">Meu Site</span>
  <ul class="flex gap-6">
    <li><a href="#" class="text-gray-300 hover:text-white">Home</a></li>
    <li><a href="#" class="text-gray-300 hover:text-white">Sobre</a></li>
    <li><a href="#" class="text-gray-300 hover:text-white">Contato</a></li>
  </ul>
</nav>
```

---

## 9. Grid com Tailwind

```html
<!-- Grid básico: 3 colunas iguais -->
<div class="grid grid-cols-3 gap-4">
  <div>Coluna 1</div>
  <div>Coluna 2</div>
  <div>Coluna 3</div>
</div>

<!-- Variações de colunas -->
<div class="grid grid-cols-1">   <!-- 1 coluna -->
<div class="grid grid-cols-2">   <!-- 2 colunas -->
<div class="grid grid-cols-4">   <!-- 4 colunas -->
<div class="grid grid-cols-12">  <!-- 12 colunas -->

<!-- Span (ocupar múltiplas colunas) -->
<div class="grid grid-cols-3">
  <div class="col-span-2">Ocupa 2 colunas</div>
  <div>Ocupa 1 coluna</div>
</div>
```

---

## 10. Responsividade

O Tailwind usa uma abordagem **mobile-first**: o estilo padrão é para celular, e os prefixos adicionam estilos para telas maiores.

### Breakpoints

| Prefixo | Largura mínima | Dispositivo típico |
|---------|---------------|-------------------|
| *(sem prefixo)* | 0px | Celular |
| `sm:` | 640px | Celular grande |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Notebook |
| `xl:` | 1280px | Desktop |
| `2xl:` | 1536px | Desktop grande |

### Sintaxe

```
[breakpoint]:[classe]
```

### Exemplos

```html
<!-- Texto pequeno no celular, grande no desktop -->
<h1 class="text-xl md:text-3xl lg:text-5xl">Título</h1>

<!-- 1 coluna no celular, 3 no desktop -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
  ...
</div>

<!-- Ocultar no celular, mostrar no desktop -->
<nav class="hidden lg:flex">
  ...
</nav>

<!-- Padding menor no celular, maior no desktop -->
<section class="px-4 md:px-8 lg:px-16">
  ...
</section>
```

---

## 11. Estados (Hover, Focus, Active)

```html
<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-700 text-white">
  Passe o mouse
</button>

<!-- Focus -->
<input class="border focus:border-blue-500 focus:outline-none">

<!-- Active -->
<button class="bg-blue-500 active:bg-blue-900">
  Clique
</button>

<!-- Combinando estado + responsividade -->
<button class="bg-blue-500 hover:bg-blue-700 md:bg-green-500 md:hover:bg-green-700">
  Dinâmico
</button>
```

---

## 12. Projeto Prático — Card de Perfil

Vamos criar um card de perfil completo usando Tailwind:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card de Perfil</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">

  <div class="bg-white rounded-2xl shadow-lg overflow-hidden w-full max-w-sm">
    
    <!-- Header do card -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
    
    <!-- Conteúdo -->
    <div class="px-6 pb-6">
      
      <!-- Avatar -->
      <div class="-mt-12 mb-4">
        <img 
          src="https://i.pravatar.cc/100" 
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-white shadow-md"
        >
      </div>
      
      <!-- Informações -->
      <h2 class="text-2xl font-bold text-gray-800">Ana Silva</h2>
      <p class="text-blue-500 font-medium mb-2">Desenvolvedora Front-end</p>
      <p class="text-gray-500 text-sm mb-4">
        Apaixonada por criar interfaces bonitas e acessíveis. 
        Amante de café e código limpo. ☕
      </p>
      
      <!-- Estatísticas -->
      <div class="flex justify-around border-t border-gray-100 pt-4 mb-4">
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">142</p>
          <p class="text-xs text-gray-500">Posts</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">4.8k</p>
          <p class="text-xs text-gray-500">Seguidores</p>
        </div>
        <div class="text-center">
          <p class="text-xl font-bold text-gray-800">319</p>
          <p class="text-xs text-gray-500">Seguindo</p>
        </div>
      </div>
      
      <!-- Botões -->
      <div class="flex gap-3">
        <button class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">
          Seguir
        </button>
        <button class="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg transition-colors">
          Mensagem
        </button>
      </div>
      
    </div>
  </div>

</body>
</html>
```

---

## 13. Classes Personalizadas com `@apply`

Quando um conjunto de classes se repete muito, você pode criar suas próprias classes usando a diretiva `@apply` no CSS:

```css
/* input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primario {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md p-6;
  }
}
```

```html
<!-- Agora pode usar assim -->
<button class="btn-primario">Clique aqui</button>
<div class="card">Conteúdo do card</div>
```

---

## 14. Tailwind vs Bootstrap — Quando usar cada um?

| Critério | Tailwind CSS | Bootstrap |
|----------|-------------|-----------|
| Filosofia | Utility-first (você monta) | Component-based (pronto para usar) |
| Personalização | Total liberdade | Limitada sem customização |
| Velocidade inicial | Mais lenta (aprender classes) | Mais rápida (copiar componente) |
| Tamanho final do CSS | Muito pequeno (PurgeCSS) | Maior |
| Design único | Sim | Difícil (sites parecem iguais) |
| Ideal para | Projetos com design próprio | Protótipos rápidos |

---

## 15. Resumo das Classes Mais Usadas

```
DISPLAY
flex, grid, block, inline, hidden

FLEXBOX
flex-row, flex-col
justify-start/center/end/between/around
items-start/center/end/stretch
gap-{n}

GRID
grid-cols-{n}
col-span-{n}
gap-{n}

ESPAÇAMENTO
p-{n}, px-{n}, py-{n}, pt/pb/pl/pr-{n}
m-{n}, mx-{n}, my-{n}, mt/mb/ml/mr-{n}

TAMANHO
w-{n}, w-full, w-screen
h-{n}, h-full, h-screen
max-w-{sm|md|lg|xl|2xl|...}
min-h-screen

TIPOGRAFIA
text-{xs|sm|base|lg|xl|2xl|...}
font-{thin|normal|semibold|bold}
text-{left|center|right}
uppercase, lowercase, capitalize
leading-{tight|normal|relaxed}

CORES
text-{cor}-{100-900}
bg-{cor}-{100-900}
border-{cor}-{100-900}

BORDAS
border, border-{n}
rounded, rounded-{sm|md|lg|xl|full}

SOMBRA
shadow, shadow-{sm|md|lg|xl}

ESTADOS
hover:{classe}
focus:{classe}
active:{classe}

RESPONSIVIDADE
sm:, md:, lg:, xl:, 2xl:
```

---

## 📝 Exercícios

### Exercício 1 — Básico
Recrie o seguinte botão usando apenas classes Tailwind (sem CSS externo):
- Fundo azul, texto branco
- Padding horizontal de 24px e vertical de 12px
- Borda arredondada
- Ao passar o mouse, fundo fica mais escuro

### Exercício 2 — Intermediário
Crie uma seção de "Features" com:
- Título centralizado no topo
- 3 cards lado a lado no desktop
- 1 card por linha no celular
- Cada card com ícone (pode ser emoji), título e descrição

### Exercício 3 — Avançado
Crie uma landing page simples com:
- Barra de navegação responsiva (menu some no celular)
- Seção hero com título, subtítulo e botão CTA
- Seção de 3 features em grid
- Rodapé com copyright

---

## 🔗 Recursos Úteis

- **Documentação oficial:** https://tailwindcss.com/docs
- **Tailwind UI (componentes prontos):** https://tailwindui.com
- **Play CDN (testar online):** https://play.tailwindcss.com
- **Cheatsheet:** https://nerdcave.com/tailwind-cheat-sheet
- **Extensão VSCode:** Tailwind CSS IntelliSense

---

