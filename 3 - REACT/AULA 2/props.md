# Componentes Funcionais e Props

## Objetivos

- Compreender componentes funcionais.
- Entender props.
- Criar componentes reutilizáveis.

---

# Componentes Funcionais

Componentes são funções JavaScript que retornam JSX.

```jsx
function Header(){
  return <h1>Minha Aplicação</h1>
}

export default Header
```

Uso:

```jsx
import Header from './Header'

function App(){
  return <Header />
}
```

## Componentes Funcionais x Classe

Hoje utilizamos principalmente componentes funcionais por serem mais simples e compatíveis com Hooks.

---

# Props

Props são propriedades enviadas do componente pai para o filho.

```jsx
function Card(props){
  return <h2>{props.nome}</h2>
}
```

Uso:

```jsx
<Card nome='Notebook' />
<Card nome='Mouse' />
```

## Desestruturação

```jsx
function Card({nome,preco}){
  return <p>{nome} - R$ {preco}</p>
}
```

## Tipos de props

- String
- Number
- Boolean
- Array
- Object
- Function

---

# PropTypes

```bash
npm install prop-types
```

```jsx
import PropTypes from 'prop-types'

Card.propTypes={
 nome:PropTypes.string.isRequired,
 preco:PropTypes.number.isRequired
}
```

---

# Composição

```
App
├─ Header
├─ Menu
├─ Card
└─ Footer
```

---

# Boas práticas

- Componentes pequenos.
- Uma responsabilidade.
- Reutilização.
- Receber dados por props.

---

# Exercício

Crie um componente CardProduto que receba nome, preço e categoria por props e reutilize-o três vezes.