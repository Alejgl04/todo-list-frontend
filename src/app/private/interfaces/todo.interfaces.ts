export interface SaveTodo {
    completed: boolean;
    newTodo: NewTodo;
}

export interface NewTodo {
    title: string;
    description: string;
    status: string;
    date: number;
}

export interface Todos {
    id: string;
    date: number;
    description: string;
    title: string;
    status: string;
}
