# Sistema de Gerenciamento de Vítimas - MongoDB

Sistema CRUD completo para gerenciamento de vítimas, profissionais de saúde e agendamentos, utilizando MongoDB como banco de dados.

## 🚀 Tecnologias

- **Backend**: Node.js + TypeScript + Express
- **Banco de Dados**: MongoDB
- **ORM**: MongoDB Native Driver
- **Testes**: Axios para testes de API

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- MongoDB (versão 4.4 ou superior)
- npm ou yarn

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd CRUD_banco_de_dados-nosql
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o MongoDB**
   - Certifique-se de que o MongoDB está rodando localmente
   - Ou configure uma URL de conexão remota no arquivo `config.env.example`

4. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp config.env.example .env

# Edite o arquivo .env com suas configurações
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=sistema_vitimas
PORT=3000
```

## 🗄️ Estrutura do Banco de Dados

### Coleções MongoDB:

#### `usuarios`
- `_id`: ObjectId (chave primária)
- `cpf`: String (único)
- `telefone`: String
- `senha`: String
- `login`: String (único)
- `email`: String
- `tipo_usuario`: String ('vítima' | 'profissional')
- `nome`: String
- `sobrenome`: String
- `data_cadastro`: Date

#### `vitimas`
- `_id`: ObjectId (referência ao usuário)
- `endereco`: String
- `data_nascimento`: Date
- `idade`: Number
- `escolaridade`: String
- `etnia`: String
- `data_cadastro`: Date

#### `profissionais`
- `_id`: ObjectId (referência ao usuário)
- `numero_registro`: String
- `cargo`: String
- `especialidade`: String
- `data_cadastro`: Date

#### `agendamentos`
- `_id`: ObjectId (chave primária)
- `data`: Date
- `hora`: String
- `profissional_id`: ObjectId (referência ao profissional)
- `paciente_id`: ObjectId (referência à vítima)
- `status`: String
- `data_cadastro`: Date

## 🚀 Executando a Aplicação

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Vítimas
- `POST /vitimas` - Criar vítima
- `GET /vitimas/:id` - Buscar vítima por ID
- `PUT /vitimas/:id` - Atualizar vítima
- `DELETE /vitimas/:id` - Excluir vítima
- `GET /vitimas` - Listar todas as vítimas
- `GET /vitimas/escolaridade/:escolaridade` - Buscar por escolaridade
- `GET /vitimas/etnia/:etnia` - Buscar por etnia

### Profissionais
- `POST /profissionais` - Criar profissional
- `GET /profissionais/:id` - Buscar profissional por ID
- `PUT /profissionais/:id` - Atualizar profissional
- `DELETE /profissionais/:id` - Excluir profissional
- `GET /profissionais` - Listar todos os profissionais
- `GET /profissionais/especialidade/:especialidade` - Buscar por especialidade
- `GET /profissionais/cargo/:cargo` - Buscar por cargo

### Agendamentos
- `POST /agendamentos` - Criar agendamento
- `GET /agendamentos/:id` - Buscar agendamento por ID
- `PUT /agendamentos/:id` - Atualizar agendamento
- `DELETE /agendamentos/:id` - Excluir agendamento
- `GET /agendamentos` - Listar todos os agendamentos
- `GET /agendamentos/profissional/:id` - Buscar por profissional
- `GET /agendamentos/paciente/:id` - Buscar por paciente
- `GET /agendamentos/data/:data` - Buscar por data
- `GET /agendamentos/status/:status` - Buscar por status

## 🧪 Testes

### Testes automatizados
```bash
npm run test:js
```

### Testes com PowerShell
```bash
npm run test:ps
```

## 🔧 Configurações Avançadas

### Índices MongoDB
A aplicação cria automaticamente os seguintes índices:
- **usuarios**: cpf (único), login (único), email
- **vitimas**: escolaridade, etnia
- **profissionais**: especialidade, cargo
- **agendamentos**: data+hora, profissional_id, paciente_id, status

### Pool de Conexões
- **Desenvolvimento**: Máximo 10 conexões
- **Produção**: Máximo 50 conexões

## 📝 Exemplos de Uso

### Criar uma vítima
```bash
curl -X POST http://localhost:3000/vitimas \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "12345678901",
    "telefone": "11999999999",
    "senha": "senha123",
    "login": "vitima1",
    "email": "vitima@email.com",
    "nome": "Maria",
    "sobrenome": "Silva",
    "endereco": "Rua A, 123",
    "data_nascimento": "1990-01-01",
    "idade": 33,
    "escolaridade": "Superior",
    "etnia": "Branca"
  }'
```

### Criar um profissional
```bash
curl -X POST http://localhost:3000/profissionais \
  -H "Content-Type: application/json" \
  -d '{
    "cpf": "98765432109",
    "telefone": "11888888888",
    "senha": "senha456",
    "login": "prof1",
    "email": "prof@email.com",
    "nome": "João",
    "sobrenome": "Santos",
    "numero_registro": "CRM12345",
    "cargo": "Médico",
    "especialidade": "Psicologia"
  }'
```

## 🚨 Solução de Problemas

### Erro de conexão com MongoDB
1. Verifique se o MongoDB está rodando
2. Confirme a URL de conexão no arquivo `.env`
3. Verifique se a porta 27017 está disponível

### Erro de índice duplicado
1. Os índices são criados automaticamente na inicialização
2. Se houver erro, verifique se as coleções existem
3. Reinicie a aplicação para recriar os índices

## 📄 Licença

Este projeto está sob a licença ISC.

## 👥 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
