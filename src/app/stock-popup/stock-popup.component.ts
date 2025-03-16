import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StockService } from '../services/stock.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-stock-popup',
  templateUrl: './stock-popup.component.html',
  styleUrls: ['./stock-popup.component.css']
})
export class StockPopupComponent {
  stockExists: boolean = false; // Flag to check if stock is in the list
  userId = this.authService.getLoggedInUserId();
  constructor(
    public dialogRef: MatDialogRef<StockPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public stock: any,
    private stockService: StockService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {


    // ✅ Check if stock already exists in user's stock list
    if(this.stock.symbolName){
    this.stockService.getUserStockList( `${this.userId}`).subscribe(stockList => {
      this.stockExists = stockList.some(s => s.stockSymbol === this.stock.stockSymbol);
    });
  }
  }

  // ✅ Close popup
  close(): void {
    this.dialogRef.close();
  }

  // ✅ Add stock to list
  addToStockList(): void {
    const newStock = { ...this.stock, userId: this.userId };

    this.stockService.addStockToList(newStock).subscribe(() => {
      this.stockExists = true; // Update UI
      this.dialogRef.close({ action: 'add', stock: newStock }); // Pass data back to dashboard
    });
  }
}
