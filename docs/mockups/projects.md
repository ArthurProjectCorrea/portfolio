# Documento de Mockup — Projetos

**Projeto:** Portfólio Arthur.Correa
**Módulo relacionado:** Projetos — ERS correspondente em `docs/ers/projects.md`
**Data:** 06/08/2026

> Este documento **não é versionado internamente**. Seu histórico é controlado exclusivamente pelo Git — diferente do ERS, aqui não há campo de Versão nem Histórico de Revisões.

---

## 1. Objetivo

Este conjunto de telas valida visualmente a **listagem pública de projetos** do portfólio, conforme a issue #19: o card de projeto (visual 16:9, título, descrição, badges de tecnologia, CTAs e comportamento de hover) e o grid responsivo que o organiza (1 coluna em mobile, 2 em tablet, 3 em desktop, largura máxima de 1200px centralizada).

O mockup **não** cobre:

- Regras finais de ordenação, destaque (`featured`) e origem das imagens — são pontos em aberto na Seção 4.
- A internacionalização real: as telas de mockup vivem fora do segmento de locale (`app/mockups/`) e por isso repetem os rótulos de interface em constantes locais. No módulo real, **todo texto de chrome** (título da seção, "Ver Detalhes", "GitHub", "Deploy", estado vazio) obrigatoriamente vem dos dicionários `app/[lang]/dictionaries/{en,pt-BR}.json`.
- Qualquer persistência, integração com a API do GitHub, busca, filtro ou paginação — não pedidos pela issue e não simulados aqui.
- A tela de detalhe de um projeto — sua existência é uma decisão em aberto (Q-001), portanto nenhuma tela de detalhe foi construída.

Os dados usados são simulados, definidos em `app/mockups/projects/mock-data.ts`. **Apenas a primeira entrada (`portfolio`) é real** — as demais são explicitamente marcadas com o prefixo `[EXEMPLO]` justamente para não serem confundidas com conteúdo factual e nunca copiadas para `data/projects.ts` sem confirmação.

## 2. Telas Consolidadas

| ID      | Tela                       | Rota no Sistema                         | Objetivo da Tela                                                                                              |
| ------- | -------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| MCK-001 | Grid de Projetos           | `/mockups/projects/projects-grid`       | Valida o layout responsivo do grid, o cabeçalho da seção e os estados da listagem (cheia, carregando, vazia). |
| MCK-002 | Estados do Card de Projeto | `/mockups/projects/project-card-states` | Isola cada variação de dados que um card precisa suportar sem quebrar o alinhamento do grid.                  |

## 3. Detalhamento por Tela

### MCK-001: Grid de Projetos

**Descrição geral:** Representa a página pública que lista os projetos do portfólio. É o destino do link "Projects" já presente no cabeçalho do site (`components/shared/site-header.tsx`, que aponta para `/{lang}/projects` — rota que **ainda não existe** no repositório) e do CTA "Ver Projetos" da home (que hoje aponta para a âncora `#projects`). A tela inclui, no topo, um painel de controle tracejado que **não faz parte da interface real** — ele existe apenas para alternar entre os estados simulados.

**Elementos interativos:**

| Elemento                         | Tipo   | Ação Esperada                                                                                | Estado(s) Simulado(s)    |
| -------------------------------- | ------ | -------------------------------------------------------------------------------------------- | ------------------------ |
| Botões do painel de controle     | Botão  | Alterna o estado exibido pelo grid (não existe na tela real).                                | ativo, inativo           |
| Botão "Descrição: pt-BR / en"    | Botão  | Alterna o idioma da descrição dos projetos, provando que a descrição é por locale.           | pt-BR, en                |
| Card de projeto (área do visual) | Cartão | Ao passar o mouse: elevação (translate + sombra), overlay escuro sobre a imagem e leve zoom. | padrão, hover            |
| Botão "Ver Detalhes"             | Botão  | Registra a ação no painel de estado (destino real indefinido — ver Q-001).                   | habilitado               |
| Botão "GitHub"                   | Botão  | Registra a ação com a URL do repositório; desabilitado quando o projeto não tem repositório. | habilitado, desabilitado |
| Botão "Deploy"                   | Botão  | Registra a ação com a URL do deploy; desabilitado quando o projeto não tem deploy publicado. | habilitado, desabilitado |
| Badge "Destaque"                 | Selo   | Apenas indicativo, sobreposto ao canto superior esquerdo do visual.                          | presente, ausente        |

