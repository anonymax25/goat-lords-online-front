import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(
    public dialog: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      title: string,
      content: string
    }) { }

  ngOnInit(): void {
  }

  confirm() {
    this.dialog.close(true);
  }
  
  decline() {
    this.dialog.close(false);
  }
}
