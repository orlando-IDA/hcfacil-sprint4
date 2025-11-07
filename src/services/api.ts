import type { 
  IPaciente, 
  ICadastroRequest, 
  ILoginRequest, 
  IAtualizarRequest 
} from '../types/PacienteType.ts';

const API_URL = "http://localhost:8080/hcFacilSprint4"; 

async function handleJsonResponse(response: Response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `Erro ${response.status}`);
  }
  
  return response.json();
}

async function handleEmptyResponse(response: Response) {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: response.statusText };
    }
    throw new Error(errorData.message || `Erro ${response.status}`);
  }
  
  return; 
}


export async function cadastrarPaciente(data: ICadastroRequest): Promise<IPaciente> {
  const response = await fetch(`${API_URL}/cadastro`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function login(data: ILoginRequest): Promise<IPaciente> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function getPacienteById(id: number): Promise<IPaciente> {
  const response = await fetch(`${API_URL}/paciente/${id}`, {
    method: 'GET',
  });
  return handleJsonResponse(response);
}

export async function atualizarPaciente(id: number, data: IAtualizarRequest): Promise<IPaciente> {
  const response = await fetch(`${API_URL}/atualizar/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return handleJsonResponse(response);
}

export async function excluirPaciente(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/excluir/${id}`, {
    method: 'DELETE',
  });
  return handleEmptyResponse(response); 
}