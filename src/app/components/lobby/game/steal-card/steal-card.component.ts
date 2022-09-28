import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../../../../models/card';
import { GeneralStorms } from '../../../../models/generalStorms';
import { Lobby } from '../../../../models/lobby.model';
import { Player } from '../../../../models/player';
import { Property } from '../../../../models/property';
import { SnackbarService } from '../../../../shared/snackbar/snackbar.service';
import { ConfirmComponent } from '../../../layout/confirm/confirm.component';
import { LobbyService } from '../../lobby.service';
import { ChooseCardComponent } from '../choose-card/choose-card.component';

@Component({
  selector: 'app-steal-card',
  templateUrl: './steal-card.component.html',
  styleUrls: ['./steal-card.component.scss']
})
export class StealCardComponent implements OnInit {

  cardID: number
  numberOfCards: number
  choosenPlayer: Player

  step = 0
  selectedShownGeneralStorm: Map<number, GeneralStorms> = new Map<number, GeneralStorms>()
  selectedShownProperty: Map<number, Property> = new Map<number, Property>()
  shownGeneralStorm: GeneralStorms[] = []
  shownProperty: Property[] = []
  isRevealCards = false
  
  constructor(
    private lobbyService: LobbyService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog,
    public myDialog: MatDialogRef<ChooseCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { 
      lobby: Lobby,
      numberOfCards: number
    }
    ) { 
      this.numberOfCards = data.numberOfCards
    }


  ngOnInit(): void {
  }

  close() {
    this.myDialog.close(null);
  }

  isGeneralStorm(card: GeneralStorms | Property) {
    return card  instanceof Property
  }
  
  isProperty(card: GeneralStorms | Property) {
    return card instanceof Property
  }

  selectProperty(card: Property) {
    if(this.selectedShownProperty.has(card.id)) {
      this.selectedShownProperty.delete(card.id)
    } else {
      if(this.selectedShownProperty.size + this.selectedShownGeneralStorm.size < this.data.numberOfCards) {
        this.selectedShownProperty.set(card.id, card)
      } else {
        this.snackbarService.openError("Already selected " + this.data.numberOfCards + " card" + (this.data.numberOfCards > 1 ? "s" : ""))
      }
    }
  }
  selectGs(card: GeneralStorms) {
    if(this.selectedShownGeneralStorm.has(card.id)) {
      this.selectedShownGeneralStorm.delete(card.id)
    } else {
      if(this.selectedShownProperty.size + this.selectedShownGeneralStorm.size < this.data.numberOfCards) {
        this.selectedShownGeneralStorm.set(card.id, card)
      } else {
        this.snackbarService.openError("Already selected " + this.data.numberOfCards + " card" + (this.data.numberOfCards > 1 ? "s" : ""))
      }
    }
  }

  revealCards(){
      this.isRevealCards = true
      this.shownGeneralStorm = Array.from(this.selectedShownGeneralStorm.values())
      this.shownProperty = Array.from(this.selectedShownProperty.values())
  }

  choosePlayer(player: Player) {
    let user = this.lobbyService.playerToUser(this.data.lobby, player)
    this.dialog.open(ConfirmComponent, {
      height: '200px',
      width: '500px',
      data: {
        title: "Steal from " + user.name,
        content: "Do you want to steal from " + user.name + "?",
      }
    }).afterClosed().subscribe(response => {
      if(response) this.choosenPlayer = player
    })
  }
  
  validate() {
    this.dialog.open(ConfirmComponent, {
      height: '200px',
      width: '500px',
      data: {
        title: "Steal card choice",
        content: "Do you want to steal this card?",
      }
    }).afterClosed().subscribe(response => {
      if(response) this.myDialog.close(this.cardID);
    })
  }


}
