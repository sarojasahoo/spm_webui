import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { StockPopupComponent } from 'src/app/stock-popup/stock-popup.component';
import { TradeDialogComponent } from 'src/app/trade-dialog/trade-dialog.component';
import { UserDailySummaryDto } from 'src/app/model/user-daily-summary.dto';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.css']
})
export class HoldingsComponent implements OnInit {

  private holdingsubject = new BehaviorSubject<any[]>([]);
  holdings$ = this.holdingsubject.asObservable();
  tradeForm: FormGroup = new FormGroup({});

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  selectedSymbol: any = null;
  transactionType: 'search' | 'buy' | 'sell' | null = 'search';


  constructor(private fb: FormBuilder,
    private stockService: StockService,
    private dialog: MatDialog,
    private auth: AuthService) { }

    userDailySummary: UserDailySummaryDto | null = null;



  ngOnInit(): void {
    this.loadHoldings();
    this.fetchHoldingsSummaryData();
  }
  //Fetch user's stock list from backend
  loadHoldings(): void {
    const userId = this.auth.getLoggedInUserId();

    this.stockService.getUserHoldings(`${userId}`).subscribe(
      (stocks) => {
        this.holdingsubject.next(stocks);
      },
      (error) => {
        console.error('Error loading stock list:', error);
      }
    );
  }

  openTradeDialog(stock: any, operation: 'buy' | 'sell'): void {
    const dialogRef = this.dialog.open(TradeDialogComponent, {
      width: '350px',
      data: { symbol: stock.stockSymbol, price: stock.currentPrice, operation }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Trade executed successfully!');
        this.loadHoldings();
        this.fetchHoldingsSummaryData();
      }
    });
  }

  fetchHoldingsSummaryData() {
    const userId = this.auth.getLoggedInUserId();

    this.stockService.getUserDailySummary(`${userId}`).pipe(
      tap((data) => {
        this.userDailySummary = data;
        console.log('User daily summary fetched:', data);
      })
    ).subscribe({
      error: (error) => console.error('Error fetching user daily summary', error)
    });


}
get profitLossPercentage(): number {
  return Number(this.userDailySummary?.profitLossPercentage) || 0;
}
}
