export namespace taskModel {
    export type createTask = {
        status: 'pending' | 'in-progress' | 'completed',
        priority: 'low' | 'medium' | 'high'
        title: string,
        description: string,
        createdAt?: Date
    }

    export type getFilterTask = {
        status: 'pending' | 'in-progress' | 'completed',
    }

    export type updateTaskStatus = {
        id: string,
        status: 'pending' | 'in-progress' | 'completed',
    }

    export type updateTaskPriority = {
        id: string,
        priority: 'low' | 'medium' | 'high',
    }

    export type deleteTask = {
        id: string,
    }

    export type task = {
        _id: string
        title: string,
        description: string,
        status: 'pending' | 'in-progress' | 'completed',
        priority: 'low' | 'medium' | 'high'
        createdAt?: Date
    }

}