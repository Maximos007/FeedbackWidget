"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); // CORS é necessário para permitir acesso de outros domínios
app.use(express_1.default.json());
app.use(routes_1.routes);
app.listen(3333, () => {
    console.log('Server is running on port 3333');
});
// GET, POST, PUT, DELETE methods
// GET = Buscar informações 
// POST = Criar informações
// PUT = Atualizar informações
// PATH = Atualizar informações unicas
// DELETE = Deletar informações