**Situações e estados simulados:**

- **Lista completa** — cinco projetos, exercitando o grid nos três breakpoints (1 / 2 / 3 colunas, gap de 2rem, `max-width: 1200px`).
- **Somente destaques** — apenas projetos com `featured: true`, validando o comportamento de uma listagem reduzida.
- **Um único projeto** — cenário real de hoje (`data/projects.ts` tem exatamente uma entrada): valida que o grid não estica um card solitário de forma estranha.
- **Carregando** — três esqueletos com as mesmas proporções do card.
- **Vazio** — componente `Empty` com ícone, título e descrição, para o caso de nenhum projeto cadastrado.
- **Descrição em dois idiomas** — comprova que `description` é um registro por locale, e não uma string única.

**Dados mocados utilizados:**

```json
// Estrutura ilustrativa dos dados mocados usados nesta tela.
// Não é o schema de produção — isso será formalizado no ERS (Seção 7).
{
  "slug": "portfolio",
  "title": "Arthur.Correa Portfolio",
  "description": {
    "en": "This site — a Next.js portfolio with i18n routing...",
    "pt-BR": "Este site — um portfólio em Next.js com roteamento i18n..."
  },
  "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
  "repoUrl": "https://github.com/ArthurProjectCorrea/portfolio",
  "liveUrl": null,
  "completedAt": "2026-08",
  "image": "/globe.svg",
  "featured": true
}
```

**Suposições assumidas nesta tela:**

- A listagem exibe **todos** os projetos de `data/projects.ts`, sem filtro, busca ou paginação (a issue não pede nenhum dos três).
- A ordenação padrão adotada foi a ordem literal do arquivo; nenhuma regra de ordenação por data ou destaque foi confirmada.
- O campo `featured` serve para destacar visualmente o card (selo), não para segmentá-lo em uma seção separada.
- O visual usa `/globe.svg` e `/window.svg` apenas como marcadores de posição: não existe pipeline de screenshots de projeto no repositório.
- Projetos sem imagem recebem um fallback gráfico (gradiente + ícone) em vez de um espaço vazio.

---

### MCK-002: Estados do Card de Projeto

**Descrição geral:** Tela de laboratório que apresenta cada variação relevante de card lado a lado, com legenda. Serve para validar que o card se mantém alinhado independentemente de campos opcionais ausentes ou de textos longos.

**Elementos interativos:**

| Elemento                      | Tipo  | Ação Esperada                                                                                  | Estado(s) Simulado(s)    |
| ----------------------------- | ----- | ---------------------------------------------------------------------------------------------- | ------------------------ |
| Botão "Forçar hover"          | Botão | Aplica em todos os cards o estado de hover (elevação + overlay escuro), sem depender do mouse. | ligado, desligado        |
| Botão "Descrição: pt-BR / en" | Botão | Alterna o idioma das descrições.                                                               | pt-BR, en                |
| CTAs de cada card             | Botão | Registram a ação executada no rodapé do painel.                                                | habilitado, desabilitado |

**Situações e estados simulados:**

- Projeto em destaque, com imagem e repositório, mas **sem** deploy.
- Projeto **sem imagem**, exercitando o fallback gráfico.
- Projeto **sem repositório**, com apenas o deploy disponível.
- Projeto com título e descrição muito longos e **sete** tecnologias — valida o recorte do título em 2 linhas, da descrição em 3 linhas, e o resumo de badges excedentes (`+3`).
- Projeto **sem nenhum link externo** — só o CTA "Ver Detalhes" permanece habilitado.
- Card em estado de carregamento (esqueleto).

**Dados mocados utilizados:** os mesmos de `app/mockups/projects/mock-data.ts` (ver MCK-001); esta tela apenas seleciona entradas específicas por `slug`.

**Suposições assumidas nesta tela:**

