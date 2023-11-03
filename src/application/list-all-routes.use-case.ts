import { LatLng } from "../domain/route.entity";
import { RouteRepositoryInterface } from "../domain/route.repository";

/**
 * Classe "ListAllRoutesUseCase" representa um caso de uso para listar todas as rotas.
 */
export class ListAllRoutesUseCase {
  /**
   * Construtor da classe "ListAllRoutesUseCase".
   * @param routeRepo - Uma instância de um repositório de rotas que implementa a interface "RouteRepositoryInterface".
   */
  constructor(private routeRepo: RouteRepositoryInterface) {}

  /**
   * Executa o caso de uso para listar todas as rotas.
   * @returns Uma Promise que resolve em um array de objetos representando as rotas.
   */
  async execute(): Promise<CreateRouteOutput> {
    const routes = await this.routeRepo.findAll();
    return routes.map(r => r.toJSON());
  }
}

/**
 * Tipo "CreateRouteOutput" representa a estrutura de saída ao listar todas as rotas.
 * É um array de objetos com informações de rota, cada um contendo um ID, título, posição de início, posição de fim e possíveis pontos de passagem.
 */
type CreateRouteOutput = {
  id: string;
  title: string;
  startPosition: LatLng;
  endPosition: LatLng;
  paths?: LatLng[];
}[];
