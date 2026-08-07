# Documento de Mockup — Detalhe de Projeto

**Projeto:** Portfólio Arthur.Correa
**Módulo relacionado:** Detalhe de Projeto — ERS correspondente em `docs/ers/project-detail.md`
**Data:** 06/08/2026

> Este documento **não é versionado internamente**. Seu histórico é controlado exclusivamente pelo Git — diferente do ERS, aqui não há campo de Versão nem Histórico de Revisões.

---

## 1. Objetivo

Este conjunto de telas valida visualmente a **página pública de detalhe de um projeto**, acessível em `/{lang}/projects/{slug}`. Ela é o destino decidido para o CTA "Ver Detalhes" do card do módulo Projetos (decisão QA-001, registrada em `docs/ers/projects.md` v1.1) e, por isso, nasce como um módulo próprio: o ERS de Projetos já registrava que uma página de detalhe seria "uma funcionalidade separada, com ERS e telas próprias".

O que estas telas validam:

- A anatomia da página: trilha de navegação, visual em 16:9, título, descrição de abertura, ações externas, corpo de texto longo, destaques técnicos e ficha lateral do projeto.
- O comportamento do layout em duas colunas no desktop (conteúdo + ficha fixa) e em coluna única em telas menores.
- O que acontece quando o projeto **não tem** nenhum conteúdo além dos fatos que o grid já exibe — cenário real de hoje, já que `data/projects.ts` tem uma única entrada sem texto longo.
- Os estados de exceção: carregamento e endereço que não corresponde a nenhum projeto publicado.
- A saída da página: voltar para a listagem e navegar para o projeto anterior/seguinte.

O mockup **não** cobre:

- A internacionalização real: as telas vivem fora do segmento de locale (`app/mockups/`) e por isso repetem os rótulos de interface em constantes locais. No módulo real, **todo texto de chrome** ("Voltar para projetos", "Sobre o projeto", "Ficha do projeto", "GitHub", "Deploy", mensagem de não encontrado) obrigatoriamente vem dos dicionários `app/[lang]/dictionaries/{en,pt-BR}.json`.
- Metadados de busca (título, descrição, canônica, alternativas por idioma, imagem de compartilhamento) — não são visíveis na tela, mas são inerentes a uma página pública por projeto e viram requisito no ERS.
- Qualquer persistência, integração com a API do GitHub, comentários, curtidas ou métricas de acesso.
- Imagens reais de projeto: por decisão do autor (QA-002 do módulo Projetos), **não há nenhum ativo em `public/` nesta entrega** — o visual 16:9 aparece sempre com o substituto gráfico (gradiente + ícone), e é assim que as telas o simulam.

Os dados usados são simulados, definidos em `app/mockups/project-detail/mock-data.ts`. **Apenas a primeira entrada (`portfolio`) corresponde a um projeto real** — e mesmo nela, o texto longo está marcado como `[TEXTO DE RASCUNHO]`, porque nenhum conteúdo estendido foi escrito ou aprovado pelo autor até aqui. As demais entradas trazem o prefixo `[EXEMPLO]` e não podem ser promovidas a `data/projects.ts`.

## 2. Telas Consolidadas

| ID      | Tela                          | Rota no Sistema                                 | Objetivo da Tela                                                                                                              |
| ------- | ----------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| MCK-001 | Página de Detalhe do Projeto  | `/mockups/project-detail/project-detail-page`   | Valida a anatomia completa da página e a alternância entre projetos, simulando o acesso a diferentes `slug`.                  |
| MCK-002 | Estados e Exceções do Detalhe | `/mockups/project-detail/project-detail-states` | Isola os casos em que a página não tem o conteúdo ideal: sem conteúdo estendido, sem repositório, carregando e slug inválido. |

## 3. Detalhamento por Tela

### MCK-001: Página de Detalhe do Projeto

