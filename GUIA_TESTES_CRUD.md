# 🧪 GUIA DE TESTES CRUD - API de Suporte a Vítimas

## 📋 **Estrutura dos Dados**

### **Vítima (vitimas collection)**
```json
{
  "_id": "string",
  "endereco": "string",
  "data_nascimento": "Date",
  "idade": "number",
  "escolaridade": "string",
  "etnia": "string"
}
```

### **Profissional (profissionais_saude collection)**
```json
{
  "_id": "string",
  "numero_registro": "string",
  "cargo": "string",
  "especialidade": "string"
}
```

### **Agendamento (agendamentos collection)**
```json
{
  "_id": "string",
  "data": "Date",
  "hora": "string (HH:MM)",
  "profissional_id": "ObjectId",
  "paciente_id": "ObjectId",
  "status": "string"
}
```

## 🚀 **ROTAS DISPONÍVEIS**

### **1. VÍTIMA** (`/api/vitimas`)
- `POST /` - Criar vítima
- `GET /:id` - Buscar vítima por ID
- `GET /` - Listar todas as vítimas
- `PUT /:id` - Atualizar vítima
- `DELETE /:id` - Deletar vítima

### **2. PROFISSIONAL** (`/api/profissionais`)
- `POST /` - Criar profissional
- `GET /:id` - Buscar profissional por ID
- `GET /` - Listar todos os profissionais
- `PUT /:id` - Atualizar profissional
- `DELETE /:id` - Deletar profissional

### **3. AGENDAMENTO** (`/agendamento`)
- `POST /` - Criar agendamento
- `GET /:id` - Buscar agendamento por ID
- `GET /` - Listar todos os agendamentos
- `PUT /:id` - Atualizar agendamento
- `DELETE /:id` - Deletar agendamento

---

## 🧪 **TESTES CRUD - VÍTIMA**

### **1. CREATE - Criar Vítima**
```bash
curl -X POST http://localhost:4000/api/vitimas \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "telefone": "82999999999",
    "senha": "senha123",
    "login": "maria.silva",
    "email": "maria@email.com",
    "nome": "Maria",
    "sobrenome": "Silva",
    "endereco": "Rua das Flores, 123 - Centro, Maceió/AL",
    "data_nascimento": "1990-05-20",
    "idade": 34,
    "escolaridade": "ensino superior",
    "etnia": "parda"
  }'
```

**Resposta Esperada (201):**
```json
{
  "message": "Vítima criada com sucesso",
  "vitima": {
    "_id": "68a90a4e17dec6a589748a60",
    "endereco": "Rua das Flores, 123 - Centro, Maceió/AL",
    "data_nascimento": "1990-05-20T00:00:00.000Z",
    "idade": 34,
    "escolaridade": "ensino superior",
    "etnia": "parda"
  }
}
```

### **2. READ - Buscar Vítima por ID**
```bash
curl http://localhost:4000/api/vitimas/68a90a4e17dec6a589748a60
```

**Resposta Esperada (200):**
```json
{
  "message": "Vítima encontrada",
  "vitima": {
    "_id": "68a90a4e17dec6a589748a60",
    "endereco": "Rua das Flores, 123 - Centro, Maceió/AL",
    "data_nascimento": "1990-05-20T00:00:00.000Z",
    "idade": 34,
    "escolaridade": "ensino superior",
    "etnia": "parda"
  }
}
```

### **3. READ - Listar Todas as Vítimas**
```bash
curl http://localhost:4000/api/vitimas
```

**Resposta Esperada (200):**
```json
{
  "message": "Vítimas listadas com sucesso",
  "vitimas": [
    {
      "_id": "68a90a4e17dec6a589748a60",
      "endereco": "Rua das Flores, 123 - Centro, Maceió/AL",
      "data_nascimento": "1990-05-20T00:00:00.000Z",
      "idade": 34,
      "escolaridade": "ensino superior",
      "etnia": "parda"
    }
  ],
  "total": 1
}
```

### **4. UPDATE - Atualizar Vítima**
```bash
curl -X PUT http://localhost:4000/api/vitimas/68a90a4e17dec6a589748a60 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Maria Aparecida",
    "endereco": "Rua das Palmeiras, 456 - Bairro Novo, Maceió/AL",
    "idade": 35
  }'
```

