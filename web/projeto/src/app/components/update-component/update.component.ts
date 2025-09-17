import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VeiculoService } from '../../services/veiculo.service';
import { AcessorioService } from '../../services/acessorio.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
})
export class UpdateComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  tipo!: 'veiculo' | 'acessorio';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService,
    private acessorioService: AcessorioService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.tipo = this.route.snapshot.data['tipo'];
    if (this.tipo === 'veiculo') {
      this.form = new FormGroup({
        modelo: new FormControl('', Validators.required),
        anoFabricacao: new FormControl('', [Validators.required, Validators.min(1900)]),
        placa: new FormControl('', Validators.required),
      });

      this.veiculoService.findById(this.id).subscribe(veiculo => {
        this.form.patchValue(veiculo);
      });

    } else if (this.tipo === 'acessorio') {
      this.form = new FormGroup({
        nome: new FormControl('', Validators.required),
      });

      this.acessorioService.findById(this.id).subscribe(acessorio => {
        this.form.patchValue(acessorio);
      });
    }
  }

  update(): void {
    if (this.form.invalid) return;

    if (this.tipo === 'veiculo') {
      this.veiculoService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.router.navigate(['/veiculo']);
      });
    } else if (this.tipo === 'acessorio') {
      this.acessorioService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.router.navigate(['/acessorio']);
      });
    }
  }
}
