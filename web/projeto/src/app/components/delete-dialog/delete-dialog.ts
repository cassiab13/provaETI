import { Component, inject, Inject, OnInit } from '@angular/core';
import { VeiculoService } from '../../services/veiculo.service';
import { AcessorioService } from '../../services/acessorio.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css'
})
export class DeleteDialog implements OnInit {
   constructor(
      private serviceVeiculo: VeiculoService,
      private serviceAcessorio: AcessorioService,
      private dialogRef: MatDialogRef<DeleteDialog>,
      @Inject(MAT_DIALOG_DATA) public data: {id: any, tipo: 'veiculo' | 'acessorio'}
    ) { }
    readonly dialog = inject(MatDialog);

    ngOnInit(): void { }

    onCancel(): void {
      this.dialogRef.close();
    }

    onDelete(): void {
      if (this.data.tipo === 'veiculo') {
        this.serviceVeiculo.delete(this.data.id).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Erro ao deletar veículo', err)
        });
      } else if (this.data.tipo === 'acessorio') {
        this.serviceAcessorio.delete(this.data.id).subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error('Erro ao deletar acessório', err)
        });
      }
    }
}
