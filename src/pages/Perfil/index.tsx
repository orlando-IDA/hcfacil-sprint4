import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { atualizarPaciente, excluirPaciente } from '../../services/api';
import type { IAtualizarRequest } from '../../types/PacienteType';
import { useNavigate } from 'react-router-dom';

const formatDateForInput = (dateStr: string | undefined): string => {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    if (isNaN(year)) return '';

    return `${year}-${month}-${day}`;
  } catch (e) {
    console.error("Falha ao formatar data:", e);
    return '';
  }
};

const PerfilPage: React.FC = () => {
  const { user, reloadUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IAtualizarRequest>({
    codigoPaciente: 0,
    nomePaciente: '',
    email: '',
    dataDeNascimentoPaciente: '',
    telefoneContato: '',
    cpfPaciente: '',
    dataCadastro: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        codigoPaciente: user.codigoPaciente, 
        nomePaciente: user.nomePaciente,
        email: user.email,
        dataDeNascimentoPaciente: formatDateForInput(user.dataDeNascimentoPaciente),
        telefoneContato: user.telefoneContato,
        cpfPaciente: user.cpfPaciente,
        dataCadastro: formatDateForInput(user.dataCadastro),
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (!user) return;

    try {
      const updatedUser = await atualizarPaciente(user.codigoPaciente, formData);
      await reloadUser(updatedUser.codigoPaciente); 
      setMessage({ type: 'success', text: 'Dados atualizados com sucesso!' });
    } catch (err) {
      setMessage({ type: 'error', text: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    const isConfirmed = window.confirm(
      'TEM CERTEZA? Esta ação é irreversível e excluirá sua conta permanentemente.'
    );

    if (!isConfirmed) return;

    setIsLoading(true);
    setMessage(null);

    try {
      await excluirPaciente(user.codigoPaciente);
      logout();
      navigate('/welcome');
    } catch (err) {
      setMessage({ type: 'error', text: (err as Error).message });
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Meu Perfil</h1>

        <form onSubmit={handleUpdate} className="p-6 bg-white rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold">Seus Dados</h2>
          
          <div>
            <label htmlFor="cpfPaciente" className="block text-sm font-medium text-gray-700">
              CPF (não pode ser alterado)
            </label>
            <input
              id="cpfPaciente"
              name="cpfPaciente"
              type="text"
              value={formData.cpfPaciente}
              disabled
              readOnly
              className="w-full p-2 mt-1 border border-gray-300 rounded-md bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="nomePaciente" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              id="nomePaciente"
              name="nomePaciente"
              type="text"
              value={formData.nomePaciente}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="telefoneContato" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              id="telefoneContato"
              name="telefoneContato"
              type="tel"
              value={formData.telefoneContato}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              maxLength={11}
              required
            />
          </div>

          <div>
            <label htmlFor="dataDeNascimentoPaciente" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              id="dataDeNascimentoPaciente"
              name="dataDeNascimentoPaciente"
              type="date"
              value={formData.dataDeNascimentoPaciente}
              onChange={handleChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <input
            type="hidden"
            name="dataCadastro"
            value={formData.dataCadastro}
          />

          {message && (
            <div className={`p-3 text-sm rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </form>

        <div className="p-6 mt-8 bg-white rounded-lg shadow-md border border-red-200">
          <h2 className="text-xl font-semibold text-red-700">Cuidado!!!</h2>
          <p className="mt-2 text-gray-600">
            Excluir a conta é uma ação permanente e não pode ser desfeita.
          </p>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="w-full mt-4 px-4 py-2 font-semibold text-red-700 bg-transparent border border-red-700 rounded-md hover:bg-red-700 hover:text-white disabled:opacity-50"
          >
            {isLoading ? 'Excluindo...' : 'Excluir Minha Conta'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default PerfilPage;