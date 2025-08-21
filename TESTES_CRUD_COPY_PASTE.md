# 📋 TESTES CRUD - COPIE E COLE

## 🚀 Como Usar:
1. **Inicie o servidor**: `npm run dev`
2. **Copie e cole** cada teste abaixo
3. **Execute** no terminal ou Insomnia/Postman

---

## 🧑‍🦰 TESTES PARA VÍTIMAS

### 1. **CREATE** - Criar Vítima
**Rota:** `POST http://localhost:3000/vitima`

**JSON:**
```json
{
  "cpf": "12345678901",
  "telefone": "11999999999",
  "senha": "senha123",
  "login": "maria.silva",
  "email": "maria@email.com",
  "nome": "Maria",
  "sobrenome": "Silva",
  "data_cadastro": "2024-01-01",
  "endereco": "Rua das Flores, 123",
  "data_nascimento": "1990-05-15",
  "idade": 33,
  "escolaridade": "Ensino Superior",
  "etnia": "Branca"
}
```

### 2. **READ** - Listar Todas as Vítimas
**Rota:** `GET http://localhost:3000/vitima`

**JSON:** Nenhum (sem body)

### 3. **READ** - Buscar Vítima por ID
**Rota:** `GET http://localhost:3000/vitima/1`

**JSON:** Nenhum (sem body)

### 4. **UPDATE** - Atualizar Vítima
**Rota:** `PUT http://localhost:3000/vitima/1`

**JSON:**
```json
{
  "endereco": "Rua das Palmeiras, 456",
  "escolaridade": "Pós-Graduação",
  "idade": 34
}
```

### 5. **DELETE** - Deletar Vítima
**Rota:** `DELETE http://localhost:3000/vitima/1`

**JSON:** Nenhum (sem body)

---

## 👨‍⚕️ TESTES PARA PROFISSIONAIS

### 1. **CREATE** - Criar Profissional
**Rota:** `POST http://localhost:3000/profissional`

**JSON:**
```json
{
  "cpf": "98765432100",
  "telefone": "11888888888",
  "senha": "senha456",
  "login": "dr.joao",
  "email": "joao@clinica.com",
  "nome": "João",
  "sobrenome": "Santos",
  "data_cadastro": "2024-01-01",
  "numero_registro": "CRM12345",
  "cargo": "Médico",
  "especialidade": "Psicologia"
}
```

### 2. **READ** - Listar Todos os Profissionais
**Rota:** `GET http://localhost:3000/profissional`

**JSON:** Nenhum (sem body)

### 3. **READ** - Buscar Profissional por ID
**Rota:** `GET http://localhost:3000/profissional/1`

**JSON:** Nenhum (sem body)

### 4. **UPDATE** - Atualizar Profissional
**Rota:** `PUT http://localhost:3000/profissional/1`

**JSON:**
```json
{
  "especialidade": "Psicologia Clínica",
  "cargo": "Psicólogo Clínico"
}
```

### 5. **DELETE** - Deletar Profissional
**Rota:** `DELETE http://localhost:3000/profissional/1`

**JSON:** Nenhum (sem body)

---

## 📅 TESTES PARA AGENDAMENTOS

### 1. **CREATE** - Criar Agendamento
**Rota:** `POST http://localhost:3000/agendamento`

**JSON:**
```json
{
  "data": "2024-01-15",
  "hora": "14:00",
  "profissional_id": 1,
  "paciente_id": 1,
  "status": "Agendado"
}
```

### 2. **READ** - Listar Todos os Agendamentos
**Rota:** `GET http://localhost:3000/agendamento`

**JSON:** Nenhum (sem body)

### 3. **READ** - Buscar Agendamento por ID
**Rota:** `GET http://localhost:3000/agendamento/1`

**JSON:** Nenhum (sem body)

### 4. **UPDATE** - Atualizar Agendamento
**Rota:** `PUT http://localhost:3000/agendamento/1`

**JSON:**
```json
{
  "data": "2024-01-16",
  "hora": "15:00",
  "status": "Confirmado"
}
```

### 5. **DELETE** - Deletar Agendamento
**Rota:** `DELETE http://localhost:3000/agendamento/1`

**JSON:** Nenhum (sem body)

---

## 🔍 ENDPOINTS EXISTENTES

### Vítimas
- `GET /vitima` - Listar todas
- `GET /vitima/:id` - Buscar por ID
- `POST /vitima` - Criar
- `PUT /vitima/:id` - Atualizar
- `DELETE /vitima/:id` - Deletar

### Profissionais
- `GET /profissional` - Listar todos
- `GET /profissional/:id` - Buscar por ID
- `POST /profissional` - Criar
- `PUT /profissional/:id` - Atualizar
- `DELETE /profissional/:id` - Deletar

### Agendamentos
- `GET /agendamento` - Listar todos
- `GET /agendamento/:id` - Buscar por ID
- `POST /agendamento` - Criar
- `PUT /agendamento/:id` - Atualizar
- `DELETE /agendamento/:id` - Deletar

---