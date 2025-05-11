import { Component, OnInit ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { HoldingsComponent } from '../holdings/holdings.component';
import { StocklistComponent } from '../stocklist/stocklist.component';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userId: string | null = null;
  userName: string | null = null;
  constructor(private router :Router,private authService: AuthService) {}

  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild(StocklistComponent) stocklistComponent!: StocklistComponent;
  @ViewChild(HoldingsComponent) holdingsComponent!: HoldingsComponent;


  ngOnInit() {
     this.userId = this.authService.getLoggedInUserId(); 
     this.userName = this.authService.getUserName();
  }
  logout() {
    this.authService.logout().subscribe({
     next: () => {
       this.router.navigate(['/login']);
    },
    error: err => {
      console.error('Logout failed', err);
      this.router.navigate(['/login']); // Fallback redirect
    }
    });
  }
}
