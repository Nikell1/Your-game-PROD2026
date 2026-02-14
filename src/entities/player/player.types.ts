export interface ISetupPlayer {
  name: string;
  color: string;
  customSettings?: string; // изменить
}

export interface IActivePlayer extends ISetupPlayer {
  id: number;
  score: number;
  isActive: boolean;
}
