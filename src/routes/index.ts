import { Router } from 'express'
import User from './user.route'
import Post from './post.route'
import Comment from './comment.route'
// import middleware from '../middleware/index'


const router = Router()

router.use('/users', User)
router.use('/comments', Comment)
router.use('/posts',Post)

export default router
