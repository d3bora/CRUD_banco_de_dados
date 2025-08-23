// Schema MongoDB para Plataforma de Apoio
// Baseado no script MySQL original

// use plataformaapoio

// ========================================
// 1. COLEÇÃO USUARIOS (Tabela principal com herança)
// ========================================
db.createCollection("usuarios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["cpf", "senha", "login", "tipo_usuario", "nome", "sobrenome"],
      properties: {
        cpf: {
          bsonType: "string",
          pattern: "^[0-9]{11}$",
          description: "CPF deve ter exatamente 11 dígitos numéricos"
        },
        telefone: {
          bsonType: "string",
          pattern: "^\\+55[0-9]{10,11}$",
          description: "Telefone deve ter formato +55XXXXXXXXXXX"
        },
        senha: {
          bsonType: "string",
          minLength: 8,
          description: "Senha deve ter pelo menos 8 caracteres"
        },
        login: {
          bsonType: "string",
          minLength: 3,
          description: "Login deve ter pelo menos 3 caracteres"
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email deve ter formato válido"
        },
        tipo_usuario: {
          enum: ["vítima", "profissional"],
          description: "Tipo deve ser vítima ou profissional"
        },
        nome: {
          bsonType: "string",
          minLength: 2
        },
        sobrenome: {
          bsonType: "string", 
          minLength: 2
        },
        data_cadastro: {
          bsonType: "date"
        }
      }
    }
  }
})

