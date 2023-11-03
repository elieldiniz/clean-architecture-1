import { LatLng, Route } from "../domain/route.entity";
import { RouteRepositoryInterface } from "../domain/route.repository";

/**
 * Classe "CreateRouteUseCase" representa um caso de uso para criar uma nova rota.
 */
export class CreateRouteUseCase {
  /**
   * Construtor da classe "CreateRouteUseCase".
   * @param routeRepo - Uma instância de um repositório de rotas que implementa a interface "RouteRepositoryInterface".
   */
  constructor(private routeRepo: RouteRepositoryInterface) {}

  /**
   * Executa o caso de uso para criar uma nova rota com base nas informações fornecidas.
   * @param input - Um objeto contendo informações necessárias para criar uma rota, incluindo título, posição de início, posição de fim e pontos de passagem (opcional).
   * @returns Uma Promise que resolve na rota criada como um objeto JSON.
   */
  async execute(input: CreateRouteInput): Promise<CreateRouteOutput> {
    const route = new Route(input);
    await this.routeRepo.insert(route);
    return route.toJSON();
  }
}

/**
 * Tipo "CreateRouteInput" representa as informações necessárias para criar uma nova rota.
 * Inclui título, posição de início, posição de fim e pontos de passagem (opcional).
 */
type CreateRouteInput = {
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};

/**
 * Tipo "CreateRouteOutput" representa a estrutura de saída ao criar uma nova rota.
 * Inclui um ID, título, posição de início, posição de fim e possíveis pontos de passagem.
 */
type CreateRouteOutput = {
  id: string;
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  points?: LatLng[];
};
