# Documento de Mockup — [Nome do Módulo]

**Projeto:** [Nome do Projeto/Sistema]
**Módulo relacionado:** [Nome do módulo — referencia o ERS correspondente em `docs/ers/[modulo].md`, se já existir]
**Data:** [Data de Criação]

> Este documento **não é versionado internamente**. Seu histórico é controlado exclusivamente pelo Git — diferente do ERS, aqui não há campo de Versão nem Histórico de Revisões.

---

## 1. Objetivo

Descreva o que este conjunto de telas de mockup valida: qual fluxo ou funcionalidade está sendo simulado visualmente antes da elaboração do ERS correspondente. Deixe claro o que o mockup **não** cobre (regras de negócio finais, integrações reais, persistência de dados) — o mockup existe para validar interface e comportamento esperado com dados simulados, não para validar implementação.

## 2. Telas Consolidadas

| ID      | Tela           | Rota no Sistema            | Objetivo da Tela                     |
| ------- | -------------- | -------------------------- | ------------------------------------ |
| MCK-001 | [Nome da tela] | `/mockups/[modulo]/[tela]` | [O que essa tela valida visualmente] |

_(Uma linha por tela. Adicione quantas forem necessárias para cobrir o módulo.)_

## 3. Detalhamento por Tela

### MCK-001: [Nome da Tela]

**Descrição geral:** [O que a tela representa, em que contexto/etapa do fluxo o agente a acessa]

**Elementos interativos:**

| Elemento           | Tipo (Botão/Campo/Link/etc.) | Ação Esperada                       | Estado(s) Simulado(s)                          |
| ------------------ | ---------------------------- | ----------------------------------- | ---------------------------------------------- |
| [Nome do elemento] | [Tipo]                       | [O que deve acontecer ao acioná-lo] | [padrão, carregando, desabilitado, erro, etc.] |

**Situações e estados simulados:**

Liste cada cenário que os dados mocados desta tela reproduzem — sucesso, erro de validação, estado vazio, acesso não permitido, limites/edge cases relevantes ao módulo.

- [Situação 1]
- [Situação 2]

**Dados mocados utilizados:**

```json
// Estrutura ilustrativa dos dados mocados usados nesta tela.
// Não é o schema de produção — isso será formalizado no ERS (Seção 7).
```

**Suposições assumidas nesta tela:** [Premissas de comportamento ainda não confirmadas com o solicitante — cada uma vira uma pergunta na Seção 4 ou um Requisito Funcional candidato no ERS.]

---

_(Repita a estrutura da Seção 3 — descrição, elementos interativos, estados simulados, dados mocados e suposições — para cada tela listada na Seção 2.)_

## 4. Perguntas e Suposições em Aberto

Consolida, de todas as telas, os pontos que precisam ser confirmados ou decididos antes ou durante a elaboração do ERS.

| ID    | Pergunta/Suposição  | Origem (Tela) | Status                      |
| ----- | ------------------- | ------------- | --------------------------- |
| Q-001 | [Pergunta objetiva] | MCK-001       | [Aberta / Confirmada / N/A] |

## 5. Direcionamento para o ERS

Resuma o que este documento de mockup fornece como insumo direto para a elaboração do ERS do módulo: quais Requisitos Funcionais, Regras de Negócio, Eventos e Critérios de Aceite já ficaram evidentes a partir da validação visual, e quais pontos da Seção 4 ainda bloqueiam o fechamento do ERS.
