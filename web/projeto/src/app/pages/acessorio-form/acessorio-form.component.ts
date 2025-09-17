import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Veiculo } from '../../models/veiculo';
import { AcessorioService } from '../../services/acessorio.service';
import { VeiculoService } from '../../services/veiculo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Acessorio } from '../../models/acessorio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acessorio-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    CommonModule],
  templateUrl: './acessorio-form.component.html',
  styleUrl: './acessorio-form.component.css'
})
export class AcessorioForm implements OnInit {
  acessorioForm!: FormGroup;
  veiculoId!: Number;
  dataSource: Veiculo[] = [];

  constructor(
    private service: AcessorioService,
    private veiculoService: VeiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.veiculoId = Number(this.route.snapshot.paramMap.get('id'));

    this.acessorioForm = new FormGroup({
      nome: new FormControl('', Validators.required)
    })
  } 

  validaCampos(): boolean {
      return this.acessorioForm.valid;
    }
  
  
  addAcessorio(): void {
  if (!this.validaCampos()) return;

  const acessorio: Acessorio = {
    nome: this.acessorioForm.value.nome
  };

  this.service.addAcessorio(this.veiculoId, acessorio).subscribe({
    next: (res) => {
      console.log('Acessório adicionado ao veículo:', res);
      this.veiculoService.findById(this.veiculoId).subscribe(veiculoAtualizado => {
        const index = this.dataSource.findIndex(v => v.id === this.veiculoId);
        if (index > -1) {
          this.dataSource[index] = veiculoAtualizado;
        }
      });
      this.router.navigate(['/veiculo']);
    },
    error: (err) => console.error('Erro ao adicionar acessório:', err)
  });
}
  
  create(): void {
    if (!this.validaCampos()) return;
  
    const acessorio: Acessorio = {
      nome: this.acessorioForm.value.name
    };
  
    this.service.create(acessorio).subscribe({
      next: (res) => {
        console.log('Acessorio cadastrado:', res);
        this.router.navigate(['/veiculos']);
      },
      error: (err) => console.error('Erro ao cadastrar:', err)
    });
  }

}
