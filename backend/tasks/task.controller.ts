import type { Request, Response } from "express";
import { db } from "../database";
import { type taskModel } from "./types";


export const createTask = async (req: Request, res: Response) => {
    try {
        const { title, description, status, priority }: taskModel.createTask = req.body;
        const data: taskModel.createTask = await db.task.create({
            title,
            description,
            status: status,
            priority
        })

        res.status(201).json({
            title: data.title,
            createdAt: data.createdAt,
            status: data.status,
            priority: data.priority,
        })
    } catch (error) {
        res.status(500).send(
            error
        )
    }

}

export const getTask = async (req: Request, res: Response) => {
    try {
        const { status }: taskModel.getFilterTask = req.query as taskModel.getFilterTask

        if (status) {
            const data = await db.task.find({
                status

            })
            return res.status(200).json(
                data.map((data): taskModel.task => ({
                    _id: data._id.toString(),
                    title: data.title,
                    createdAt: data.createdAt,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                }))
            )
        }

        const data = await db.task.find();
        return res.status(200).json(
            data.map((data): taskModel.task => ({
                _id: data._id.toString(),
                title: data.title,
                createdAt: data.createdAt,
                description: data.description,
                priority: data.priority,
                status: data.status
            }))
        )

    } catch (error) {
        res.status(500).send(
            error
        )
    }

}

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const { id, status }: taskModel.updateTaskStatus = req.params as taskModel.updateTaskStatus

        const task = await db.task.findOne({
            _id: id
        })


        if (!task) {
            return res.status(404).send({
                message: 'task not found'
            })
        }


        if (status !== 'in-progress' && status !== 'completed' && status !== 'pending') {
            return res.send({
                message: 'Please select correct status'
            })
        }



        await db.task.findOneAndUpdate(
            { _id: id },
            { $set: { status } },
            { returnDocument: 'after' }
        )

        res.status(200).send({
            message: 'Successfully updated!'
        })

    } catch (error) {
        res.status(500).send(
            error
        )
    }

}

export const updateTaskPriority = async (req: Request, res: Response) => {
    try {
        const { id, priority }: taskModel.updateTaskPriority = req.params as taskModel.updateTaskPriority

        const task = await db.task.findOne({
            _id: id
        })


        if (!task) {
            return res.status(404).send({
                message: 'task not found'
            })
        }

        if (priority !== 'high' && priority !== 'low' && priority !== 'medium') {
            return res.send({
                message: 'Please select correct priority status'
            })
        }

        await db.task.findOneAndUpdate(
            { _id: id },
            { $set: { priority } },
            { returnDocument: 'after' }
        )

        res.status(200).send({
            message: 'Successfully updated!'
        })

    } catch (error) {
        res.status(500).send(
            error
        )
    }

}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id }: taskModel.deleteTask = req.params as taskModel.deleteTask;

        const task = await db.task.findOne({
            _id: id
        })


        if (!task) {
            return res.status(404).send({
                message: 'task not found'
            })
        }

        await db.task.deleteOne(
            { _id: id },
        )

        res.status(200).send({
            message: 'Successfully deleted!'
        })

    } catch (error) {
        res.status(500).send(
            error
        )
    }

}