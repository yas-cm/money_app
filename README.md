# Plin

Caderneta de bolso para o dinheiro do mês: anotar gastos e entradas, guardar em caixinhas, dividir a renda em potes e ver gráficos. Feito para o celular, funciona no navegador e pode ser instalado como app (PWA).

**Os dados ficam só no seu aparelho**, no armazenamento do navegador (IndexedDB). Não há login nem servidor. Para levar os dados para outro aparelho ou guardar uma cópia, use **Números → Salvar backup** e depois **Importar backup**.

## O que tem

- **Mês**: pote "Livre" (quanto ainda dá para gastar), quanto dá por dia, extrato por dia, busca em todos os meses, checklist de aportes e contas fixas, tetos por categoria e fechamento do mês anterior (guardar a sobra numa caixinha).
- **Anotar**: teclado numérico, tipos Gasto, Entrada, Guardar e Resgatar; gasto pode sair de uma caixinha; parcelado (vira uma parcela por mês); atalhos para gastos frequentes; sugestão de categoria pela descrição; valor em US$ ou € com cotação.
- **Caixinhas**: saldo, meta, banco, rendimento e resgate; meta que soma o saldo de outras caixinhas.
- **Plano**: divisão da renda prevista em potes (Livre, Investimentos, Viagens, 13º), aportes fixos, gastos fixos (assinaturas), lembretes e gastos planejados.
- **Gráficos**: gasto por categoria, mês a mês e maiores gastos do período.
- **Números**: categorias (com cor, teto e arquivar), planilha .csv para o Excel e backup .json.

## Rodar localmente

Não tem build. Qualquer servidor estático serve:

```sh
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir o `index.html` direto (file://) também funciona, só sem o modo offline.

## Publicar no GitHub Pages

Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`. O app fica em `https://<usuário>.github.io/money_app/`. No Android, abra no Chrome e use **Adicionar à tela inicial** para instalar.

Ao publicar uma versão nova, mude `VERSAO` em `sw.js` (e em `index.html`) para o navegador trocar o cache.

## Arquivos

- `index.html`: o app inteiro (HTML, CSS e JavaScript sem dependências; só as fontes vêm do Google Fonts).
- `sw.js`: service worker que guarda o app para abrir sem internet.
- `manifest.webmanifest`, `icon.svg`, `icon-*.png`: instalação como app.
