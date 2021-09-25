import { createServer, Model, RestSerializer, JSONAPISerializer } from "miragejs";

export default function Api() {
  createServer({
    models: {
      transaction: Model,
    },
    serializers: {
      transaction: RestSerializer.extend({ embed: true }),
      application: JSONAPISerializer,
    },
    routes() {
      this.namespace = "api";
  
      this.get("/transactions", (schema, request) => {
        return schema.transactions.all();
      });
  
      this.post("/transactions", (schema, request) => {
        const transaction = JSON.parse(request.requestBody);
        return schema.transactions.create(transaction);
      });
  
      this.delete("/transactions/:id", (schema, request) => {
        const { id } = request.params;
        return schema.transactions.find(id).destroy();
      });
  
      this.put("/transactions/:id", (schema, request) => {
        const { id } = request.params;
        const transaction = JSON.parse(request.requestBody);
        return schema.transactions.find(id).update(transaction);
      });
    },
    seeds(server) {
      server.create("transaction", {
        id: "1632571462369",
        description: "Website",
        category: "deposit",
        amount: 2005500,
        date: "01-05-2021T00:00:00",
      });
      server.create("transaction", {
        id: "1632571476309",
        description: "Salad",
        category: "withdraw",
        amount: 2055,
        date: "01-05-2021T00:00:00",
      });
      server.create("transaction", {
        id: "1632571487165",
        description: "Desapego computer",
        category: "deposit",
        amount: 205500,
        date: "01-05-2021T00:00:00",
      });
      server.create("transaction", {
        id: "1632571488144",
        description: "Cafe com pastel",
        category: "withdraw",
        amount: 550,
        date: "01-05-2021T00:00:00",
      });
    },
  });
}
