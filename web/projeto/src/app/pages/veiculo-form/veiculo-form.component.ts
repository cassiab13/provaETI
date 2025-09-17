import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo';


@Component({
  selector: 'app-veiculo-form.component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    CommonModule ],
  templateUrl: './veiculo-form.component.html',
  styleUrl: './veiculo-form.component.css'
})
export class VeiculoFormComponent implements OnInit {

  veiculoForm!: FormGroup;

  constructor(
    private service: VeiculoService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.veiculoForm = new FormGroup({
      modelo: new FormControl('', Validators.required),
      anoFabricacao: new FormControl('', [Validators.required, Validators.min(1980)]),
      placa: new FormControl('', Validators.required)
    });
  }

  validaCampos(): boolean {
    return this.veiculoForm.valid;
  }

  create(): void {
    if (!this.validaCampos()) return;

    const veiculo: Veiculo = {
      modelo: this.veiculoForm.value.modelo,
      anoFabricacao: this.veiculoForm.value.anoFabricacao,
      placa: this.veiculoForm.value.placa,
      acessorios: []
    };

    this.service.create(veiculo).subscribe({
      next: (res) => {
        console.log('Veículo cadastrado:', res);
        this.router.navigate(['/veiculo']);
      },
      error: (err) => console.error('Erro ao cadastrar:', err)
    });
  }


}
