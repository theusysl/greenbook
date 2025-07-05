"use client";

const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>);
  
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ModalRegistrarCasa({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="bg-[rgb(var(--surface-rgb))] p-6 rounded-lg shadow-xl w-full max-w-md border-2 border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text-primary">Registrar Nova Casa</h2>
          <button onClick={onClose} className="text-text-secondary hover:text-white p-1 rounded-full hover:bg-zinc-700 cursor-pointer">
            <CloseIcon />
          </button>
        </div>
        <form>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-text-secondary">Nome da Casa</label>
              <input type="text" id="nome" placeholder="ex: Betano" className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="usuario" className="block text-sm font-medium text-text-secondary">Usuário/Email</label>
                <input type="text" id="usuario" className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-text-secondary">Senha</label>
                <input type="password" id="senha" className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="depositoMin" className="block text-sm font-medium text-text-secondary">Depósito Mín. (R$)</label>
                <input type="number" id="depositoMin" step="0.01" className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label htmlFor="saqueMin" className="block text-sm font-medium text-text-secondary">Saque Mín. (R$)</label>
                <input type="number" id="saqueMin" step="0.01" className="mt-1 block w-full bg-zinc-800 border-border rounded-md p-2 text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-text-secondary rounded-md hover:bg-zinc-700 cursor-pointer">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 cursor-pointer">Salvar Casa</button>
          </div>
        </form>
      </div>
    </div>
  );
}