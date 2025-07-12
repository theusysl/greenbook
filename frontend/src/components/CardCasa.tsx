"use client";

import { useState } from 'react';
import { Casa } from '@/types'; // Importamos nosso tipo Casa

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const EyeSlashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0112 9c1.657 0 3 1.343 3 3 0 .523-.134 1.014-.369 1.438m-1.154 1.154A3 3 0 019 12c0-.523.134-1.014.369-1.438" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.423 6.423C4.07 8.07 2.25 12 2.25 12s3.75 6.75 9.75 6.75c1.61 0 3.13-.28 4.477-.777M17.577 17.577C19.93 15.93 21.75 12 21.75 12s-3.75-6.75-9.75-6.75c-.98 0-1.93.09-2.823.26" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 7.5V19.5A2.25 2.25 0 008.25 21.75h7.5A2.25 2.25 0 0018 19.5V7.5M9.75 11.25v6M14.25 11.25v6M4.5 7.5h15M10.5 3.75h3A1.5 1.5 0 0115 5.25v2.25h-6V5.25A1.5 1.5 0 0110.5 3.75z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
    <path d="M5.433 13.917l1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
  </svg>
);

// MUDANÇA: As props agora são muito mais simples
type CardCasaProps = {
  casa: Casa;
  onEdit: (casa: Casa) => void;
  onDelete: (id: string) => void;
};

export function CardCasa({ casa, onEdit, onDelete }: CardCasaProps) {
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  // MUDANÇA: Agora usamos 'casa.propriedade' para acessar os dados
  return (
    <div className="bg-zinc-800 p-3 rounded-lg border border-zinc-700 mb-3 overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-emerald-500">{casa.name}</h3>
        <div className="flex items-center gap-2">
          <button onClick={() => onEdit(casa)} className="text-zinc-500 hover:text-emerald-500 cursor-pointer" title="Editar Casa">
            <EditIcon />
          </button>
          <button onClick={() => onDelete(casa.id)} className="text-zinc-500 hover:text-red-500 cursor-pointer" title="Excluir Casa">
            <TrashIcon />
          </button>
        </div>
      </div>
      
      {casa.login && (
        <p className="text-sm text-zinc-400 mt-2">
          Usuário: <span className="font-mono text-zinc-200">{casa.login}</span>
        </p>
      )}

      {casa.encryptedPassword && (
        <div className="text-sm text-zinc-400 mt-1 flex flex-wrap items-center gap-1">
          <span>Senha: </span>
          <span className="font-mono text-zinc-200 tracking-wider">
            {senhaVisivel ? casa.encryptedPassword : '•••••'}
          </span>
          <button onClick={() => setSenhaVisivel(!senhaVisivel)} className="cursor-pointer text-zinc-500 hover:text-emerald-500" title={senhaVisivel ? 'Ocultar senha' : 'Mostrar senha'}>
            {senhaVisivel ? <EyeSlashIcon /> : <EyeIcon />}
          </button>
        </div>
      )}

      <div className="flex justify-between flex-wrap gap-x-2 text-xs mt-3 text-zinc-400">
        <div>Dep. Mín: R$ {(casa.minDeposit || 0).toFixed(2)}</div>
        <div>Saque Mín: R$ {(casa.minWithdrawal || 0).toFixed(2)}</div>
      </div>
    </div>
  );
}