import express, { Express, Request, Response } from "express";
import { CreateRouteUseCase } from "../../../application/create-route.use-case";
import { ListAllRoutesUseCase } from "../../../application/list-all-routes.use-case";
import { RouteInMemoryRepository } from "../../db/route-in-memory.repository";

// Cria uma instância do aplicativo Express.
const app: Express = express();

// Habilita o middleware para análise de JSON nas solicitações.
app.use(express.json());

// Define a porta na qual o servidor deve escutar. Usa a variável de ambiente PORT ou padrão para 3000.
const port = process.env.PORT || 3000;

// Cria uma instância do repositório de rotas em memória.
const routeRepo = new RouteInMemoryRepository();

// Define uma rota GET "/routes" para listar todas as rotas.
app.get('/routes', async (_req: Request, res: Response) => {
  // Cria uma instância do caso de uso "ListAllRoutesUseCase" e fornece o repositório de rotas como argumento.
  const listAllUseCase = new ListAllRoutesUseCase(routeRepo);

  // Executa o caso de uso para listar todas as rotas e armazena o resultado em "output".
  const output = await listAllUseCase.execute();

  // Retorna a resposta como JSON com o resultado.
  res.json(output);
});

// Define uma rota POST "/routes" para criar uma nova rota.
app.post("/routes", async (req: Request, res: Response) => {
  // Cria uma instância do caso de uso "CreateRouteUseCase" e fornece o repositório de rotas como argumento.
  const createUseCase = new CreateRouteUseCase(routeRepo);

  // Executa o caso de uso para criar uma nova rota com base nos dados da solicitação (req.body) e armazena o resultado em "output".
  const output = await createUseCase.execute(req.body);

  // Retorna a resposta com um status 201 (Created) e o resultado como JSON.
  res.status(201).json(output);
});

// Inicializa o servidor Express para escutar na porta definida.
app.listen(port, () => {
  // Exibe uma mensagem no console informando que o servidor está rodando na porta especificada.
  console.log(`Server rodando na porta ${port}`);
});
