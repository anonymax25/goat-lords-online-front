import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmComponent } from 'src/app/components/layout/confirm/confirm.component';
import { Card } from 'src/app/models/card';
import { Lobby } from 'src/app/models/lobby.model';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.scss']
})
export class ChooseCardComponent implements OnInit {

  cards: Card[]
  chosenCardId = null

  constructor(
    private dialog: MatDialog,
    public myDialog: MatDialogRef<ChooseCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      lobby: Lobby,
      diceValue: number,
      numberOfCards: number
    }
    ) { }

  ngOnInit(): void {
    console.log(this.data);
    
    switch(this.data.diceValue){
      case 11:
        this.cards = this.data.lobby.game.generalStorms.slice(0, this.data.numberOfCards)
        break;
    }
  }

  close() {
    this.myDialog.close(null);
  }
  
  validate() {
    this.dialog.open(ConfirmComponent, {
      height: '200px',
      width: '500px',
      data: {
        title: "Card choice",
        content: "Do you want to choose this card?",
      }
    }).afterClosed().subscribe(response => {
      if(response === true)
        this.myDialog.close(this.chosenCardId);
    })
  }

  chooseCard(card: Card){
    this.chosenCardId = card.id
  }
}
