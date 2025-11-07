export interface IPaciente {
  id_paciente: number;
  nome: string;
  email: string;
  cpf: string;
  dt_nascimento: string; // Formato "YYYY-MM-DD"
}

export interface ICadastroRequest {
  nome: string;
  email: string;
  cpf: string;
  dt_nascimento: string; // Formato "YYYY-MM-DD"
  senha: string;
}

export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface IAtualizarRequest {
  nome: string;
  email: string;
  dt_nascimento: string; // Formato "YYYY-MM-DD"
}