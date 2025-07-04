"use client";

import { useState } from 'react';
import { Switch } from './Switch';

const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>);
  
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalAdicionarEntrada({ isOpen, onClose }: ModalProps) {
  const [tipoEntrada, setTipoEntrada] = useState<'normal' | 'protecao'>('normal');

  if (!isOpen) return null;

  const corBorda = tipoEntrada === 'normal' ? 'border-emerald-500' : 'border-orange-500';
  const corBotao = tipoEntrada === 'normal' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-orange-500 hover:bg-orange-600';
  const corFoco = tipoEntrada === 'normal' ? 'focus:ring-emerald-500' : 'focus:ring-orange-500';

  return (
    <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-30">

      <div className={`bg-[rgb(var(--surface-rgb))] p-6 rounded-lg shadow-xl w-full max-w-md border-2 ${corBorda} transition-all`}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">Nova Entrada</h2>
          <button onClick={onClose} className="cursor-pointer text-text-secondary hover:text-white p-1 rounded-full hover:bg-zinc-700">
            <CloseIcon />
          </button>
        </div>

        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-text-secondary">Título da Aposta</label>
              <input type="text" id="titulo" className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="stake" className="block text-sm font-medium text-text-secondary">Stake (R$)</label>
                <input type="number" id="stake" step="0.01" className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`} />
              </div>
              <div>
                <label htmlFor="odd" className="block text-sm font-medium text-text-secondary">Odd</label>
                <input type="number" id="odd" step="0.01" className={`mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center col-span-1">
                <label className="block text-sm font-medium text-text-secondary mb-2">Tipo</label>
                <Switch 
                    onToggle={(isNormal) => setTipoEntrada(isNormal ? 'normal' : 'protecao')} 
                    themeColor={tipoEntrada}
                />
                </div>
              <div className="col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-text-secondary">Status</label>
                <select id="status" className={`mt-2 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 ${corFoco}`}>
                  <option>Pendente</option>
                  <option>Ganha</option>
                  <option>Perdida</option>
                  <option>Anulada</option>
                </select>
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