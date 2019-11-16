import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    register?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAf6Ie8l7UbTLnB1k3jfdAqJmw9UCqza18',
            {
                email,
                password,
                returnSecureToken: true
            }).pipe(catchError(this.handleError));
    }

    login(email: string, password: string) {
        // tslint:disable-next-line: max-line-length
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAf6Ie8l7UbTLnB1k3jfdAqJmw9UCqza18', {
            email,
            password,
            refreshToken: true
        }).pipe(catchError(this.handleError));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unkown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS': errorMessage = 'This email exists already!'; break;
            case 'EMIAL_NOT_FOUND': errorMessage = 'This Email does not exist'; break;
            case 'INVALID_PASSWORD': errorMessage = 'Password is incorrect'; break;
        }
        return throwError(errorMessage);
    }
}
