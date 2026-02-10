# INTRODUÇÃO AO CSS

CSS (Cascading Style Sheets, ou Folhas de Estilo em Cascata) é a linguagem utilizada para definir o estilo visual de documentos HTML, controlando o layout, cores, fontes, espaçamentos e responsividade. 

## Por que usar CSS?

O CSS separa o conteúdo (HTML) da apresentação. Permite deixar páginas mais atrativas e organizadas, melhorando a experiência do usuário.

## Formas de aplicar CSS:

Inline: direto no elemento, usando o atributo style.
Interno: bloco <style> dentro do <head>.
Externo: arquivo .css separado (recomendado para projetos reais).

## Propriedades:

```css
    {
        background-color: red; /*cor do fundo */
        color: white; /*cor do texto */
        font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; /*tipo de fonte */
        font-size: 30px; /*tamanho da fonte */
        margin: 50px; /*50px em todas as direções */
        margin: 20px 50px; /*20px top e bottom, 50px left e rigth*/
        margin: 50px 10px 20px 70px; /*top right bottom left */
        padding: 50px /*Espaçamento interno */
    }
```

## Diferença entre id, for e name nos formulários
1. id
O que é: Um identificador único para o elemento na página.
Para que serve:
Permite referenciar o elemento de maneira única no HTML, CSS ou JavaScript.
Usado para conectar o <label> ao campo correspondente (acessibilidade).
Exemplo:
```html
<input type="text" id="nome">
```
2. for (no label)
O que é: Atributo usado no <label>.
Para que serve:
Associa o texto do <label> a um campo específico usando o valor do id.
Isso faz com que, ao clicar no texto do label, o campo associado seja automaticamente selecionado (melhor experiência para o usuário).
Exemplo:
```html
<label for="nome">Nome:</label>
<input type="text" id="nome">
```
Aqui, ao clicar em "Nome:", o campo de texto é focado.
3. name
O que é: Nome do campo de formulário.
Para que serve:
É o identificador do valor enviado ao servidor quando o formulário é submetido.
Sem o name, o valor daquele campo não é enviado!
Exemplo:
```html
<input type="text" name="nome">
```
Quando o formulário é enviado, o servidor recebe algo como:
nome=valor_digitado