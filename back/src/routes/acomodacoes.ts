import { Router } from 'express';
import AcomodacoesController from '../controllers/acomodacoes';

const router = Router();

// Defina as rotas e use os métodos do controlador
router.post('/criar-acomodacao', AcomodacoesController.create);
router.get('/listar-acomodacoes', AcomodacoesController.getAll);
router.get('/acomodacao/:id', AcomodacoesController.getById);
router.put('/atualizar-acomodacao/:id', AcomodacoesController.update);
router.delete('/deletar-acomodacao/:id', AcomodacoesController.delete);

export default router;