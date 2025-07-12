// src/types.ts

export type Casa = {
  id: string;
  name: string;
  login?: string;
  encryptedPassword?: string;
  minDeposit?: number;
  minWithdrawal?: number;
};

export type Entry = {
  id: string;
  betType: 'BACK' | 'LAY';
  entryType: 'NORMAL' | 'PROTECTION';
  title: string;
  stake: number;
  odds: number;
  status: 'PENDING' | 'WON' | 'LOST' | 'VOID';
  bookmaker: { // O objeto da casa de aposta que o 'include' nos traz
    name: string;
  };
};

export type EntryFormData = {
  title: string;
  casaDeAposta: string; // O nome da casa como texto
  stake: number;
  odds: number;
  entryType: 'NORMAL' | 'PROTECTION';
  betType: 'BACK' | 'LAY';
  status: 'PENDING' | 'WON' | 'LOST' | 'VOID';
};