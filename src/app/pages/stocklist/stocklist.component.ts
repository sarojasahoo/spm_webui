import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {catchError, take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { TradeDialogComponent } from '../../trade-dialog/trade-dialog.component';
import { StockPopupComponent } from 'src/app/stock-popup/stock-popup.component';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-stocklist',
  templateUrl: './stocklist.component.html',
  styleUrls: ['./stocklist.component.css']
})
export class StocklistComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private stockService: StockService,
    private dialog: MatDialog,
    private auth: AuthService) { }

  searchResult: any = null;
  private stockListSubject = new BehaviorSubject<any[]>([]);
  stockList$ = this.stockListSubject.asObservable();
  searchForm: FormGroup = new FormGroup({});
  tradeForm: FormGroup = new FormGroup({});

  showPopup = false;
  popupTitle = '';
  popupMessage = '';
  selectedSymbol: any = null;
  transactionType: 'search' | 'buy' | 'sell' | null = 'search';
  successMessage: string | null = null;


  ngOnInit(): void {
    this.loadStockList();
    this.searchForm = this.fb.group({
      stockSymbol: ['']
    });
  }

  // Fetch user's stock list from backend
  loadStockList(): void {
    const userId = this.auth.getLoggedInUserId();

    this.stockService.getUserStockList(`${userId}`).subscribe(
      (stocks) => {
        this.stockListSubject.next(stocks);
      },
      (error) => {
        console.error('Error loading stock list:', error);
      }
    );
  }

  // Search for Symbol
  onSearch() {
    const searchSymbol = this.searchForm.value.stockSymbol.trim().toUpperCase();
    // Reset popup state
    this.selectedSymbol = null;
    this.popupTitle = 'Search Symbol';
    this.transactionType = 'search';

    if (!searchSymbol) {
      // Set error message for empty input
      this.popupMessage = '⚠️ Please enter a symbol to search.';
      this.showPopup = true;
      return;
    }
    this.stockService.searchSymbols(searchSymbol).pipe(
      tap(data => {
        if (data.stockSymbol === searchSymbol) {
          this.openStockPopup(data);
        } else {
          this.showErrorPopup('No such symbol found! Please try again.');
        }
      }),catchError((error: any) => {
             console.error("Error fetching stock data:", error);
             this.showErrorPopup(error);
             return of(null);
             })
    ).subscribe();


  }
  showErrorPopup(error: any): void {
    this.dialog.open(StockPopupComponent, {
      width: '400px',
      data: { error: error }
    });
  }

  openStockPopup(stock: any): void {
    const dialogRef = this.dialog.open(StockPopupComponent, {
      width: '400px',
      data: stock
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.action === 'add') {
        this.loadStockList(); // Refresh stock list
      }
    });
  }
  // Remove stock from the user's stock list
  removeFromStockList(stockId: string): void {
    this.stockService.removeStockFromList(stockId).subscribe(
      () => {
        this.loadStockList(); // Refresh stock list after removal
      },
      (error) => {
        console.error('Error removing stock:', error);
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
        this.successMessage = 'Trade executed successfully!';
      setTimeout(() => {
        this.successMessage = null;
      }, 3000); // 3 seconds
        
      }
    });
  }

}
