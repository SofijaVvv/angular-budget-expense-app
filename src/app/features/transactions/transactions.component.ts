import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ButtonComponent, TableComponent],
  templateUrl: './transactions.component.html',
})
export default class TransactionsComponent {
  transactions = [
    { id: 1, amount: 100, date: '2025-03-01' },
    { id: 2, amount: 200, date: '2025-03-02' },
    { id: 3, amount: 300, date: '2025-03-03' },
  ];

  displayedColumns = ['id', 'amount', 'date'];
}