**Resposta Esperada (200):**
```json
{
  "message": "Vítima atualizada com sucesso",
  "vitima": {
    "_id": "68a90a4e17dec6a589748a60",
    "endereco": "Rua das Palmeiras, 456 - Bairro Novo, Maceió/AL",
    "data_nascimento": "1990-05-20T00:00:00.000Z",
    "idade": 35,
    "escolaridade": "ensino superior",
    "etnia": "parda"
  }
}
```

### **5. DELETE - Deletar Vítima**
```bash
curl -X DELETE http://localhost:4000/api/vitimas/68a90a4e17dec6a589748a60
```

**Resposta Esperada (200):**
```json
{
  "message": "Vítima deletada com sucesso"
}
```

---

## 🧪 **TESTES CRUD - PROFISSIONAL**

### **1. CREATE - Criar Profissional**
```bash
curl -X POST http://localhost:4000/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "98765432109",
    "telefone": "82988888888",
    "senha": "senha123",
    "login": "joao.santos",
    "email": "joao@email.com",
    "nome": "João",
    "sobrenome": "Santos",
    "numero_registro": "CRM-AL-12345",
    "cargo": "médico",
    "especialidade": "ginecologia e obstetrícia"
  }'
```

**Resposta Esperada (201):**
```json
{
  "message": "Profissional criado com sucesso",
  "profissional": {
    "_id": "68a91a295a48ea97dee1fc12",
    "numero_registro": "CRM-AL-12345",
    "cargo": "médico",
    "especialidade": "ginecologia e obstetrícia"
  }
}
```

### **2. READ - Buscar Profissional por ID**
```bash
curl http://localhost:4000/api/profissionais/68a91a295a48ea97dee1fc12
```

**Resposta Esperada (200):**
```json
{
  "message": "Profissional encontrado",
  "profissional": {
    "_id": "68a91a295a48ea97dee1fc12",
    "numero_registro": "CRM-AL-12345",
    "cargo": "médico",
    "especialidade": "ginecologia e obstetrícia"
  }
}
```

### **3. READ - Listar Todos os Profissionais**
```bash
curl http://localhost:4000/api/profissionais
```

**Resposta Esperada (200):**
```json
{
  "message": "Profissionais listados com sucesso",
  "profissionais": [
    {
      "_id": "68a91a295a48ea97dee1fc12",
      "numero_registro": "CRM-AL-12345",
      "cargo": "médico",
      "especialidade": "ginecologia e obstetrícia"
    }
  ],
  "total": 1
}
```

### **4. UPDATE - Atualizar Profissional**
```bash
curl -X PUT http://localhost:4000/api/profissionais/68a91a295a48ea97dee1fc12 \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Carlos",
    "especialidade": "ginecologia, obstetrícia e oncologia"
  }'
```

**Resposta Esperada (200):**
```json
{
  "message": "Profissional atualizado com sucesso",
  "profissional": {
    "_id": "68a91a295a48ea97dee1fc12",
    "numero_registro": "CRM-AL-12345",
    "cargo": "médico",
    "especialidade": "ginecologia, obstetrícia e oncologia"
  }
}
```

### **5. DELETE - Deletar Profissional**
```bash
curl -X DELETE http://localhost:4000/api/profissionais/68a91a295a48ea97dee1fc12
```

**Resposta Esperada (200):**
```json
{
  "message": "Profissional deletado com sucesso"
}
```

---

## 🧪 **TESTES CRUD - AGENDAMENTO**

### **1. CREATE - Criar Agendamento**
```bash
curl -X POST http://localhost:4000/agendamento \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2024-02-15",
    "hora": "14:00",
    "profissional_id": "68a91a295a48ea97dee1fc12",
    "paciente_id": "68a90a4e17dec6a589748a60",
    "status": "confirmado"
  }'
```

**Resposta Esperada (201):**
```json
{
  "message": "Agendamento criado com sucesso",
  "agendamento": {
    "_id": "68a92b3c7b9d8e4f5a6b7c8d",
    "data": "2024-02-15T00:00:00.000Z",
    "hora": "14:00",
    "profissional_id": "68a91a295a48ea97dee1fc12",
    "paciente_id": "68a90a4e17dec6a589748a60",
    "status": "confirmado"
  }
}
```

### **2. READ - Buscar Agendamento por ID**
```bash
curl http://localhost:4000/agendamento/68a92b3c7b9d8e4f5a6b7c8d
```

**Resposta Esperada (200):**
```json
{
  "message": "Agendamento encontrado",
  "agendamento": {
    "_id": "68a92b3c7b9d8e4f5a6b7c8d",
    "data": "2024-02-15T00:00:00.000Z",
    "hora": "14:00",
    "profissional_id": "68a91a295a48ea97dee1fc12",
    "paciente_id": "68a90a4e17dec6a589748a60",
    "status": "confirmado"
  }
}
```