**Descrição geral:** Representa a página pública que um visitante alcança ao acionar "Ver Detalhes" em um card da listagem, ou ao chegar direto por um link compartilhado ou por um resultado de busca. A tela inclui, no topo, um painel de controle tracejado que **não faz parte da interface real** — ele existe apenas para simular o acesso a `slug` diferentes e alternar o idioma do conteúdo.

A composição validada, de cima para baixo: trilha de navegação (Início / Projetos / título do projeto), visual em 16:9 com selo de destaque quando aplicável, título em `h1`, descrição curta de abertura, linha de ações externas, e então duas colunas — conteúdo (Sobre o projeto, Destaques técnicos) e ficha lateral (data de conclusão, papel, tecnologias). No rodapé, navegação para projeto anterior/seguinte e retorno à listagem.

**Elementos interativos:**

| Elemento                      | Tipo   | Ação Esperada                                                                                               | Estado(s) Simulado(s)                    |
| ----------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Botões do painel de controle  | Botão  | Alterna o `slug` simulado, como se outra URL tivesse sido acessada (não existe na tela real).               | ativo, inativo                           |
| Botão "Conteúdo: pt-BR / en"  | Botão  | Alterna o idioma da descrição, do texto longo, dos destaques e do papel, provando que todos são por locale. | pt-BR, en                                |
| Itens da trilha de navegação  | Link   | Levam à página inicial e à listagem de projetos; o item atual não é acionável.                              | acionável, atual                         |
| Botão "GitHub"                | Botão  | Abre o repositório em nova aba; desabilitado quando o projeto não tem repositório público.                  | habilitado, desabilitado                 |
| Botão "Deploy"                | Botão  | Abre o ambiente publicado em nova aba; desabilitado quando o projeto não tem deploy.                        | habilitado, desabilitado                 |
| Selo "Destaque"               | Selo   | Apenas indicativo, sobreposto ao canto superior esquerdo do visual.                                         | presente, ausente                        |
| Botão "Voltar para projetos"  | Botão  | Retorna à listagem no mesmo idioma.                                                                         | habilitado                               |
| Botões "Anterior" / "Próximo" | Botão  | Navegam para o detalhe do projeto vizinho na ordem da listagem; desabilitados nas extremidades.             | habilitado, desabilitado                 |
| Ficha lateral                 | Painel | Permanece fixa ao rolar em telas grandes; acompanha o fluxo em telas menores.                               | fixa (desktop), em fluxo (mobile/tablet) |

**Situações e estados simulados:**

