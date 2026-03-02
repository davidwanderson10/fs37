# Seletores CSS
1. Por tag: Afeta todos os elementos daquele tipo (h1 {}).  
2. Por classe: Define estilos reutilizáveis (.titulo {}).
3. Por ID: Específico para um elemento único (#destaque {}).
4. Combinados: Selecionam elementos com relação entre si (div p, .menu li, h2 + p).

## Especificidade

- Ordem de prioridade: Inline > ID > Classe > Tag.
- Entender especificidade evita conflitos e facilita manutenção.

## Boas Práticas de Organização
- Nomenclatura clara: Usar nomes significativos e padrão (ex: .btn-primary).
- Comentários: Ajudam na manutenção e entendimento do código.
- Estrutura de arquivo CSS: Separar seções, manter uma ordem lógica.

## Exemplos

```html
<!-- index.html -->
<h1 class="titulo-principal">Bem-vindo!</h1>
<p id="mensagem">Aprenda CSS de forma organizada.</p>
```

```css
/* styles.css */
.titulo-principal {
  color: #2c3e50;
  font-family: 'Verdana', sans-serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

#mensagem {
  color: rgb(44, 62, 80);
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
}
```
## Exemplo 2 - Seletores Combinados e Especificidade
```html
<div class="caixa">
  <h2 class="titulo">Título da Caixa</h2>
  <p>Texto dentro da caixa.</p>
</div>
```

```css
.caixa .titulo {
  color: #2980b9; /* Seleção combinada */
}

h2.titulo {
  color: #e67e22; /* Menor especificidade que ID */
}

#tituloEspecial.caixa .titulo {
  color: #27ae60; /* ID tem prioridade */
}
```

## Exemplo 3 — Organização do CSS
```css

/* ===== Reset ===== */
* {
  margin: 0;
  padding: 0;
}

/* ===== Layout ===== */
.container {
  margin: 0 auto;
  max-width: 900px;
}

/* ===== Componentes ===== */
.btn-primary {
  background-color: #3498db;
  color: #fff;
}

/* ===== Utilitários ===== */
.text-center {
  text-align: center;
}
```