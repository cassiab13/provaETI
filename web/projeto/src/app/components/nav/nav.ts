import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [MatSidenavModule, MatNavList, MatIcon, RouterLink, RouterOutlet, Header],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
  
export class Nav {
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.navigate(['/home'])
  }
  showFiller = false;
}


