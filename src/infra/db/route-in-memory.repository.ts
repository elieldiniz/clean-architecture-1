import { Route } from "../../domain/route.entity";
import { RouteRepositoryInterface } from "../../domain/route.repository";

// A classe RouteInMemoryRepository implementa a interface RouteRepositoryInterface.
export class RouteInMemoryRepository implements RouteRepositoryInterface {
  // A propriedade "items" é um array que armazena objetos da classe "Route".
  items: Route[] = [];

  // Método "insert" para inserir uma rota no repositório.
  async insert(route: Route): Promise<void> {
    // Adiciona a rota fornecida ao array "items".
    this.items.push(route);
  }

  // Método "findAll" para recuperar todas as rotas no repositório.
  async findAll(): Promise<Route[]> {
    // Retorna o array de rotas "items".
    return this.items;
  }
}
