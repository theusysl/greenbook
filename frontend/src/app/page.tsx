"use client";

import { useState, useEffect } from "react";
import { Casa, Entry, EntryFormData } from "@/types";
import { CardCasa } from "@/components/CardCasa";
import { CardEntrada } from "@/components/CardEntrada";
import { ModalAdicionarEntrada } from "@/components/ModalAdicionarEntrada";
import { ModalRegistrarCasa } from "@/components/ModalRegistrarCasa";
import { DashboardSkeleton } from "@/components/DashboardSkeleton";

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
);
const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
  </svg>
);

export default function HomePage() {
  // MUDANÇA: Os estados agora começam vazios ou em estado de carregamento.
  const [isClient, setIsClient] = useState(false);

  const [casas, setCasas] = useState<Casa[]>([]);
  const [isLoadingCasas, setIsLoadingCasas] = useState(true);
  const [editingCasa, setEditingCasa] = useState<Casa | null>(null);

  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [isEntradaModalOpen, setIsEntradaModalOpen] = useState(false);
  const [isCasaModalOpen, setIsCasaModalOpen] = useState(false);

  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtY3F5aTg1ejAwMDB0aGVjY2R1a3p6em0iLCJlbWFpbCI6InRlc3RlQGdyZWVuYm9vay5jb20iLCJpYXQiOjE3NTIyNjQwNTEsImV4cCI6MTc1MjI5Mjg1MX0.56P7MU3Mok7c37i_M0WTQEkuVzFwYJgglzJw44NjONg";

  // MUDANÇA: useEffect para verificar se o componente está no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Encontre seu useEffect
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          // Busca as casas (como já estava)
          const casasResponse = await fetch('http://localhost:3001/api/bookmakers', { headers: { 'Authorization': `Bearer ${token}` } });
          if (!casasResponse.ok) throw new Error('Falha ao buscar casas');
          const casasData = await casasResponse.json();
          setCasas(casasData);

          // MUDANÇA: Busca as entradas também
          const entriesResponse = await fetch('http://localhost:3001/api/entries', { headers: { 'Authorization': `Bearer ${token}` } });
          if (!entriesResponse.ok) throw new Error('Falha ao buscar entradas');
          const entriesData = await entriesResponse.json();
          setEntries(entriesData);

        } catch (error) {
          console.error("Erro ao buscar dados:", error);
        } finally {
          setIsLoadingCasas(false);
          setIsLoadingEntries(false); // Finaliza o loading das entradas
        }
      } else {
        setIsLoadingCasas(false);
        setIsLoadingEntries(false);
      }
    };
    fetchData();
  }, [token]);

  const handleSaveCasa = async (formData: Omit<Casa, 'id'>) => {
    if (!token) return alert("Por favor, insira um token.");
    // Se estamos editando, a rota e o método mudam
    const isEditing = editingCasa !== null;
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:3001/api/bookmakers/${editingCasa.id}`
      : 'http://localhost:3001/api/bookmakers';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Falha na operação com a casa de aposta.");

      const savedOrUpdatedCasa = await response.json();

      if (isEditing) {
        // Se estava editando, atualiza o item na lista
        setCasas(casas.map(c => c.id === editingCasa.id ? savedOrUpdatedCasa : c));
      } else {
        // Se estava criando, adiciona o novo item à lista
        setCasas([...casas, savedOrUpdatedCasa]);
      }

      setIsCasaModalOpen(false);
      setEditingCasa(null); // Limpa o estado de edição

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na operação.");
    }
  };

  const handleDeleteCasa = async (id: string) => {

    // Confirmação para evitar exclusões acidentais
    if (!confirm("Tem certeza que deseja excluir esta casa de aposta?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/bookmakers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao deletar a casa de aposta.");
      }

      // Se deu certo, remove a casa da lista na tela instantaneamente
      setCasas(casas.filter(casa => casa.id !== id));

    } catch (error) {
      console.error("Erro ao deletar casa:", error);
      alert("Erro ao deletar casa.");
    }
  };

  const handleEditCasaClick = (casa: Casa) => {
    setEditingCasa(casa); // Guarda a casa que estamos editando
    setIsCasaModalOpen(true); // Abre o modal
  };

  const handleSaveEntry = async (formData: EntryFormData) => {
    if (!token) return alert("Por favor, insira um token.");

    const isEditing = editingEntry !== null;
    const url = isEditing
      ? `http://localhost:3001/api/entries/${editingEntry.id}`
      : 'http://localhost:3001/api/entries';
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha na operação com a entrada.');
      }

      const savedOrUpdatedEntry = await response.json();

      if (isEditing) {
        setEntries(entries.map(e => e.id === editingEntry.id ? savedOrUpdatedEntry : e));
      } else {
        setEntries([savedOrUpdatedEntry, ...entries]);
      }

      setIsEntradaModalOpen(false);
      setEditingEntry(null);

    } catch (error) {
      console.error("Erro ao salvar entrada:", error);
      alert(`Erro: ${error.message}`);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta entrada?")) return;

    try {
      const response = await fetch(`http://localhost:3001/api/entries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Falha ao deletar a entrada.");
      }

      setEntries(entries.filter(entry => entry.id !== id));
    } catch (error) {
      console.error("Erro ao deletar entrada:", error);
      alert("Erro ao deletar entrada.");
    }
  };

  const handleEditEntryClick = (entry: Entry) => {
    setEditingEntry(entry);
    setIsEntradaModalOpen(true);
  };

  // MUDANÇA: Renderiza apenas se o componente estiver no cliente
  if (!isClient) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="flex h-screen bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))] overflow-hidden">

      {!isLeftSidebarOpen && (<button onClick={() => setIsLeftSidebarOpen(true)} className="fixed top-4 left-4 p-1 rounded-full bg-[rgb(var(--surface-rgb))] hover:bg-[rgb(var(--primary-rgb))] z-20 cursor-pointer"> <ChevronRightIcon /> </button>)}
      {!isRightSidebarOpen && (<button onClick={() => setIsRightSidebarOpen(true)} className="fixed top-4 right-4 p-1 rounded-full bg-[rgb(var(--surface-rgb))] hover:bg-[rgb(var(--primary-rgb))] z-20 cursor-pointer"> <ChevronLeftIcon /> </button>)}

      <aside className={`transition-all duration-300 ease-in-out bg-[rgb(var(--surface-rgb))] border-r border-[rgb(var(--border-rgb))] flex-shrink-0 ${isLeftSidebarOpen ? 'w-1/6 p-4' : 'w-0 p-0'} overflow-hidden`}>
        <div className="overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold">Minhas Casas</h2>
              <button onClick={() => setIsCasaModalOpen(true)} className="bg-zinc-700 p-0.5 rounded hover:bg-emerald-500 cursor-pointer" title="Adicionar Nova Casa">
                <PlusIcon />
              </button>
            </div>
            <button onClick={() => setIsLeftSidebarOpen(false)} className="text-zinc-400 hover:text-[rgb(var(--primary-rgb))] cursor-pointer"> <ChevronLeftIcon /> </button>
          </div>

          {isLoadingCasas ? (
            <p className="text-sm text-zinc-400">Carregando casas...</p>
          ) : (
            // MUDANÇA: A chamada do componente agora é muito mais limpa
            casas.map((casa, index) => {
              // VERIFICAÇÃO DE SEGURANÇA:
              // Se o item 'casa' for nulo ou undefined, a gente simplesmente ignora e não renderiza nada.
              if (!casa) return null;

              return (
                <CardCasa
                  key={casa.id || index} // Usamos o index como fallback para a key
                  casa={casa}
                  onEdit={handleEditCasaClick}
                  onDelete={handleDeleteCasa}
                />
              )
            })
          )}
        </div>
      </aside>

      <main className="relative flex-1 overflow-y-auto">
        <button onClick={() => setIsEntradaModalOpen(true)} className="cursor-pointer absolute bottom-6 right-6 bg-[rgb(var(--surface-rgb))] text-emerald-500 border border-emerald-500 p-3 rounded-full shadow-lg transition-all z-10" title="Adicionar Nova Entrada">
          <PlusIcon />
        </button>

        <div className={`p-6 transition-all duration-300 ease-in-out
                      ${!isLeftSidebarOpen ? 'pl-15' : ''} 
                      ${!isRightSidebarOpen ? 'pr-15' : ''}`}>
          <header className="mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-white bg-clip-text text-transparent">
              Greenbook
            </h1>
            <p className="text-zinc-400 mb-2">Suas entradas e lucros em um só lugar.</p>
          </header>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
            {isLoadingEntries ? (
              <p>Carregando entradas...</p>
            ) : (
              entries.map((entry) => (
                <CardEntrada
                  key={entry.id}
                  entry={entry}
                  onDelete={handleDeleteEntry}
                  onEdit={handleEditEntryClick}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Coluna Direita */}
      <aside className={`transition-all duration-300 ease-in-out bg-[rgb(var(--surface-rgb))] border-l border-[rgb(var(--border-rgb))] flex-shrink-0 ${isRightSidebarOpen ? 'w-1/6 p-4' : 'w-0 p-0'}`}>
        <div className="overflow-hidden whitespace-nowrap">
          <div className="flex justify-between flex-wrap mb-4">
            <button onClick={() => setIsRightSidebarOpen(false)} className="cursor-pointer text-zinc-400 hover:text-[rgb(var(--primary-rgb))]"> <ChevronRightIcon /> </button>
            <h2 className="text-xl font-bold">Jogos do Dia</h2>
          </div>
          <p className="text-sm text-zinc-400">API de jogos será integrada aqui.</p>
        </div>
      </aside>

      <ModalAdicionarEntrada
        isOpen={isEntradaModalOpen}
        onClose={() => {
          setIsEntradaModalOpen(false);
          setEditingEntry(null); // Limpa o estado de edição ao fechar
        }}
        onSave={handleSaveEntry}
        dataToEdit={editingEntry} // Passa os dados para o modal
      />

      <ModalRegistrarCasa
        isOpen={isCasaModalOpen}
        onClose={() => {
          setIsCasaModalOpen(false);
          setEditingCasa(null);
        }}
        onSave={handleSaveCasa}
        dataToEdit={editingCasa}
      />
    </div>
  );
}