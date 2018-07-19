import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";

export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercepted");
        return next.handle(req)
            .catch((error, caught) =>{
                let lError = error;

                if(lError.error){
                    lError = lError.error;
                }
                if(!lError.status){
                    lError = JSON.parse(lError);
                }
                console.log("Erro detectado pelo interceptador.");
                console.log(lError);    
                return Observable.throw(lError);
            }) as any;
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}