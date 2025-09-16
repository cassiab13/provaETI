import { RouterModule, Routes } from '@angular/router';
import { Nav } from './components/nav/nav';
import { NgModule } from '@angular/core';

export const routes: Routes = [

    {
        path: "", component: Nav
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

