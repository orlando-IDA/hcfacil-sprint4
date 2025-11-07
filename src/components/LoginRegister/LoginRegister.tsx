import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { cadastrarPaciente } from '../../services/api';
import type { ILoginRequest, ICadastroRequest } from '../../types/PacienteType.ts';
import { maskCPF, maskTelefone } from '../../utils/mask.ts';

const LoginRegister: React.FC = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'cadastro'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/home';

  const [loginCpf, setLoginCpf] = useState('');
  const [loginSenha, setLoginSenha] = useState('');

  const [cadNome, setCadNome] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadCpf, setCadCpf] = useState('');
  const [cadDtNasc, setCadDtNasc] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadSenha, setCadSenha] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data: ILoginRequest = {
      cpf: loginCpf.replace(/\D/g, ''), 
      senha: loginSenha,
    };

    try {
      await login(data);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const data: ICadastroRequest = {
      nomePaciente: cadNome,
      cpfPaciente: cadCpf.replace(/\D/g, ''), // Remove não-dígitos
      dataDeNascimentoPaciente: cadDtNasc,
      telefoneContato: cadTelefone.replace(/\D/g, ''), // Remove não-dígitos
      email: cadEmail,
      senha: cadSenha,
    };

    try {
      await cadastrarPaciente(data);
      alert('Cadastro realizado com sucesso! Faça o login para continuar.');
      setActiveForm('login');
      setCadNome('');
      setCadEmail('');
      setCadCpf('');
      setCadDtNasc('');
      setCadTelefone('');
      setCadSenha('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const switchForm = (form: 'login' | 'cadastro') => {
    setError(null);
    setActiveForm(form);
  };

  return (
    <main className="flex-1 bg-gray-100 flex justify-center items-center p-4 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-around mb-6">
          <button
            className={`px-4 py-2 font-medium ${activeForm === 'login' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            onClick={() => switchForm('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeForm === 'cadastro' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500'}`}
            onClick={() => switchForm('cadastro')}
          >
            Cadastro
          </button>
        </div>

        {error && (
            <div className="p-3 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-md">
              {error}
            </div>
          )}

        {activeForm === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label htmlFor="loginCpf" className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text" 
                id="loginCpf"
                placeholder="123.456.789-00"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={loginCpf}
                onChange={(e) => setLoginCpf(maskCPF(e.target.value))}
                maxLength={14}
                required
              />
            </div>
            <div>
              <label htmlFor="loginSenha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="loginSenha"
                placeholder="••••••••"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={loginSenha}
                onChange={(e) => setLoginSenha(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        )}

        {activeForm === 'cadastro' && (
          <form onSubmit={handleCadastroSubmit} className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo
              </label>
              <input
                type="text"
                id="nome"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadNome}
                onChange={(e) => setCadNome(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadEmail}
                onChange={(e) => setCadEmail(e.target.value)}
                required
              />
            </div>
           <div>
              <label htmlFor="cadCPF" className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                type="text"
                id="cadCPF"
                placeholder="123.456.789-00"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadCpf}
                onChange={(e) => setCadCpf(maskCPF(e.target.value))}
                maxLength={14}
                required
              />
            </div>

            <div>
              <label htmlFor="cadTelefone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone (com DDD)
              </label>
              <input
                type="tel" 
                id="cadTelefone"
                placeholder="(11) 98888-7777"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadTelefone}
                onChange={(e) => setCadTelefone(maskTelefone(e.target.value))}
                maxLength={15} 
                required
              />
            </div>
            
            <div>
              <label htmlFor="dtNasc" className="block text-sm font-medium text-gray-700 mb-1">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dtNasc"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadDtNasc}
                onChange={(e) => setCadDtNasc(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cadSenha" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                id="cadSenha"
                placeholder="Mínimo 6 caracteres"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={cadSenha}
                onChange={(e) => setCadSenha(e.target.value)}
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Cadastrando...' : 'Cadastrar'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default LoginRegister;