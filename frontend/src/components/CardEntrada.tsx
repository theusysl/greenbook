"use client";

import { useState } from 'react';
import { Entry } from '@/types';

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

type CardEntradaProps = {
  id: string;
  entry: Entry;
  onDelete: (id: string) => void;
  onEdit: (entry: Entry) => void;
};

export function CardEntrada({ entry, onDelete, onEdit }: CardEntradaProps) {

  // --- Lógica de Cálculo (sem mudanças) ---
  const retorno = entry.stake * entry.odds;
  const lucro = entry.betType === 'BACK' ? retorno - entry.stake : entry.stake;
  const responsabilidade = (entry.odds - 1) * entry.stake;

  // --- Lógica de Estilo Centralizada ---
  const isNormal = entry.entryType === 'NORMAL';
  const isLay = entry.betType === 'LAY';

  const corBorda = isNormal ? 'border-emerald-500' : 'border-orange-500';
  const corTextoPrincipal = isNormal ? 'text-emerald-500' : 'text-orange-500';

  // O status agora é um objeto para ter cor e texto
  const statusInfo = {
    PENDING: { text: 'Pendente' },
    WON: { text: 'Ganha' },
    LOST: { text: 'Perdida' },
    VOID: { text: 'Anulada' },
  }[entry.status];

  return (
    <div className={`relative bg-[rgb(var(--surface-rgb))] border ${corBorda} rounded-lg p-4 flex flex-col justify-between`}>

      <div className="absolute top-3 right-3 flex flex-col items-end gap-y-1">
        <span className={`text-xs font-semibold px-2 py-1 rounded-full bg-zinc-700 text-zinc-300 ${statusInfo.class}`}>
          {statusInfo.text}
        </span>
        <div className="flex items-center gap-x-2"> {/* Envolve os 2 botões */}
          <button onClick={() => onEdit(entry)} className="text-zinc-500 hover:text-emerald-500 cursor-pointer" title="Editar Entrada">
            <EditIcon />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="text-zinc-500 hover:text-red-500 cursor-pointer p-1"
            title="Excluir Entrada"
          >
            <TrashIcon />
          </button>
        </div>
      </div>

      <div className="mb-2">
        <h4 className="text-base font-bold text-text-primary pr-16">
          {isNormal ? null : <span className="text-orange-500">Proteção: </span>}
          {isLay && <span className="text-orange-500">Contra </span>}
          {entry.title}
        </h4>
        <p className={`text-xs font-semibold mt-1 ${corTextoPrincipal}`}>
          {entry.bookmaker.name}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        {!isLay ? (
          <div className="flex flex-col items-center">
            <p className="text-xs text-text-secondary">Stake</p>
            <p className="text-xs font-bold text-text-primary whitespace-nowrap">R$ {entry.stake.toFixed(2)}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xs text-text-secondary" title="Responsabilidade">Resp.</p>
            <p className="text-xs font-bold text-orange-500 whitespace-nowrap">R$ {responsabilidade.toFixed(2)}</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <p className="text-xs text-text-secondary">Odd</p>
          <p className="text-xs font-bold text-text-primary whitespace-nowrap">{entry.odds.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs text-text-secondary">Retorno</p>
          <p className="text-xs font-bold text-text-primary whitespace-nowrap">R$ {retorno.toFixed(2)}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs text-text-secondary">Lucro</p>
          <p className={`text-xs font-bold whitespace-nowrap ${lucro >= 0 ? 'text-emerald-500' : 'text-orange-500'}`}>
            R$ {lucro.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}