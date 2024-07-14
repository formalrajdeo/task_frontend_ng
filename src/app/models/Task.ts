import { Timestamp } from "rxjs";

export interface Task {
    _id?: object;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
    createdAt?: Date;
}
