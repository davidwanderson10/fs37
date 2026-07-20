# Aula 03 - Estado e Hooks (useState e useEffect)

## Objetivos
- Compreender o conceito de estado.
- Aprender useState e useEffect.
- Gerenciar estado e efeitos colaterais.

---

# Hooks

Hooks são funções especiais introduzidas no React 16.8 que permitem usar o state (estado) e outras funcionalidades do React em componentes funcionais, sem precisar escrever uma classe. Eles permitem "conectar" (daí o nome hook) recursos do React a funções simples

# Estado

Estado (state) representa dados que podem mudar durante a execução da aplicação. Quando o estado muda, o React renderiza novamente o componente.

Exemplos: contador, tema, formulário, lista de tarefas.

## useState

```jsx
import { useState } from 'react'

function Contador(){
 const [contador,setContador]=useState(0)
 return <button onClick={()=>setContador(contador+1)}>{contador}</button>
}
```

## useEffect

Executa efeitos colaterais.

```jsx
useEffect(()=>{
 console.log('Renderizou')
})
```

Primeira renderização:

```jsx
useEffect(()=>{
 console.log('Uma vez')
},[])
```

Dependência:

```jsx
useEffect(()=>{
 console.log(contador)
},[contador])
```

Limpeza:

```jsx
useEffect(()=>{
 const id=setInterval(()=>console.log('tick'),1000)
 return ()=>clearInterval(id)
},[])
```

## Regras dos Hooks
- Chamar apenas no topo do componente.
- Não usar dentro de if ou loops.
- Apenas em componentes React ou hooks personalizados.

## Aplicações
- Contador
- Tema escuro
- Formulários
- Consumo de API
- Relógio

## Exercícios
1. Contador.
2. Campo de texto controlado.
3. Alternar tema.
4. Buscar usuários da JSONPlaceholder com useEffect.
5. Relógio digital com setInterval.
