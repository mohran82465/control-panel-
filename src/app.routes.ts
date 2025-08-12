import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Providers } from './app/pages/providers-users/providers';
import { Customers } from './app/pages/customers/customers';
import { Sites } from './app/pages/sites/sites';
import { Product } from './app/pages/product/product';

export const appRoutes: Routes = [
    {path:'',
        pathMatch:'full',
        redirectTo:'/auth/login'
    },
    {
        path: '',
        component: AppLayout,
        children: [
            { path: 'Dashboard', component: Dashboard },
            { path: 'providers', component: Providers },
            { path: 'customers', component: Customers },
            { path: 'restaurant', component: Sites },
            { path: 'restaurant/:id', component: Product }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
