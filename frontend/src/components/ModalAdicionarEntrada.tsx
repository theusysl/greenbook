"use client";

import { useState, useEffect } from "react";
import { EntryFormData, Entry } from "@/types";
import { Switch } from './Switch';

const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>);

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
    onSave: (data: Omit<EntryFormData, 'id'>) => void;
    dataToEdit: EntryFormData | null;
};

export function ModalAdicionarEntrada({ isOpen, onClose, onSave, dataToEdit }: ModalProps) {
  // Estados para os campos do formulário
  const [titulo, setTitulo] = useState('');
  const [casaDeAposta, setCasaDeAposta] = useState('');
  const [stake, setStake] = useState(0);
  const [odd, setOdd] = useState(1.0);
  const [tipo, setTipo] = useState<'normal' | 'protecao'>('normal');
  const [modalidade, setModalidade] = useState<'back' | 'lay'>('back');
  const [status, setStatus] = useState<'Pendente' | 'Ganha' | 'Perdida' | 'Anulada'>('Pendente');

  // ... (código do useEffect para limpar o formulário quando abrir, se quiser) ...
  useEffect(() => {
    if (dataToEdit && isOpen) {
      // Modo de Edição: Preenche o formulário
      setTitulo(dataToEdit.title);
      setCasaDeAposta(dataToEdit.bookmaker.name);
      setStake(dataToEdit.stake);
      setOdd(dataToEdit.odds);
      setTipo(dataToEdit.entryType.toLowerCase() as 'normal' | 'protecao');
      setModalidade(dataToEdit.betType.toLowerCase() as 'back' | 'lay');
      setStatus(dataToEdit.status.charAt(0) + dataToEdit.status.slice(1).toLowerCase() as any);
    } else {
      // Modo de Criação: Limpa o formulário
      setTitulo('');
      setCasaDeAposta('');
      setStake('');
      setOdd('');
      setTipo('normal');
      setModalidade('back');
      setStatus('Pendente');
    }
  }, [dataToEdit, isOpen]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({
      title: titulo,
      casaDeAposta: casaDeAposta,
      stake: stake,
      odds: odd, // Corrigido de 'odd' para 'odds'
      entryType: tipo,
      betType: modalidade,
      status: status,
    });
    onClose(); // Fecha o modal após salvar
  };

  if (!isOpen) return null;

  const corBorda = tipo === 'normal' ? 'border-emerald-500' : 'border-orange-500';
  const corBotao = tipo === 'normal' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-500 hover:bg-orange-600';
  const corFoco = tipo === 'normal' ? 'focus:ring-emerald-500' : 'focus:ring-orange-500';

  return (
    <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-30">

      <div className={`bg-[rgb(var(--surface-rgb))] p-6 rounded-lg shadow-xl w-full max-w-md border-2 ${corBorda} transition-all`}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">Nova Entrada</h2>
          <button onClick={onClose} className="cursor-pointer text-text-secondary hover:text-white p-1 rounded-full hover:bg-zinc-700">
            <CloseIcon />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-text-secondary">Título da Aposta</label>
              <input
                type="text"
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}
              />
            </div>

            <div>
              <label htmlFor="casa" className="block text-sm font-medium text-text-secondary">Casa de Aposta</label>
              <input
                type="text"
                id="casa"
                placeholder="ex: Bet365"
                value={casaDeAposta}
                onChange={(e) => setCasaDeAposta(e.target.value)}
                className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="stake" className="block text-sm font-medium text-text-secondary">Stake (R$)</label>
                <input
                  type="number"
                  id="stake"
                  step="0.01"
                  value={stake}
                  onChange={(e) => setStake(Number(e.target.value))}
                  className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}
                />
              </div>
              <div>
                <label htmlFor="odd" className="block text-sm font-medium text-text-secondary">Odd</label>
                <input
                  type="number"
                  id="odd"
                  step="0.01"
                  value={odd}
                  onChange={(e) => setOdd(Number(e.target.value))}
                  className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}
                />
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-text-secondary">Status</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Pendente' | 'Ganha' | 'Perdida' | 'Anulada')}
                className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}
              >
                <option value="Pendente">Pendente</option>
                <option value="Ganha">Ganha</option>
                <option value="Perdida">Perdida</option>
                <option value="Anulada">Anulada</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col items-center">
                <label className="block text-sm font-medium text-text-secondary mb-2">Tipo</label>
                <Switch
                  onToggle={(isNormal) => setTipo(isNormal ? 'normal' : 'protecao')}
                  themeColor={tipo}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2 text-center">Modalidade</label>
                <div className="flex items-center justify-center gap-2 mt-1 rounded-md bg-zinc-800 p-1">
                  <button
                    type="button"
                    onClick={() => setModalidade('back')}
                    className={`cursor-pointer w-full rounded p-1 text-sm font-semibold ${modalidade === 'back' ? 'bg-emerald-600 text-white' : 'hover:bg-zinc-700'}`}
                  >A Favor (Back)</button>

                  <button
                    type="button"
                    onClick={() => setModalidade('lay')}
                    className={`cursor-pointer w-full rounded p-1 text-sm font-semibold ${modalidade === 'lay' ? 'bg-orange-500 text-white' : 'hover:bg-zinc-700'}`}
                  >Contra (Lay)</button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="cursor-pointer px-4 py-2 text-sm font-medium text-text-secondary rounded-md hover:bg-zinc-700">Cancelar</button>
            <button type="submit" className={`cursor-pointer px-4 py-2 text-sm font-medium text-white rounded-md ${corBotao}`}>Salvar Entrada</button>
          </div>

        </form>
      </div>
    </div>
  );
}