### **3. READ - Listar Todos os Agendamentos**
```bash
curl http://localhost:4000/agendamento
```

**Resposta Esperada (200):**
```json
{
  "message": "Agendamentos listados com sucesso",
  "agendamentos": [
    {
      "_id": "68a92b3c7b9d8e4f5a6b7c8d",
      "data": "2024-02-15T00:00:00.000Z",
      "hora": "14:00",
      "profissional_id": "68a91a295a48ea97dee1fc12",
      "paciente_id": "68a90a4e17dec6a589748a60",
      "status": "confirmado"
    }
  ],
  "total": 1
}
```

### **4. UPDATE - Atualizar Agendamento**
```bash
curl -X PUT http://localhost:4000/agendamento/68a92b3c7b9d8e4f5a6b7c8d \
  -H "Content-Type: application/json" \
  -d '{
    "hora": "15:00",
    "status": "remarcado"
  }'
```

**Resposta Esperada (200):**
```json
{
  "message": "Agendamento atualizado com sucesso",
  "agendamento": {
    "_id": "68a92b3c7b9d8e4f5a6b7c8d",
    "data": "2024-02-15T00:00:00.000Z",
    "hora": "15:00",
    "profissional_id": "68a91a295a48ea97dee1fc12",
    "paciente_id": "68a90a4e17dec6a589748a60",
    "status": "remarcado"
  }
}
```

### **5. DELETE - Deletar Agendamento**
```bash
curl -X DELETE http://localhost:4000/agendamento/68a92b3c7b9d8e4f5a6b7c8d
```

**Resposta Esperada (200):**
```json
{
  "message": "Agendamento deletado com sucesso"
}
```

---

## ⚠️ **TESTES DE VALIDAÇÃO**

### **Vítima - Campos Obrigatórios**
```bash
curl -X POST http://localhost:4000/api/vitimas \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "senha": "123"
  }'
```

**Resposta Esperada (400):**
```json
{
  "message": "Campos obrigatórios: cpf, senha, login, nome, sobrenome, endereco, data_nascimento, idade, escolaridade, etnia"
}
```

### **Profissional - Campos Obrigatórios**
```bash
curl -X POST http://localhost:4000/api/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "98765432109",
    "senha": "123"
  }'
```

**Resposta Esperada (400):**
```json
{
  "message": "Campos obrigatórios: cpf, senha, login, nome, sobrenome, numero_registro, cargo, especialidade"
}
```

### **Agendamento - Campos Obrigatórios**
```bash
curl -X POST http://localhost:4000/agendamento \
  -H "Content-Type: application/json" \
  -d '{
    "data": "2024-02-15"
  }'
```

**Resposta Esperada (400):**
```json
{
  "message": "Campos obrigatórios: data, hora, profissional_id, paciente_id"
}
```

### **Senha Muito Curta**
```bash
curl -X POST http://localhost:4000/api/vitimas \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "telefone": "82999999999",
    "senha": "123",
    "login": "maria.silva",
    "email": "maria@email.com",
    "nome": "Maria",
    "sobrenome": "Silva",
    "endereco": "Rua das Flores, 123",
    "data_nascimento": "1990-05-20",
    "idade": 34,
    "escolaridade": "ensino superior",
    "etnia": "parda"
  }'
```

**Resposta Esperada (400):**
```json
{
  "message": "Senha deve ter pelo menos 8 caracteres"
}
```

---

## 🔄 **Fluxo de Testes Recomendado**

1. **Teste CREATE** de cada entidade
2. **Teste READ** (GET por ID e GET all)
3. **Teste UPDATE** de cada entidade
4. **Teste DELETE** de cada entidade
5. **Teste validações** (campos obrigatórios, formatos)
6. **Teste cenários de erro** (IDs inexistentes)

---

## 📝 **NOTAS IMPORTANTES**

- **Porta**: A API roda na porta **4000**
- **Formato de Data**: Use formato ISO (`YYYY-MM-DD`)
- **Formato de Hora**: Use formato `HH:MM` (24h)
- **IDs**: São ObjectIds do MongoDB (24 caracteres hexadecimais)
- **Status de Agendamento**: Sugestões: "confirmado", "pendente", "cancelado", "remarcado"
- **CPF**: Deve ser único no sistema
- **Login**: Deve ser único no sistema
- **Email**: Deve ser único no sistema (se fornecido)
