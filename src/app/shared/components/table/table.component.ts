import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() tableData: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() actions: { label: string; callback: (row: any) => void }[] = [];
}
