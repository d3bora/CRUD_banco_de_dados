const axios = require('axios');

// Configuração da API
const BASE_URL = 'http://localhost:3000';

// Função para fazer requisições HTTP
async function makeRequest(method, url, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

// Função para aguardar um tempo
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função para imprimir resultados
function printResult(operation, result) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🔍 ${operation}`);
  console.log(`${'='.repeat(60)}`);
  
  if (result.success) {
    console.log(`✅ Status: ${result.status}`);
    console.log(`📊 Resposta:`, JSON.stringify(result.data, null, 2));
  } else {
    console.log(`❌ Status: ${result.status}`);
    console.log(`🚨 Erro:`, JSON.stringify(result.error, null, 2));
  }
}

// Testes para Vítimas
async function testarVitimas() {
  console.log('\n🧑‍🦰 INICIANDO TESTES PARA VÍTIMAS');
  console.log('='.repeat(60));
  
  // 1. Criar Vítima
  const vitimaData = {
    cpf: "12345678901",
    telefone: "11999999999",
    senha: "senha123",
    login: "maria.silva",
    email: "maria@email.com",
    nome: "Maria",
    sobrenome: "Silva",
    data_cadastro: "2024-01-01",
    endereco: "Rua das Flores, 123",
    data_nascimento: "1990-05-15",
    idade: 33,
    escolaridade: "Ensino Superior",
    etnia: "Branca"
  };
  
  let result = await makeRequest('POST', '/vitima', vitimaData);
  printResult('1. Criar Vítima', result);
  
  if (!result.success) {
    console.log('❌ Falha ao criar vítima. Continuando com outros testes...');
    return;
  }
  
  await delay(1000);
  
  // 2. Listar Todas as Vítimas
  result = await makeRequest('GET', '/vitima');
  printResult('2. Listar Todas as Vítimas', result);
  
  await delay(1000);
  
  // 3. Buscar Vítima por ID
  result = await makeRequest('GET', '/vitima/1');
  printResult('3. Buscar Vítima por ID 1', result);
  
  await delay(1000);
  
  // 4. Atualizar Vítima
  const updateData = {
    endereco: "Rua das Palmeiras, 456",
    escolaridade: "Pós-Graduação",
    idade: 34
  };
  
  result = await makeRequest('PUT', '/vitima/1', updateData);
  printResult('4. Atualizar Vítima', result);
  
  await delay(1000);
  
  // 5. Verificar Vítima Atualizada
  result = await makeRequest('GET', '/vitima/1');
  printResult('5. Verificar Vítima Atualizada', result);
  
  await delay(1000);
  
  // 6. Deletar Vítima
  result = await makeRequest('DELETE', '/vitima/1');
  printResult('6. Deletar Vítima', result);
  
  await delay(1000);
  
  // 7. Verificar se foi deletada
  result = await makeRequest('GET', '/vitima/1');
  printResult('7. Verificar se Vítima foi Deletada', result);
}

// Testes para Profissionais
async function testarProfissionais() {
  console.log('\n👨‍⚕️ INICIANDO TESTES PARA PROFISSIONAIS');
  console.log('='.repeat(60));
  
  // 1. Criar Profissional
  const profissionalData = {
    cpf: "98765432100",
    telefone: "11888888888",
    senha: "senha456",
    login: "dr.joao",
    email: "joao@clinica.com",
    nome: "João",
    sobrenome: "Santos",
    data_cadastro: "2024-01-01",
    numero_registro: "CRM12345",
    cargo: "Médico",
    especialidade: "Psicologia"
  };
  
  let result = await makeRequest('POST', '/profissional', profissionalData);
  printResult('1. Criar Profissional', result);
  
  if (!result.success) {
    console.log('❌ Falha ao criar profissional. Continuando com outros testes...');
    return;
  }
  
  await delay(1000);
  
  // 2. Listar Todos os Profissionais
  result = await makeRequest('GET', '/profissional');
  printResult('2. Listar Todos os Profissionais', result);
  
  await delay(1000);
  
  // 3. Buscar Profissional por ID
  result = await makeRequest('GET', '/profissional/1');
  printResult('3. Buscar Profissional por ID 1', result);
  
  await delay(1000);
  
  // 4. Atualizar Profissional
  const updateData = {
    especialidade: "Psicologia Clínica",
    cargo: "Psicólogo Clínico"
  };
  
  result = await makeRequest('PUT', '/profissional/1', updateData);
  printResult('4. Atualizar Profissional', result);
  
  await delay(1000);
  
  // 5. Verificar Profissional Atualizado
  result = await makeRequest('GET', '/profissional/1');
  printResult('5. Verificar Profissional Atualizado', result);
  
  await delay(1000);
  
  // 6. Deletar Profissional
  result = await makeRequest('DELETE', '/profissional/1');
  printResult('6. Deletar Profissional', result);
  
  await delay(1000);
  
  // 7. Verificar se foi deletado
  result = await makeRequest('GET', '/profissional/1');
  printResult('7. Verificar se Profissional foi Deletado', result);
}

// Testes para Agendamentos
async function testarAgendamentos() {
  console.log('\n📅 INICIANDO TESTES PARA AGENDAMENTOS');
  console.log('='.repeat(60));
  
  // Primeiro, criar uma vítima e um profissional para o agendamento
  const vitimaData = {
    cpf: "11122233344",
    telefone: "11777777777",
    senha: "senha789",
    login: "ana.santos",
    email: "ana@email.com",
    nome: "Ana",
    sobrenome: "Santos",
    data_cadastro: "2024-01-01",
    endereco: "Rua dos Ipês, 789",
    data_nascimento: "1985-08-20",
    idade: 38,
    escolaridade: "Ensino Médio",
    etnia: "Parda"
  };
  
  const profissionalData = {
    cpf: "55566677788",
    telefone: "11666666666",
    senha: "senha999",
    login: "dr.maria",
    email: "maria@clinica.com",
    nome: "Maria",
    sobrenome: "Oliveira",
    data_cadastro: "2024-01-01",
    numero_registro: "CRM67890",
    cargo: "Psicóloga",
    especialidade: "Terapia Cognitivo-Comportamental"
  };
  
  // Criar vítima
  let result = await makeRequest('POST', '/vitima', vitimaData);
  printResult('0.1. Criar Vítima para Agendamento', result);
  
  if (!result.success) {
    console.log('❌ Falha ao criar vítima para agendamento. Continuando...');
    return;
  }
  
  await delay(1000);
  
  // Criar profissional
  result = await makeRequest('POST', '/profissional', profissionalData);
  printResult('0.2. Criar Profissional para Agendamento', result);
  
  if (!result.success) {
    console.log('❌ Falha ao criar profissional para agendamento. Continuando...');
    return;
  }
  
  await delay(1000);
  
  // 1. Criar Agendamento
  const agendamentoData = {
    data: "2024-01-15",
    hora: "14:00",
    profissional_id: 1,
    paciente_id: 1,
    status: "Agendado"
  };
  
  result = await makeRequest('POST', '/agendamento', agendamentoData);
  printResult('1. Criar Agendamento', result);
  
  if (!result.success) {
    console.log('❌ Falha ao criar agendamento. Continuando com outros testes...');
    return;
  }
  
  await delay(1000);
  
  // 2. Listar Todos os Agendamentos
  result = await makeRequest('GET', '/agendamento');
  printResult('2. Listar Todos os Agendamentos', result);
  
  await delay(1000);
  
  // 3. Buscar Agendamento por ID
  result = await makeRequest('GET', '/agendamento/1');
  printResult('3. Buscar Agendamento por ID 1', result);
  
  await delay(1000);
  
  // 4. Atualizar Agendamento
  const updateData = {
    data: "2024-01-16",
    hora: "15:00",
    status: "Confirmado"
  };
  
  result = await makeRequest('PUT', '/agendamento/1', updateData);
  printResult('4. Atualizar Agendamento', result);
  
  await delay(1000);
  
  // 5. Verificar Agendamento Atualizado
  result = await makeRequest('GET', '/agendamento/1');
  printResult('5. Verificar Agendamento Atualizado', result);
  
  await delay(1000);
  
  // 6. Deletar Agendamento
  result = await makeRequest('DELETE', '/agendamento/1');
  printResult('6. Deletar Agendamento', result);
  
  await delay(1000);
  
  // 7. Verificar se foi deletado
  result = await makeRequest('GET', '/agendamento/1');
  printResult('7. Verificar se Agendamento foi Deletado', result);
  
  // Limpar dados de teste
  await delay(1000);
  await makeRequest('DELETE', '/vitima/1');
  await makeRequest('DELETE', '/profissional/1');
}

// Função principal
async function executarTodosOsTestes() {
  console.log('🚀 INICIANDO TESTES AUTOMATIZADOS DO CRUD');
  console.log('='.repeat(60));
  console.log(`📍 URL Base: ${BASE_URL}`);
  console.log(`⏰ Início: ${new Date().toLocaleString('pt-BR')}`);
  
  try {
    // Teste da URL base
    const baseResult = await makeRequest('GET', '/');
    printResult('🔗 Teste da URL Base', baseResult);
    
    await delay(2000);
    
    // Executar testes em sequência
    await testarVitimas();
    await delay(2000);
    
    await testarProfissionais();
    await delay(2000);
    
    await testarAgendamentos();
    
    console.log('\n🎉 TODOS OS TESTES FORAM CONCLUÍDOS!');
    console.log('='.repeat(60));
    console.log(`⏰ Fim: ${new Date().toLocaleString('pt-BR')}`);
    
  } catch (error) {
    console.error('❌ Erro durante a execução dos testes:', error);
  }
}

// Executar os testes
executarTodosOsTestes();
