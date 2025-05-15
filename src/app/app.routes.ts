import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CartComponent } from './pages/cart/cart.component';
import { ErrorComponent } from './pages/error/error.component';
import { SearchComponent } from './pages/search/search.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


export const routes: Routes = [
    {
        path: "", component: AuthLayoutComponent, children: [
            { path: "", component: LoginComponent, },
            { path: "register", component: RegisterComponent },
        ]
    },
    {
        path: "", component: MainLayoutComponent,
        children: [
            { path: "home", component: HomeComponent },
            { path: "search", component: SearchComponent },
            { path: "user", component: UserComponent },
            { path: "cart", component: CartComponent },
            { path: "**", component: ErrorComponent },
        ]
    },
]
