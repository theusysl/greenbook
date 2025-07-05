type CardEntradaProps = {
  tipo: 'normal' | 'protecao';
  modalidade: 'back' | 'lay';
  titulo: string;
  casaDeAposta: string;
  stake: number;
  odd: number;
  status: 'Pendente' | 'Ganha' | 'Perdida' | 'Anulada';
};

export function CardEntrada(props: CardEntradaProps) {
  const retorno = props.stake * props.odd;
  const lucro = props.modalidade === 'back' ? retorno - props.stake : props.stake;
  const responsabilidade = (props.odd - 1) * props.stake;

  const corBorda = props.tipo === 'normal'
    ? 'border-emerald-500'
    : 'border-orange-500';

  return (
    <div className={`relative bg-[rgb(var(--surface-rgb))] border ${corBorda} rounded-lg p-4 flex flex-col justify-between`}>

      <span className="absolute top-3 right-3 text-xs font-semibold bg-zinc-700 text-zinc-300 px-2 py-1 rounded-full">
        {props.status}
      </span>

      <div className="mb-2">
        <h4 className="text-base font-bold text-text-primary pr-16">
          {props.modalidade === 'lay' && (
            <span className={`${props.tipo === 'protecao' ? 'text-orange-500' : 'text-emerald-500'}`}>Contra </span>
          )}
          {props.titulo}
        </h4>
        <p className={`text-xs font-semibold ${props.tipo === 'protecao' ? 'text-orange-500' : 'text-emerald-500'}`}>
          {props.casaDeAposta}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 text-center">
        {props.modalidade === 'back' ? (
          <div className="flex flex-col items-center">
            <p className="text-xs text-text-secondary">Stake</p>
            <p className="text-xs font-bold text-text-primary whitespace-nowrap">R$ {props.stake.toFixed(2)}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-xs text-text-secondary" title="Responsabilidade">Resp.</p>
            <p className="text-xs font-bold text-text-primary whitespace-nowrap">R$ {responsabilidade.toFixed(2)}</p>
          </div>
        )}
        <div className="flex flex-col items-center">
          <p className="text-xs text-text-secondary">Odd</p>
          <p className="text-xs font-bold text-text-primary whitespace-nowrap">{props.odd.toFixed(2)}</p>
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