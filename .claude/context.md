# Project Context: Portfolio Development Workflow

## 🎯 Propósito

Este projeto utiliza um **GitHub Project Board** para manter o desenvolvedor (Arthur Correa) **focado, organizado e sem perder demandas de vista**. O board funciona como:

1. **Sistema de priorização** — o que fazer hoje vs. esta semana vs. depois
2. **Rastreador de progresso** — visualizar avanço tangível
3. **Proteção contra scope creep** — evitar ideias novas desviem do plano
4. **Referência de contexto** — Claude acessa o board pra entender estado atual do projeto

---

## 📋 Estrutura do Board

### **Colunas (Status)**

| Coluna | Propósito | Quando usar |
|--------|-----------|------------|
| **Backlog** | Ideias, tarefas futuras sem data. Sem compromisso de execução. | Registrar algo que pode ser útil depois, mas não agora |
| **This Week** | Tarefas planejadas pra esta semana. Revisadas diariamente. | Refiltrar Backlog baseado em prioridade + tempo disponível |
| **Today** | Tarefas de hoje. Pequenas, focadas, entregáveis. | Deve caber no tempo disponível, entregável em ~1-3h cada |
| **In Progress** | O que está sendo feito AGORA. Um card por vez. | Pegar um card de "Today" e começar a trabalhar |
| **Done** | Tarefas concluídas. Fica aí pro resto do dia (satisfação visual). | Qualquer coisa que terminou |

### **Campos (Metadados)**

| Campo | Valores | Propósito |
|-------|---------|-----------|
| **Status** | Backlog, This Week, Today, In Progress, Done | Organiza visualmente as colunas |
| **Priority** | P0 (crítica), P1 (alta), P2 (baixa) | Define urgência e sequência |
| **Labels** | setup, ui, homepage, projects, etc | Agrupa por tipo/área do projeto |

---

## 🔄 Fluxo de Trabalho Diário

### **Manhã (Abertura do dia)**
1. Claude revisa o board
2. Reporta: o que ficou pendente de ontem? o que é novo hoje?
3. Monta o kanban do dia: puxa de "This Week" pra "Today"
4. Arruma prioridades se necessário
5. **Decision point:** Você concorda com a ordem ou quer ajustar?

### **Durante o dia**
1. Você pega um card de "Today"
2. Move pra "In Progress"
3. **Trabalha focado** — sem tirar os olhos, sem ideias novas virarem prioridade
4. Quando termina, move pra "Done"
5. Pega o próximo de "Today"

### **Ideia nova bate na porta**
- Você avisa Claude: `Ideia: [descrição]`
- Claude **NÃO executa** — avalia:
  - Compete com algo pendente hoje?
  - Vale a pena virar "This Week"?
  - Ou é só "Backlog" pra depois?
- Veredito: **Entra hoje**, **Entra esta semana**, ou **Vai pro Backlog**
- Você continua focado

### **Fim do dia**
1. Você reporta: o que terminou? o que ficou pendente?
2. Claude atualiza o board
3. "Done" fica aí até amanhã (satisfação)
4. Pendente volta pra "Today" ou vai pra "This Week"

---

## 🛑 Proteção Contra Padrões Ruins

### **Padrão Identificado em Tentativas Passadas:**
- Múltiplos projetos iniciados, nenhum terminado
- Melhoria contínua infinita sem entrega
- Ideias novas sempre parecem mais interessantes
- Sensação de "nunca termino nada"

### **Como o Board Combate Isso:**

| Risco | Proteção |
|-------|----------|
| Ideia nova vira prioridade máxima | Claude avalia antes de aceitar |
| Scope creep (projeto inteiro fica gigante) | "Today" fica pequeno, focado, entregável |
| Perder tarefas pendentes na bagunça | Board é a fonte da verdade, Claude consulta |
| Desânimo por falta de progresso | "Done" acumula visualmente, mostras avanço real |
| Paralisia por escolher errado | Claude propõe ordem, você só confirma |

---

## 💾 Dados de Acesso

**GitHub Project:** https://github.com/users/ArthurProjectCorrea/projects/13

**Projeto:** Workflow

**Repo vinculado:** https://github.com/ArthurProjectCorrea/portfolio

**Issues:** 13 issues (4 Today, 6 This Week, 3 Backlog)

---

## 📌 Papel de Claude Neste Projeto

Claude atua como **gerente externo de foco**:

✅ **FAZ:**
- Consulta o board pra entender estado atual
- Propõe ordem de prioridade
- Avalia se ideia nova compete com tarefas pendentes
- Atualiza board conforme você relata progresso
- Aponta se algo está sendo adiado repetidamente
- Mantém descrição de cada task sincronizada com realidade

❌ **NÃO FAZ:**
- Executar código/design (você faz)
- Decidir prioridade sozinho (você confirma)
- Deixar ideia nova virar prioridade sem avaliar (sempre questiona primeiro)
- Amaçiar regras por empatia (mantém rigor, mas com respeito)

---

## 🎯 Sucesso Neste Projeto

**Portfólio será considerado PRONTO quando:**
- ✅ Setup, Navigation, Hero, Footer concluídos
- ✅ Projects Grid + Detail Page funcional
- ✅ About com Timeline + Skills
- ✅ Contact com formulário e links
- ✅ Deployado em Vercel com domínio
- ✅ Testado em mobile/tablet/desktop
- ✅ Sem console errors
- ✅ Pronto pra compartilhar

**Data alvo:** 1-2 semanas (portfólio MVP)

**Depois:** Blog, Email Service, Analytics ficam pro Backlog (projeto separado depois)

---

## 🔗 Links Úteis

- **Board:** https://github.com/users/ArthurProjectCorrea/projects/13
- **Repo:** https://github.com/ArthurProjectCorrea/portfolio
- **Issues:** Veja em Projects → Board
- **Currículo (referência):** `/CURRICULUM.md`

---

**Última atualização:** 06 de agosto de 2026

**Mantenedor:** Arthur Correa + Claude (Central de Foco)
