# RESPONSIVIDADE

Responsividade é a capacidade de responder rapidamente e de forma adequada a estímulos, mudanças ou necessidades. No contexto digital, refere-se a sites que se ajustam automaticamente a qualquer tamanho de tela (celular, desktop).

## VANTAGENS

1. Principais Aspectos da Responsividade:
Melhor Experiência do Usuário (UX): Facilita a leitura e navegação em qualquer dispositivo, evitando que usuários desistam do site.
2. SEO e Ranqueamento: O Google prioriza sites amigáveis para dispositivos móveis, o que melhora o posicionamento nos resultados de busca.
3. Layout Fluido: Os elementos da página se redimensionam proporcionalmente em vez de terem tamanhos fixos.
4. Manutenção Simplificada: Um único site funciona em todos os dispositivos, dispensando a criação de uma versão mobile separada (m.site.com)

# ESTRUTURA @media query
A regra só se aplica quando a condição for verdadeira:

```css
@media (max-width: 600px) {
  /* CSS aplicado somente em telas ≤ 600px */
  body {
    background-color: lightblue;
    font-size: 14px;
  }
}

```

# A ABORDAGEM MOBILE FIRST
Escreva o CSS base para mobile e expanda com min-width para telas maiores:


```css
/* Base: mobile — sem @media */
.cards {
  display: grid;
  grid-template-columns: 1fr; /* 1 coluna */
  gap: 1rem;
}

/* Tablet: 2 colunas */
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}

/* Desktop: 3 colunas */
@media (min-width: 900px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```


