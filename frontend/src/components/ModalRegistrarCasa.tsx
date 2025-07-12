"use client";

import { useState, useEffect } from "react";
import { Casa } from "@/types";

const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>);

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Casa, 'id'>) => void;
  dataToEdit: Casa | null;
};

export function ModalRegistrarCasa({ isOpen, onClose, onSave, dataToEdit }: ModalProps) {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [encryptedPassword, setEncryptedPassword] = useState('');
  const [minDeposit, setMinDeposit] = useState(0);
  const [minWithdrawal, setMinWithdrawal] = useState(0);

  // MUDANÇA: Este useEffect vai preencher o formulário se estivermos editando
  useEffect(() => {
    if (dataToEdit && isOpen) {
      // Se estamos no modo de edição, preenchemos os campos
      setName(dataToEdit.name);
      setLogin(dataToEdit.login || '');
      setEncryptedPassword(dataToEdit.encryptedPassword || '');
      setMinDeposit(dataToEdit.minDeposit || 0);
      setMinWithdrawal(dataToEdit.minWithdrawal || 0);
    } else {
      // Se não, limpamos os campos (para o modo de criação)
      setName('');
      setLogin('');
      setEncryptedPassword('');
      setMinDeposit(0);
      setMinWithdrawal(0);
    }
  }, [dataToEdit, isOpen]); // Roda sempre que o modal abre ou os dados de edição mudam

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      name,
      login,
      encryptedPassword,
      minDeposit: Number(minDeposit),
      minWithdrawal: Number(minWithdrawal),
    });
  };

  return (
    <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-[rgb(var(--surface-rgb))] p-6 rounded-lg shadow-xl w-full max-w-md border-2 border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">
            {dataToEdit ? 'Editar Casa' : 'Registrar Nova Casa'}
          </h2>
          <button onClick={onClose} className="text-text-secondary hover:text-white p-1 rounded-full hover:bg-zinc-700 cursor-pointer">
            <CloseIcon />
          </button>
        </div>
        {/* Adicionamos o onSubmit ao formulário */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Cada input agora é controlado pelo seu respectivo estado */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-text-secondary">Nome da Casa</label>
              <input type="text" id="nome" placeholder="ex: Betano" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-text-secondary">Usuário/Email</label>
                <input type="text" id="usuario" value={login} onChange={(e) => setLogin(e.target.value)} className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-text-secondary">Senha</label>
                <input type="password" id="senha" value={encryptedPassword} onChange={(e) => setEncryptedPassword(e.target.value)} className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="depositoMin" className="block text-sm font-medium text-text-secondary">Depósito Mín. (R$)</label>
                <input type="number" id="depositoMin" step="0.01" value={minDeposit} onChange={(e) => setMinDeposit(Number(e.target.value))} className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="saqueMin" className="block text-sm font-medium text-text-secondary">Saque Mín. (R$)</label>
                <input type="number" id="saqueMin" step="0.01" value={minWithdrawal} onChange={(e) => setMinWithdrawal(Number(e.target.value))} className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary rounded-md hover:bg-zinc-700 cursor-pointer">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer rounded-md">Salvar Casa</button>
          </div>
        </form>
      </div>
    </div>
  );
}