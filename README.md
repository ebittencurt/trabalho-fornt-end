
# Loja Tech – Landing Page de E-commerce (Projeto Acadêmico)


## Descrição
Landing page de e-commerce fictício desenvolvida como trabalho acadêmico por Junior Bittencourt.

**Este projeto tem como objetivo praticar conceitos de desenvolvimento front-end.**
Utiliza HTML semântico, CSS moderno (Flexbox, Grid, Media Queries) e JavaScript básico para interatividade.


## Estrutura de Pastas

```
index.html      # Página principal da loja
style.css       # Estilos globais e responsivos
script.js       # Scripts de interatividade (carrinho, favoritos, tema, etc)
images/         # Contém as imagens usadas nos cards de produtos e ofertas
```


## Funcionalidades

- 🌓 **Tema Claro/Escuro:** Alternância de tema pelo botão "Alternar tema".
- 🏷️ **Produtos em Destaque:** Cards estáticos com informações e botões de ação.
- ⚡ **Ofertas Relâmpago:** Cards de ofertas, visual idêntico aos produtos em destaque.
- 🛒 **Carrinho de Compras:**
  - Adição de produtos ao carrinho
  - Modal de confirmação e visualização do carrinho
  - Remoção de itens do carrinho
  - Contador de itens no topo
- ⭐ **Favoritar Produtos:** Botão de favoritar/desfavoritar em todos os cards
- 💌 **Newsletter:** Formulário para cadastro de e-mail e nome, com modal de confirmação
- 📱 **Responsividade:** Layout adaptado para mobile e desktop

## Principais Arquivos

### index.html
- Estrutura semântica da página.
- Seções: header, hero, produtos, newsletter, ofertas, footer.
- Modais para newsletter e carrinho.

### style.css
- Variáveis CSS para temas.
- Flexbox e Grid para layout responsivo.
- Estilização dos cards, botões, modais e formulário.

### script.js
- Alternância de tema.
- Lógica dos modais (abrir/fechar).
- Controle do carrinho (adicionar, remover, badge).
- Controle de favoritos.
- Newsletter (validação e modal de sucesso).


## Como Usar

### 👤 Modo Usuário
1. Abra o arquivo `index.html` em um navegador.
2. Navegue pelos produtos e ofertas.
3. Adicione itens ao carrinho e teste a funcionalidade de favoritos.
4. Cadastre-se na newsletter para ver o modal de confirmação.
5. Teste a responsividade redimensionando a janela.

### 💻 Modo Desenvolvedor
1. Edite os arquivos `index.html`, `style.css` ou `script.js` conforme desejar.
2. Recomenda-se usar a extensão **Live Server** do VS Code para recarregamento automático.
3. As imagens devem estar na pasta `images/` com os nomes corretos.


## Observações
- O projeto não possui backend; todas as interações são no front-end.
- O carrinho e favoritos **persistem apenas enquanto a aba está aberta** (localStorage).
- Ideal para apresentação acadêmica e portfólio pessoal.


## Autor
**Junior Bittencourt**  
[GitHub](https://github.com/ebittencurt)

