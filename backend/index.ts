import express from 'express'
import cors from 'cors'
import taskRouter from './tasks/task.route'

const app = express();

app.use(express.json())

app.use(cors())

app.use('/api/tasks', taskRouter)

app.listen(5000, () => { console.log('app listening on port 5000') });
