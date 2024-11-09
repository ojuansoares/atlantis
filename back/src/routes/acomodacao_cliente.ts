import { Router } from 'express';
import AcomodacaoClienteController from '../controllers/acomodacao_cliente';

const router = Router();

// Defina as rotas e use os métodos do controlador
router.post('/vincular-cliente', AcomodacaoClienteController.create);
router.get('/listar-vinculos', AcomodacaoClienteController.getAll);
router.get('/vinculo-cliente/:id', AcomodacaoClienteController.getById);
router.delete('/desvincular-cliente/:acomodacao_id/:cliente_id', AcomodacaoClienteController.delete);


router.get('/verifica-limite/:acomodacao_id', (req, res, next) => { AcomodacaoClienteController.verificaLimiteAcomodacao(req, res, next); });
router.get('/verifica-cliente/:cliente_id', AcomodacaoClienteController.verificaClienteAcomodado);
router.get('/clientes-por-acomodacao/:acomodacao_id', AcomodacaoClienteController.getClientesByAcomodacao);


export default router;