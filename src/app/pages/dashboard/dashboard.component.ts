import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { HoldingsComponent } from '../holdings/holdings.component';
import { StocklistComponent } from '../stocklist/stocklist.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StocklistComponent) stocklistComponent!: StocklistComponent;
  @ViewChild(HoldingsComponent) holdingsComponent!: HoldingsComponent;

  constructor(private route :Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('userId');
    this.route.navigate(['/login']);
  }
}
