import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Veiculo } from '../../models/veiculo';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { VeiculoService } from '../../services/veiculo.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../components/delete-dialog/delete-dialog';
import { AcessorioService } from '../../services/acessorio.service';

@Component({
  selector: 'app-veiculo-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatTableModule, MatPaginatorModule],
  templateUrl: './veiculo-list.component.html',
  styleUrl: './veiculo-list.component.css'
})
export class VeiculoList implements OnInit {
 
  ELEMENT_DATA: Veiculo[] = [];
  displayedColumns: string[] = ['id', 'modelo', 'anoFabricacao', 'placa', 'acessorios', 'acessorio-acoes', 'acoes'];
  dataSource = new MatTableDataSource<Veiculo>();

  private service = inject(VeiculoService);
  private acessorioService = inject(AcessorioService);

  constructor() { }
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {   
      this.service.findAll().subscribe({
        next: (data: any) => {
          this.dataSource.data = data.content ?? data;
          this.dataSource.paginator = this.paginator;
          
        },
        error: err => console.error('Erro ao carregar veículos', err)
      });
  }

  readonly dialog = inject(MatDialog);
  openDialog(id: number, tipo: 'veiculo' | 'acessorio'): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { id, tipo },
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((deleted: boolean) => {
    if (deleted) {
      this.dataSource.data = this.dataSource.data.filter(veiculo => veiculo.id !== id);
    }
  });
  }

  
  removeAcessorio(veiculoId: number, acessorioId: number) {
  this.acessorioService.removeAcessorio(veiculoId, acessorioId).subscribe({
    next: (veiculoAtualizado) => {
      console.log('Acessório removido', veiculoAtualizado);
      this.findAll();
    },
    error: (err) => console.error('Erro ao remover acessório', err)
  });
}

}
