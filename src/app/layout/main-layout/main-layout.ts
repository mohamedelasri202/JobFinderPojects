import { Component } from '@angular/core';
import { Header } from '../../shared/components/header/header';
import { Search } from '../../shared/components/search/search';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-main-layout',
  imports: [Header,Search,RouterOutlet],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
 
})
export class MainLayout {

}