- CTAs sem URL correspondente ficam **desabilitados e visíveis** (em vez de ocultos), para manter o alinhamento entre cards vizinhos. A alternativa — ocultar o botão — não foi confirmada.
- No máximo 4 badges de tecnologia são exibidas; o excedente vira um indicador `+N`.
- "Ver Detalhes" é sempre exibido, ainda que seu destino esteja indefinido (Q-001).

## 4. Perguntas e Suposições em Aberto

| ID    | Pergunta/Suposição                                                                                                                                                                                                                                                                                                                   | Origem (Tela)    | Status |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ------ |
| Q-001 | O CTA "Ver Detalhes" deve levar a uma página de detalhe por projeto (`/{lang}/projects/{slug}`, que precisaria ser especificada e construída), deve ser removido nesta entrega, ou deve virar um atalho para o deploy/repositório?                                                                                                   | MCK-001, MCK-002 | Aberta |
| Q-002 | Qual é a origem das imagens 16:9 dos cards: screenshots reais fornecidos pelo autor, gráficos genéricos gerados (gradiente + tecnologia), ou nenhum visual até haver screenshots? Hoje não existe nenhum ativo de projeto em `public/`, o que **bloqueia** o card real.                                                              | MCK-001, MCK-002 | Aberta |
| Q-003 | Quais projetos reais devem povoar a listagem? `CURRICULUM.md` descreve **vínculos empregatícios** (HPAR, Inovatus, DSS, CSF), não projetos publicáveis com repositório/deploy. Hoje só existe um projeto real (este portfólio). Devem ser cadastrados projetos reais informados pelo autor, ou a listagem sai com uma única entrada? | MCK-001          | Aberta |
| Q-004 | A listagem é uma **rota própria** (`/{lang}/projects`, já linkada pelo cabeçalho mas inexistente — hoje resulta em 404), uma **seção da home** (o CTA da home aponta para a âncora `#projects`), ou ambas (seção na home com projetos em destaque + rota completa)?                                                                  | MCK-001          | Aberta |
| Q-005 | Qual é a regra de ordenação da listagem: `completedAt` decrescente, destaques primeiro, ou ordem manual do arquivo?                                                                                                                                                                                                                  | MCK-001          | Aberta |
| Q-006 | CTAs sem URL correspondente devem ficar desabilitados (assumido) ou ocultos?                                                                                                                                                                                                                                                         | MCK-002          | Aberta |
| Q-007 | O campo `featured` deve apenas destacar o card com um selo (assumido) ou também alterar sua posição/tamanho no grid?                                                                                                                                                                                                                 | MCK-001          | Aberta |

## 5. Direcionamento para o ERS

O que já ficou evidente e vira requisito no ERS:

- **RF de listagem** — página que renderiza todos os projetos de `data/projects.ts` em um grid responsivo 1/2/3 colunas, gap de 2rem, `max-width` 1200px centralizado.
- **RF de card** — visual 16:9, título, descrição recortada, badges de tecnologia com excedente resumido, CTAs e comportamento de hover (elevação + overlay escuro).
- **RF de estado vazio** — a listagem precisa se comportar corretamente com zero projetos.
- **RN de origem de dados** — os fatos do projeto (título, descrição, tecnologias, URLs) vivem em `data/projects.ts`; todo o restante do texto vem dos dicionários por locale.
- **RN de compatibilidade** — o `Project` existente é consumido por `lib/site-stats.ts` (`getProjectsCount`, `getTechnologiesCount`) e alimenta as métricas da home; a interface deve ser **estendida**, nunca substituída, e `slug`, `technologies` e `completedAt` não podem ser renomeados.
- **RN de links** — "GitHub" e "Deploy" mapeiam diretamente para os campos já existentes `repoUrl` e `liveUrl`; o objeto `links: { github, deploy }` esboçado na issue **não** deve ser introduzido.
- **Schema** — `Project` estendido com `image?: string` e `featured?: boolean`.

O que ainda **bloqueia** o fechamento completo do ERS: Q-001 (escopo da página de detalhe), Q-002 (origem das imagens) e Q-003 (conteúdo real dos projetos). Sem essas três respostas, o `module-implementer` não consegue construir o visual do card nem decidir o destino de um dos três CTAs. Q-004, Q-005, Q-006 e Q-007 admitem um padrão documentado no ERS, mas devem ser confirmados.