- **Projeto real com conteúdo estendido de rascunho** (`portfolio`) — dois parágrafos, três destaques, papel definido, com repositório e sem deploy.
- **Projeto de exemplo com conteúdo longo** (`example-full`) — três parágrafos e sete tecnologias, exercitando a medida de leitura, o ritmo vertical e o comportamento fixo da ficha quando a coluna de conteúdo ultrapassa a dobra.
- **Projeto sem conteúdo estendido** (`example-minimal`) — sem texto longo, sem destaques e sem papel: a seção "Sobre o projeto" cai para a descrição curta e "Destaques técnicos" desaparece por inteiro, sem deixar título órfão.
- **Projeto sem repositório público** (`example-no-repo`) — só o deploy é acionável.
- **Extremidades da navegação** — no primeiro projeto, "Anterior" fica desabilitado; no último, "Próximo".
- **Ausência de imagem** — todos os visuais 16:9 usam o substituto gráfico, refletindo a decisão de não publicar ativos nesta entrega.
- **Conteúdo em dois idiomas** — comprova que descrição, texto longo, destaques e papel são registros por locale, e não strings únicas.

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
  "image": null,
  "featured": true,
  "role": {
    "en": "[DRAFT COPY] Sole author...",
    "pt-BR": "[TEXTO DE RASCUNHO] Autor único..."
  },
  "longDescription": {
    "en": ["[DRAFT COPY] paragraph 1", "[DRAFT COPY] paragraph 2"],
    "pt-BR": [
      "[TEXTO DE RASCUNHO] parágrafo 1",
      "[TEXTO DE RASCUNHO] parágrafo 2"
    ]
  },
  "highlights": {
    "en": ["[DRAFT] item 1", "[DRAFT] item 2"],
    "pt-BR": ["[RASCUNHO] item 1", "[RASCUNHO] item 2"]
  }
}
```

**Suposições assumidas nesta tela:**

- A página é acessível por `slug`, o mesmo identificador já usado em `data/projects.ts` — nenhum identificador novo é introduzido.
- Os três campos de conteúdo estendido (`longDescription`, `highlights`, `role`) são **opcionais**: a página precisa ser útil sem nenhum deles, porque hoje nenhum projeto real os possui.
- A navegação anterior/seguinte segue a mesma ordem da listagem (destaques primeiro, depois data de conclusão decrescente — RN-004 do módulo Projetos).
- A ficha lateral repete tecnologias e data já visíveis no card; nenhum fato novo é inventado para preenchê-la.
- Não há galeria de múltiplas imagens: apenas um visual de abertura.

---

### MCK-002: Estados e Exceções do Detalhe

**Descrição geral:** Tela de laboratório que apresenta, um de cada vez e com legenda explicativa, cada situação em que a página de detalhe recebe menos do que o cenário ideal. Serve para validar que a página nunca exibe seção vazia, título órfão, área em branco nem conteúdo fabricado.

**Elementos interativos:**

| Elemento                     | Tipo  | Ação Esperada                                                                        | Estado(s) Simulado(s)    |
| ---------------------------- | ----- | ------------------------------------------------------------------------------------ | ------------------------ |
| Botões de estado             | Botão | Alternam o cenário exibido e sua legenda (não existem na tela real).                 | ativo, inativo           |
| Botão "Conteúdo: pt-BR / en" | Botão | Alterna o idioma do conteúdo do cenário atual.                                       | pt-BR, en                |
| Ações do projeto             | Botão | Registram a ação executada no painel; desabilitadas quando não há URL.               | habilitado, desabilitado |
| Botão "Voltar para projetos" | Botão | Presente inclusive na tela de projeto não encontrado, para não criar beco sem saída. | habilitado               |

**Situações e estados simulados:**

- **Conteúdo estendido** — cenário completo, usado como referência de comparação.
- **Somente fatos do grid** — projeto sem `longDescription`, `highlights` nem `role`: valida a degradação graciosa.
- **Sem repositório público** — a ação indisponível permanece visível e desabilitada, coerente com RN-005 do módulo Projetos.
- **Carregando** — esqueleto com as mesmas proporções da página real (visual 16:9, título, corpo e ficha).
- **Slug inexistente** — estado de "projeto não encontrado", com título, explicação e caminho de volta para a listagem. Na tela real, isso corresponde a uma resposta "não encontrado", nunca a conteúdo fabricado.

**Dados mocados utilizados:** os mesmos de `app/mockups/project-detail/mock-data.ts` (ver MCK-001); esta tela apenas seleciona entradas específicas por `slug`.

**Suposições assumidas nesta tela:**

- Um `slug` desconhecido produz "não encontrado", e não um redirecionamento silencioso para a listagem.
- A tela de não encontrado sempre oferece retorno à listagem.
- Quando `longDescription` está ausente, a seção "Sobre o projeto" reaproveita a descrição curta em vez de sumir — o título da seção nunca fica sem corpo.
- Quando `highlights` está ausente, a seção inteira (título incluído) é omitida.

## 4. Perguntas e Suposições em Aberto

| ID    | Pergunta/Suposição                                                                                                                                                                                                                                                | Origem (Tela)    | Status                                        |
| ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | --------------------------------------------- |
| Q-001 | A página de detalhe deve existir para **todos** os projetos cadastrados, ou apenas para aqueles que possuem conteúdo estendido? Se for para todos, um projeto sem texto longo terá uma página bastante curta — o que hoje seria o caso do único projeto real.     | MCK-001, MCK-002 | Aberta — padrão assumido: para todos.         |
| Q-002 | O autor pretende escrever o conteúdo estendido (`longDescription`, `highlights`, `role`) para o projeto `portfolio` nesta entrega? Todo o texto longo simulado está marcado como rascunho e **não pode** ser publicado sem redação e aprovação do autor (RN-006). | MCK-001          | Aberta — bloqueante para o conteúdo real.     |
| Q-003 | O conteúdo longo é texto simples em parágrafos (assumido) ou precisa de formatação rica (subtítulos, listas, blocos de código, links inline)? A segunda opção exigiria uma decisão de formato de autoria.                                                         | MCK-001          | Aberta — padrão assumido: parágrafos simples. |
| Q-004 | A navegação "projeto anterior/próximo" deve existir? Ela é conveniente, mas é uma funcionalidade separável do detalhe em si.                                                                                                                                      | MCK-001          | Aberta — mockada, sujeita a confirmação.      |
| Q-005 | Deve haver uma seção de "projetos relacionados" (por tecnologia em comum)? Não foi mockada, por ser separável e por só fazer sentido com mais projetos cadastrados.                                                                                               | —                | Aberta — não incluída no padrão.              |
| Q-006 | A imagem de compartilhamento social (Open Graph) por projeto deve ser a imagem padrão do site (assumido, já que não há ativos), ou gerada dinamicamente a partir do título e das tecnologias?                                                                     | —                | Aberta — padrão assumido: imagem do site.     |
| Q-007 | A ficha lateral deve exibir mais algum fato além de data de conclusão, papel e tecnologias (por exemplo, cliente/contexto ou duração)? Qualquer campo novo exige um fato real correspondente.                                                                     | MCK-001          | Aberta — padrão assumido: os três atuais.     |

## 5. Direcionamento para o ERS

O que já ficou evidente e vira requisito no ERS:

- **RF de página por projeto** — uma rota pública por `slug`, sob o segmento de locale, renderizada estaticamente a partir de `data/projects.ts`.
- **RF de anatomia** — trilha de navegação, visual 16:9 com substituto gráfico, título, descrição de abertura, ações externas, corpo textual, destaques e ficha lateral.
- **RF de degradação graciosa** — a página precisa ser correta e completa para um projeto que só tem os fatos do grid, sem seção vazia nem título órfão.
- **RF de endereço inválido** — `slug` desconhecido e locale desconhecido produzem "não encontrado", com caminho de volta para a listagem.
- **RF de saída** — retorno à listagem e navegação entre projetos vizinhos, na mesma ordem da listagem.
- **RF de metadados** — título, descrição, canônica e alternativas por idioma por projeto; a página é indexável e compartilhável, o que é inerente a uma superfície pública por item.
- **RN de reaproveitamento do schema** — os fatos vêm da mesma estrutura `Project` já existente e estendida pelo módulo Projetos; este módulo acrescenta apenas campos **opcionais** de conteúdo estendido, sem renomear nem remover nada.
- **RN de veracidade** — nenhum texto longo pode ser publicado sem ter sido escrito pelo autor; os rascunhos das telas de mockup não podem ser promovidos a `data/projects.ts`.
- **RN de links** — repositório e deploy continuam mapeando para `repoUrl` e `liveUrl`, abrindo em nova aba sem expor a janela de origem.
- **Schema** — `Project` estendido com `longDescription?`, `highlights?` e `role?`, todos registros por locale e todos opcionais.

O que ainda **bloqueia** o conteúdo (não a construção): Q-002 — sem texto escrito pelo autor, a página do único projeto real sai apenas com os fatos do grid, que é exatamente o cenário "somente fatos do grid" validado em MCK-002. Q-001, Q-003, Q-004, Q-005, Q-006 e Q-007 admitem um padrão documentado no ERS, mas devem ser confirmados.
