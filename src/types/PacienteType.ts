export interface IPaciente {
  id_paciente: number;
  nome: string;
  email: string;
  cpf: string;
  dt_nascimento: string; // Formato "YYYY-MM-DD"
}

export interface ICadastroRequest {
  nomePaciente: string;
  cpfPaciente: string;
  dataDeNascimentoPaciente: string; // Formato "YYYY-MM-DD"
  telefoneContato: string;
  email: string;
  senha: string;
}

export interface ILoginRequest {
  cpf: string; 
  senha: string;
}

export interface IAtualizarRequest {
  nome: string;
  email: string;
  dt_nascimento: string; // Formato "YYYY-MM-DD"
}