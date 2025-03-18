import { Component, Input } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgForOf, NgClass],
  templateUrl: './table.component.html',
})
export class TableComponent {
  @Input() tableData: any[] = [];
  @Input() displayedColumns: { key: string; label: string }[] = [];
  @Input() actions: {
    label: string;
    callback: (row: any) => void;
    color: string;
  }[] = [];

  getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
}
