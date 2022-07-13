import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

/*
@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true, relativeLinkResolution:'legacy'})],
    exports: [RouterModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
*/

export class AppRoutingModule { }
