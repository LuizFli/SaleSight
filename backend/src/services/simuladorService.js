import axios from "axios";
import { env } from "../env.js";

class SimuladorService {
  constructor() {}
  async enviarPedidoParaFila(pedido, produtos) {
    try {
      const pedidoId = pedido.id;
      const result = await axios({
        method: "post",
        url: `${env.simulatorUrl}/queue/items`,
        data: {
          payload: {
            orderId: pedidoId,
            order: produtos.map((produto) => {
              return { bloco: produto.bloco };
            }),
          },
          callbackUrl: `http://localhost:3000/pedidos/${pedidoId}`,
        },
      });

      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async consultarStatusFila(idFila) {
    try {
      const result = await axios({
        method: "get",
        url: `${env.simulatorUrl}/queue/items/${idFila}`,
      });
      
      return result?.data;
    }
     catch (error) {
      console.log(error);
      throw error;
    }
  }
  async consultarHealth() {
      try {
        const result = await axios.get(`${env.simulatorUrl}/health`);
        
        return {
          status: result.status,
          data: result.data,
        };
      } catch (error) {
        console.log(error);
        
        if (error && error.response) {
          return {
            status: error.response.status,
            data: error.response.data,
          };
        }
        throw error;
      }
    }
}

export const simuladorService = new SimuladorService();
