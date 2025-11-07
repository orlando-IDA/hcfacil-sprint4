export interface IPaciente {
  codigoPaciente: number;
  nomePaciente: string;
  cpfPaciente: string;
  dataDeNascimentoPaciente: string;
  telefoneContato: string;
  email: string;
  dataCadastro: string; 
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
  codigoPaciente: number;
  nomePaciente: string;
  cpfPaciente: string; 
  dataDeNascimentoPaciente: string;
  telefoneContato: string;
  email: string;
  dataCadastro: string; 
}