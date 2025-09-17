import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatIcon, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
