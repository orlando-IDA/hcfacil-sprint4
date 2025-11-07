export interface IPaciente {
  id_paciente: number;
  nomePaciente: string;
  cpfPaciente: string;
  dataDeNascimentoPaciente: string;
  telefoneContato: string;
  email: string;
}

export interface ICadastroRequest {
  nomePaciente: string;
  cpfPaciente: string;
  dataDeNascimentoPaciente: string;
  telefoneContato: string;
  email: string;
  senha: string;
}

export interface ILoginRequest {
  cpf: string;
  senha: string;
}

export interface IAtualizarRequest {
  nomePaciente: string;
  dataDeNascimentoPaciente: string;
  telefoneContato: string;
  email: string;
}