// ========================================
// 2. COLEÇÃO PROFISSIONAIS_SAUDE
// ========================================
db.createCollection("profissionais_saude", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuario_id"],
      properties: {
        usuario_id: {
          bsonType: "objectId",
          description: "Referência ao usuário"
        },
        numero_registro: {
          bsonType: "string"
        },
        cargo: {
          bsonType: "string"
        },
        especialidade: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 3. COLEÇÃO VITIMAS
// ========================================
db.createCollection("vitimas", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["usuario_id"],
      properties: {
        usuario_id: {
          bsonType: "objectId",
          description: "Referência ao usuário"
        },
        endereco: {
          bsonType: "string"
        },
        data_nascimento: {
          bsonType: "date"
        },
        idade: {
          bsonType: "int"
        },
        escolaridade: {
          bsonType: "string"
        },
        etnia: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 4. COLEÇÃO AGENDAMENTOS
// ========================================
db.createCollection("agendamentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["data", "hora", "profissional_id", "paciente_id"],
      properties: {
        data: {
          bsonType: "date"
        },
        hora: {
          bsonType: "string",
          pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        profissional_id: {
          bsonType: "objectId"
        },
        paciente_id: {
          bsonType: "objectId"
        },
        status: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 5. COLEÇÃO ATENDIMENTOS
// ========================================
db.createCollection("atendimentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["data", "hora", "profissional_id", "vitima_id"],
      properties: {
        data: {
          bsonType: "date"
        },
        hora: {
          bsonType: "string",
          pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        profissional_id: {
          bsonType: "objectId"
        },
        vitima_id: {
          bsonType: "objectId"
        },
        tipo_atendimento: {
          bsonType: "string"
        },
        observacoes: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 6. COLEÇÃO AVALIACOES_ATENDIMENTO
// ========================================
db.createCollection("avaliacoes_atendimento", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["atendimento_id", "profissional_avaliado_id"],
      properties: {
        atendimento_id: {
          bsonType: "objectId"
        },
        profissional_avaliado_id: {
          bsonType: "objectId"
        },
        nota: {
          bsonType: "int",
          minimum: 1,
          maximum: 5
        },
        comentario: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 7. COLEÇÃO DENUNCIAS
// ========================================
db.createCollection("denuncias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vitima_id", "descricao", "data"],
      properties: {
        vitima_id: {
          bsonType: "objectId"
        },
        descricao: {
          bsonType: "string"
        },
        data: {
          bsonType: "date"
        },
        hora: {
          bsonType: "string",
          pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        }
      }
    }
  }
})

// ========================================
// 8. COLEÇÃO DOCUMENTOS
// ========================================
db.createCollection("documentos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["tipo", "caminho"],
      properties: {
        tipo: {
          bsonType: "string"
        },
        caminho: {
          bsonType: "string"
        },
        data: {
          bsonType: "date"
        },
        descricao: {
          bsonType: "string"
        },
        conteudo: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 9. COLEÇÃO HISTORICOS_MEDICOS
// ========================================
db.createCollection("historicos_medicos", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vitima_id"],
      properties: {
        vitima_id: {
          bsonType: "objectId"
        },
        medico_responsavel: {
          bsonType: "string"
        },
        data: {
          bsonType: "date"
        },
        tratamento: {
          bsonType: "string"
        },
        diagnostico: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 10. COLEÇÃO DOCUMENTOS_HISTORICO
// ========================================
db.createCollection("documentos_historico", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["documento_id", "historico_id"],
      properties: {
        documento_id: {
          bsonType: "objectId"
        },
        historico_id: {
          bsonType: "objectId"
        }
      }
    }
  }
})

// ========================================
// 11. COLEÇÃO REDES_APOIO
// ========================================
db.createCollection("redes_apoio", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome"],
      properties: {
        nome: {
          bsonType: "string"
        },
        endereco: {
          bsonType: "string"
        },
        telefone: {
          bsonType: "string"
        },
        tipo_servico: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 12. COLEÇÃO GRUPOS_APOIO
// ========================================
db.createCollection("grupos_apoio", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome"],
      properties: {
        nome: {
          bsonType: "string"
        },
        descricao: {
          bsonType: "string"
        },
        local_encontro: {
          bsonType: "string"
        },
        data_hora_encontros: {
          bsonType: "date"
        },
        coordenador_id: {
          bsonType: "objectId"
        },
        rede_apoio_id: {
          bsonType: "objectId"
        }
      }
    }
  }
})

// ========================================
// 13. COLEÇÃO MENSAGENS
// ========================================
db.createCollection("mensagens", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["remetente_id", "destinatario_id", "conteudo"],
      properties: {
        remetente_id: {
          bsonType: "objectId"
        },
        destinatario_id: {
          bsonType: "objectId"
        },
        data: {
          bsonType: "date"
        },
        hora: {
          bsonType: "string",
          pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        conteudo: {
          bsonType: "string"
        },
        status_mensagem: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 14. COLEÇÃO NOTIFICACOES
// ========================================
db.createCollection("notificacoes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vitima_id", "tipo"],
      properties: {
        vitima_id: {
          bsonType: "objectId"
        },
        data: {
          bsonType: "date"
        },
        hora: {
          bsonType: "string",
          pattern: "^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
        },
        tipo: {
          bsonType: "string"
        },
        status: {
          bsonType: "string"
        },
        comentario: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 15. COLEÇÃO OCORRENCIAS
// ========================================
db.createCollection("ocorrencias", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["historico_id"],
      properties: {
        historico_id: {
          bsonType: "objectId"
        }
      }
    }
  }
})

// ========================================
// 16. COLEÇÃO PARTICIPACOES_GRUPO
// ========================================
db.createCollection("participacoes_grupo", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["vitima_id", "grupo_id"],
      properties: {
        vitima_id: {
          bsonType: "objectId"
        },
        grupo_id: {
          bsonType: "objectId"
        }
      }
    }
  }
})

// ========================================
// 17. COLEÇÃO RELATORIOS
// ========================================
db.createCollection("relatorios", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["tipo", "titulo"],
      properties: {
        notificacao_id: {
          bsonType: "objectId"
        },
        data: {
          bsonType: "date"
        },
        tipo: {
          bsonType: "string"
        },
        titulo: {
          bsonType: "string"
        },
        descricao: {
          bsonType: "string"
        },
        conteudo: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// 18. COLEÇÃO UNIDADES_SAUDE
// ========================================
db.createCollection("unidades_saude", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nome"],
      properties: {
        nome: {
          bsonType: "string"
        },
        endereco: {
          bsonType: "string"
        },
        telefone: {
          bsonType: "string"
        },
        email: {
          bsonType: "string"
        },
        tipo_unidade: {
          bsonType: "string"
        }
      }
    }
  }
})

// ========================================
// CRIAÇÃO DE ÍNDICES
// ========================================

// Índices únicos para simular PKs
db.usuarios.createIndex({"cpf": 1}, {unique: true, name: "idx_usuarios_cpf_unique"})
db.usuarios.createIndex({"email": 1}, {unique: true, name: "idx_usuarios_email_unique"})
db.usuarios.createIndex({"login": 1}, {unique: true, name: "idx_usuarios_login_unique"})

// Índices para relacionamentos (FKs)
db.profissionais_saude.createIndex({"usuario_id": 1}, {unique: true, name: "idx_profissionais_usuario_unique"})
db.vitimas.createIndex({"usuario_id": 1}, {unique: true, name: "idx_vitimas_usuario_unique"})

// Índices para otimizar consultas frequentes
db.usuarios.createIndex({"tipo_usuario": 1}, {name: "idx_usuarios_tipo"})
db.agendamentos.createIndex({"profissional_id": 1, "data": 1}, {name: "idx_agendamentos_profissional_data"})
db.agendamentos.createIndex({"paciente_id": 1, "data": 1}, {name: "idx_agendamentos_paciente_data"})
db.atendimentos.createIndex({"profissional_id": 1, "data": 1}, {name: "idx_atendimentos_profissional_data"})
db.atendimentos.createIndex({"vitima_id": 1, "data": 1}, {name: "idx_atendimentos_vitima_data"})
db.denuncias.createIndex({"vitima_id": 1, "data": 1}, {name: "idx_denuncias_vitima_data"})
db.historicos_medicos.createIndex({"vitima_id": 1, "data": 1}, {name: "idx_historicos_vitima_data"})
db.mensagens.createIndex({"remetente_id": 1, "data": 1}, {name: "idx_mensagens_remetente_data"})
db.mensagens.createIndex({"destinatario_id": 1, "data": 1}, {name: "idx_mensagens_destinatario_data"})
db.notificacoes.createIndex({"vitima_id": 1, "status": 1}, {name: "idx_notificacoes_vitima_status"})
db.grupos_apoio.createIndex({"coordenador_id": 1}, {name: "idx_grupos_coordenador"})

// Índices compostos para consultas complexas
db.agendamentos.createIndex({"status": 1, "data": 1}, {name: "idx_agendamentos_status_data"})
db.atendimentos.createIndex({"tipo_atendimento": 1, "data": 1}, {name: "idx_atendimentos_tipo_data"})
db.avaliacoes_atendimento.createIndex({"profissional_avaliado_id": 1, "nota": 1}, {name: "idx_avaliacoes_profissional_nota"})

// ========================================
// INSERÇÃO DE DADOS DE EXEMPLO
// ========================================

// Inserir usuários de exemplo
db.usuarios.insertMany([
  {
    cpf: "12345678901",
    telefone: "+5582987654321",
    senha: "$2b$12$XyZ.../hash_seguro_bcrypt",
    login: "maria.silva",
    email: "maria.silva@email.com",
    tipo_usuario: "vítima",
    nome: "Maria",
    sobrenome: "Silva",
    data_cadastro: new Date("2024-01-15")
  },
  {
    cpf: "98765432109",
    telefone: "+5582912345678",
    senha: "$2b$12$AbC.../hash_seguro_bcrypt",
    login: "dr.joao",
    email: "joao.santos@hospital.com",
    tipo_usuario: "profissional",
    nome: "João",
    sobrenome: "Santos",
    data_cadastro: new Date("2024-01-10")
  }
])

// Buscar IDs para relacionamentos
var maria = db.usuarios.findOne({cpf: "12345678901"})
var joao = db.usuarios.findOne({cpf: "98765432109"})

// Inserir dados específicos dos profissionais
db.profissionais_saude.insertOne({
  usuario_id: joao._id,
  numero_registro: "CRM-AL-12345",
  cargo: "médico",
  especialidade: "ginecologia e obstetrícia"
})

// Inserir dados específicos das vítimas
db.vitimas.insertOne({
  usuario_id: maria._id,
  endereco: "Rua das Flores, 123 - Centro, Maceió/AL",
  data_nascimento: new Date("1990-05-20"),
  idade: 34,
  escolaridade: "ensino superior",
  etnia: "parda"
})

// Inserir agendamento de exemplo
db.agendamentos.insertOne({
  data: new Date("2024-02-15"),
  hora: "14:00",
  profissional_id: joao._id,
  paciente_id: maria._id,
  status: "confirmado"
})

// Inserir atendimento de exemplo
db.atendimentos.insertOne({
  data: new Date("2024-02-15"),
  hora: "14:15",
  profissional_id: joao._id,
  vitima_id: maria._id,
  tipo_atendimento: "consulta psicológica",
  observacoes: "Primeira consulta. Paciente relata episódios de ansiedade."
})

// Inserir denúncia de exemplo
db.denuncias.insertOne({
  vitima_id: maria._id,
  descricao: "Agressão física por parte do companheiro após discussão sobre questões financeiras.",
  data: new Date("2024-02-10"),
  hora: "20:30"
})

// Inserir histórico médico de exemplo
db.historicos_medicos.insertOne({
  vitima_id: maria._id,
  medico_responsavel: "Dr. João Santos",
  data: new Date("2024-02-15"),
  tratamento: "Terapia cognitivo-comportamental semanal",
  diagnostico: "Transtorno de ansiedade generalizada"
})

// Inserir unidade de saúde de exemplo
db.unidades_saude.insertOne({
  nome: "Hospital Municipal de Maceió",
  endereco: "Av. Salgado Filho, 1000 - Trapiche da Barra, Maceió/AL",
  telefone: "+5582999888777",
  email: "contato@hmm.al.gov.br",
  tipo_unidade: "hospital"
})

// Inserir rede de apoio de exemplo
db.redes_apoio.insertOne({
  nome: "ONG Mulher Forte",
  endereco: "Rua dos Direitos, 789 - Centro, Maceió/AL",
  telefone: "+5582987654321",
  tipo_servico: "apoio psicossocial e jurídico"
})

// Inserir grupo de apoio de exemplo
db.grupos_apoio.insertOne({
  nome: "Grupo Renasce - Apoio à Mulher",
  descricao: "Grupo de apoio psicológico para mulheres vítimas de violência doméstica",
  local_encontro: "Centro Comunitário da Paz - Rua da Paz, 456, Sala 3",
  data_hora_encontros: new Date("2024-02-20T19:00:00Z"),
  coordenador_id: joao._id,
  rede_apoio_id: db.redes_apoio.findOne({})._id
})

// Inserir mensagem de exemplo
db.mensagens.insertOne({
  remetente_id: maria._id,
  destinatario_id: joao._id,
  data: new Date("2024-02-14"),
  hora: "09:30",
  conteudo: "Olá Dr. João, gostaria de remarcar minha consulta de amanhã. Poderia ser na sexta-feira no mesmo horário?",
  status_mensagem: "enviada"
})

// Inserir notificação de exemplo
db.notificacoes.insertOne({
  vitima_id: maria._id,
  data: new Date("2024-02-14"),
  hora: "18:00",
  tipo: "lembrete_consulta",
  status: "pendente",
  comentario: "Lembrete: Você tem consulta agendada amanhã às 14:00 com Dr. João Santos"
})

// Inserir avaliação de atendimento de exemplo
db.avaliacoes_atendimento.insertOne({
  atendimento_id: db.atendimentos.findOne({})._id,
  profissional_avaliado_id: joao._id,
  nota: 5,
  comentario: "Atendimento excelente. Dr. João foi muito atencioso e profissional."
})

// Inserir documento de exemplo
db.documentos.insertOne({
  tipo: "laudo médico",
  caminho: "/uploads/laudos/laudo_maria_silva.pdf",
  data: new Date("2024-02-15"),
  descricao: "Laudo psicológico inicial - Avaliação de ansiedade",
  conteudo: "Paciente apresenta sintomas de ansiedade moderada..."
})

// Inserir relatório de exemplo
db.relatorios.insertOne({
  notificacao_id: db.notificacoes.findOne({})._id,
  data: new Date("2024-02-14"),
  tipo: "relatório de atendimento",
  titulo: "Relatório de Consulta - Maria Silva",
  descricao: "Relatório detalhado da consulta realizada em 15/02/2024",
  conteudo: "Paciente compareceu à consulta agendada..."
})

console.log("Schema MongoDB criado com sucesso!")
console.log("Coleções criadas:", db.getCollectionNames())
console.log("Índices criados e dados de exemplo inseridos")
