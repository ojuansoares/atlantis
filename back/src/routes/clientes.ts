import { Router } from 'express';
import ClientesController from '../controllers/clientes';

const router = Router();

// Defina as rotas e use os métodos do controlador
router.post('/criar-cliente', ClientesController.create);
router.get('/listar-clientes', ClientesController.getAll);
router.get('/cliente/:id', ClientesController.getById);
router.put('/atualizar-cliente/:id', ClientesController.update);
router.delete('/deletar-cliente/:id', ClientesController.delete);

router.post('/verificar-documento', ClientesController.verificaDocumento);
router.get('/dependentes-por-titular', ClientesController.getAllTitularesComDependentes);

export default router;