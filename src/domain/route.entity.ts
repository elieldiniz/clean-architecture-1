import crypto from "crypto";

// Define o tipo "LatLng" para representar coordenadas de latitude e longitude.
export type LatLng = { lat: number; lng: number };

// Define o tipo "RouteProps" para representar as propriedades de uma rota.
export type RouteProps = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

// Classe "Route" representa uma entidade de rota.
export class Route {
  public readonly id: string; // Identificador único da rota.
  public props: Required<RouteProps>; // Propriedades da rota, incluindo título, posição de início, posição de fim e pontos.

  /**
   * Construtor da classe "Route".
   * @param props - Propriedades da rota.
   * @param id - ID da rota (opcional).
   */
  constructor(props: RouteProps, id?: string) {
    this.id = id || crypto.randomUUID(); // Gera um ID único usando a biblioteca "crypto" ou usa o fornecido.
    this.props = {
      ...props,
      points: props.points || [], // Inicializa "points" com um array vazio, se não for fornecido.
    };
  }

  /**
   * Atualiza o título da rota.
   * @param title - Novo título da rota.
   * @throws Erro se o título for vazio.
   */
  updateTitle(title: string) {
    if (!title) {
      throw new Error("O título da rota não pode ser vazio.");
    }
    this.title = title;
  }

  /**
   * Atualiza as posições de início e fim da rota.
   * @param startPosition - Nova posição de início.
   * @param endPosition - Nova posição de fim.
   * @throws Erro se as coordenadas de início ou fim forem inválidas.
   */
  updatePosition(startPosition: LatLng, endPosition: LatLng) {
    // Adicione a lógica de validação desejada, por exemplo, limites de coordenadas.
    if (!this.isValidLatLng(startPosition) || !this.isValidLatLng(endPosition)) {
      throw new Error("Coordenadas inválidas para a posição de início ou fim.");
    }
    this.startPosition = startPosition;
    this.endPosition = endPosition;
  }

  /**
   * Atualiza os pontos da rota.
   * @param points - Novos pontos da rota.
   * @throws Erro se os pontos não forem um array de coordenadas LatLng válidas.
   */
  updatePoints(points: LatLng[]) {
    // Adicione a lógica de validação desejada para os pontos.
    if (!this.isValidLatLngArray(points)) {
      throw new Error("Os pontos devem ser um array de coordenadas LatLng válidas.");
    }
    this.points = points;
  }

  /**
   * Verifica se as coordenadas LatLng são válidas.
   * @param latlng - Coordenadas LatLng a serem verificadas.
   * @returns True se as coordenadas forem válidas, caso contrário, False.
   */
  private isValidLatLng(latlng: LatLng): boolean {
    return latlng && typeof latlng.lat === "number" && typeof latlng.lng === "number";
  }

  /**
   * Verifica se um array de coordenadas LatLng é válido.
   * @param latlngArray - Array de coordenadas LatLng a ser verificado.
   * @returns True se o array for válido, caso contrário, False.
   */
  private isValidLatLngArray(latlngArray: LatLng[]): boolean {
    return Array.isArray(latlngArray) && latlngArray.every(latlng => this.isValidLatLng(latlng));
  }

  // Propriedades getter e setter para acessar as propriedades da rota.

  get title() {
    return this.props.title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get startPosition() {
    return this.props.startPosition;
  }

  private set startPosition(value: LatLng) {
    this.props.startPosition = value;
  }

  get endPosition() {
    return this.props.endPosition;
  }

  private set endPosition(value: LatLng) {
    this.props.endPosition = value;
  }

  get points() {
    return this.props.points;
  }

  private set points(value: LatLng[]) {
    this.props.points = value;
  }

  /**
   * Serializa a instância da rota em um objeto JSON.
   * @returns Objeto JSON representando a rota.
   */
  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
