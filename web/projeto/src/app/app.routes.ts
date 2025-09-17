import { RouterModule, Routes } from '@angular/router';
import { Nav } from './components/nav/nav';
import { NgModule } from '@angular/core';
import { Home } from './components/home/home';
import { VeiculoList } from './pages/veiculo-list/veiculo-list.component';
import { VeiculoFormComponent } from './pages/veiculo-form/veiculo-form.component';
import { UpdateComponent } from './components/update-component/update.component';
import { AcessorioList } from './pages/acessorio-list/acessorio-list.component';
import { AcessorioForm } from './pages/acessorio-form/acessorio-form.component';

export const routes: Routes = [

    {
    path: "", component: Nav,
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: Home },
      { path: "veiculo", component: VeiculoList },
      { path: "veiculo/form", component: VeiculoFormComponent },
      { path: "veiculo/:id", component: UpdateComponent, data: { tipo: 'veiculo' } },
      { path: "veiculo/:id/add-acessorio", component: AcessorioForm},
      { path: "acessorio", component: AcessorioList },
      { path: "acessorio/form", component: AcessorioForm },
      { path: "acessorio/:id", component: UpdateComponent, data: {tipo: 'acessorio'}}
    ]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

