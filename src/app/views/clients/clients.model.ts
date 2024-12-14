export enum Status {
  DESATIVADO = 0,
  ATIVO = 1,
  SUSPENSO = 2
}

export interface Client {
  id: string;
  inscricao: string;
  nome: string;
  apelido: string;
  avatarUrl: string;
  status: Status
}
