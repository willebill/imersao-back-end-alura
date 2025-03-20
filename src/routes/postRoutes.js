import express from 'express';
import multer from 'multer';
import { listarPosts, postarNovoPost, uploadImagem } from '../controllers/postsController.js';

// Configura o armazenamento de arquivos usando multer.diskStorage
const storage = multer.diskStorage({
    // Define o diretório de destino para os arquivos enviados
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    // Define o nome do arquivo a ser armazenado
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Cria uma instância do multer com a configuração de armazenamento definida
const upload = multer({ dest: "./uploads", storage })

// Define as rotas da aplicação
const routes = (app) => {
    // Permite que o Express entenda requisições com formato JSON
    app.use(express.json());

    // Rota para buscar todos os posts
    app.get('/posts', listarPosts);
    // Rota para criar um post
    app.post('/posts', postarNovoPost);
    // Rota para upload de imagem, utilizando o middleware multer para processar o arquivo
    app.post('/upload', upload.single("imagem"), uploadImagem);
}

export default routes;