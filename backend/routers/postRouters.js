import express from 'express';
import { selectPosts, registerPost, selectSinglePost, deletePost, updatePost } from '../controller/postControllers.js';
import { postRegisterValidation } from '../validators/postValidation.js';
import { userAuthentication } from '../midlewares/authUser.js';
const postRouter = express.Router();

postRouter.route('/').get(selectPosts).post(postRegisterValidation, userAuthentication,registerPost);
postRouter.route('/:id').get(selectSinglePost).patch(userAuthentication, updatePost).delete(userAuthentication, deletePost);

export default postRouter;