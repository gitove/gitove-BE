import express from 'express';

import QnaController from '../controllers/qna.controller.js';
import QnaCommentController from '../controllers/q.comment.controller.js';
import SearchCotroller from '../controllers/search.controller.js';

import checkSignin from '../middlewares/check.signin.js';
import verifyToken from '../middlewares/auth.js';

const router = express.Router();
const qnaController = new QnaController();
const qnaCommentController = new QnaCommentController();
const searchController = new SearchCotroller();

router.use(checkSignin);

router.get('/bookmark', verifyToken, qnaController.FindBookMark);
router.get('/search', searchController.QnaSearch);
router.get('/completion ', qnaController.GetAllQnaCompletion);
router.get('/incompletion', qnaController.GetAllIncompletion);
router.get('/categories/:category', qnaController.FindCategories);
router.get('/users/:user_name', qnaController.FindUserQna);
// router.get('/:id', qnaController.FindOneQna);
router.get('/:id/comments', qnaCommentController.FindAllComment);

router.use(verifyToken);

router.post('/', qnaController.CreateQna);
router.post('/:id/bookmark', qnaController.AddBookMark);
router.post('/:id/like', qnaController.LikeQna);
router.delete('/:id/bookmark', qnaController.RemoveBookMark);
router.delete('/:id/like', qnaController.RemoveLikeQna);

router.post('/:id/comments', qnaCommentController.CreateQnaComment);
router.post('/comments/:id/like', qnaCommentController.LikeComment);
router.post('/comments/:id/choice', qnaCommentController.ChooseComment);
router.delete('/comments/:id/like', qnaCommentController.RemoveLikeComment);

export default router;
