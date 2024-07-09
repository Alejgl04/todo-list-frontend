import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { environment } from "../../../environments/environment";
import { Auth, User } from "../interfaces/user.interface";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(
        private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute
    ) { }
    private baseUrl: string = environment.apiUrl;
    private currentUser: User | undefined;
    private readonly JWT_TOKEN = "JWT_TOKEN";
    private readonly REFRESH_TOKEN = "REFRESH_TOKEN";

    get userAuth() {
        return { ...this.currentUser };
    }

    login(user: { email?: string | null }) {
        const url = `${this.baseUrl}/users/sign-in`;
        return this.http.post<Auth>(url, user)
            .pipe(
                tap((response) => {
                    if (response) {
                        this.loginUser(response.user, response.token);
                    }
                }),
                map((resp) => resp),
                catchError((error) => throwError(() => error.error))
            );
    }

    logout() {
        this.currentUser = undefined;
        this.removeTokens();
    }

    signUp(user: { email?: string | null }) {
        const url = `${this.baseUrl}/users/sign-up`;
        return this.http.post<Auth>(url, user)
            .pipe(
                tap((response) => {
                    if (response) {
                        this.loginUser(response.user, response.token);
                    }
                }),
                map((resp) => resp),
                catchError((error) => throwError(() => error.error))
            );
    }

    getJwtToken() {
        return localStorage.getItem(this.JWT_TOKEN) || "";
    }

    private loginUser(user: User, tokens:any) {
        this.currentUser = user;
        this.storeTokens(tokens);
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(jwt: string) {
        localStorage.setItem(this.JWT_TOKEN, jwt);
    }

    private storeTokens(tokens: any) {
        localStorage.setItem(this.JWT_TOKEN, tokens);
        localStorage.setItem(this.REFRESH_TOKEN, tokens);
    }

    private removeTokens() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);
    }
}
