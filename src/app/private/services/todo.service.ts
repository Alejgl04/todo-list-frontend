import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";

import { environment } from "../../../environments/environment";
import { AuthService } from "../../auth/services/auth.service";
import { SaveTodo, Todos, TodosByID } from "../interfaces/todo.interfaces";

@Injectable({
    providedIn: "root"
})
export class TodoServices {
    constructor(
        private authService: AuthService,
        private http: HttpClient,
    ) { }
    private readonly apiUrl: string = environment.apiUrl;

    public authToken = this.authService.getJwtToken();
    public headers = new HttpHeaders().set("Authorization", `Bearer ${this.authToken}`);

    getTodos() {
        return this.http.get<Todos[]>(`${this.apiUrl}/task`, { headers: this.headers });
    }

    getTodoById(id: string) {
        return this.http.get<TodosByID>(`${this.apiUrl}/task/${id}`, { headers: this.headers });
    }

    createTodo(title: string, description: string) {
        return this.http.post<SaveTodo>(`${this.apiUrl}/task`, { title, description }, { headers: this.headers })
            .pipe(
                map((resp) => resp.newTodo),
                catchError((error) => throwError(() => error.error.message))
            );
    }

    updateStatus(data: any) {
        const idTodo = { ...data.status };
        const status = "COMPLETED";
        return this.http.patch<SaveTodo>(`${this.apiUrl}/task/${idTodo[0]}`, { status }, { headers: this.headers });
    }

    updateTodo(title: string, description: string, id: string) {
        const url = `${this.apiUrl}/task/${id}`;
        return this.http.patch<SaveTodo>(url, { title, description }, { headers: this.headers });
    }

    deleteTodo(idTodo: string) {
        return this.http.delete<SaveTodo>(`${this.apiUrl}/task/${idTodo}`, { headers: this.headers })
            .pipe(
                map((resp) => resp.completed),
                catchError((error) => throwError(() => error))
            );
    }
}
