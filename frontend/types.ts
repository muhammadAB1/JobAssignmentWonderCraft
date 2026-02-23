export type taskList = {
    _id: string,
    status: 'pending' | 'in-progress' | 'completed',
    priority: 'low' | 'medium' | 'high'
    title: string,
    description: string,
    createdAt?: Date
}
