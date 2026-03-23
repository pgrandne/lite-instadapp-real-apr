export interface Transaction {
  id: number;
  type: string;
  key: string;
  vault_address: string;
  from_address: string;
  to_address: string;
  network: string;
  tx_hash: string;
  block_number: number;
  symbol: string;
  amount: string;
  amount_in_usd: string;
  metadata: object;
  created_at: string;
  updated_at: string;
}

export interface ChartProps {
  readonly profitsAction: Transaction[];
  readonly userDeposit: number;
}
