import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Result } from '../../../../models/result';
import { Lobby } from '../../../../models/lobby.model';
import { User } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';
import { ChooseWinner, LobbyService } from '../../lobby.service';
import { GameResults } from '../../../../models/gameResults';
import { Observable, Subscription } from 'rxjs';
import { LobbySocketService } from '../../sockets/lobby-socket.service';
import { GameResultText } from '../../../../models/game-result-text.enum';
import { ChooseCardComponent } from '../choose-card/choose-card.component';
import { MatDialog } from '@angular/material/dialog';
import { StealCardComponent } from '../steal-card/steal-card.component';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {

  @Input('lobby') lobby: Lobby
  @Input('dice') public dice: number
  @Input('updateGameResults') updateGameResults: Observable<GameResults>
  @Output('chooseWinner') chooseWinnerEvent: EventEmitter<Result> = new EventEmitter<Result>()
  result: Result;
  selectedPlayerId: number

  gameResultText = new Map([
    [9, "Get nuggets"],
    [10, "Get dollars"],
    [11, "Choose card"],
    [12, "Steal card"],
    [13, "Be sherif"],
    [14, "Get properties"],
    [15, "Choose Bad luck card"]

  ]); 

  diceToStr = new Map([
    [9, "dice9"],
    [10, "dice10"],
    [11, "diceStore"],
    [12, "diceSaloon"],
    [13, "diceSherif"],
    [14, "diceAce"],
    [15, "diceBadLuck"]
  ]); 

  private updateGameResultsSubscription: Subscription;

  
  constructor(private userService: UserService,
              private lobbySocketService: LobbySocketService,
              private dialog: MatDialog,
              public lobbyService: LobbyService) { }

  ngOnInit(): void {
    this.result = this.lobby.game.results[this.diceToStr.get(this.dice)]
    this.updateGameResultsSubscription = this.updateGameResults.subscribe((gameResult) => {
      this.result = gameResult[this.diceToStr.get(this.dice)]
    })
  }

  ngOnDestroy() {
    this.updateGameResultsSubscription.unsubscribe();
  }

  getUserOfUserID(userId: number): User {
    return this.lobby.users.find(user => user.id === userId) || this.userService.getEmptyUser()
  }

  countPlayerDice(diceNum: number, userId: number): number{
    return this.lobby.game.players.find(user => user.userId === userId).dices.filter(dice => dice.value === diceNum).length
  }

  validateWinnerChoice() {
    this.result.ids = [this.selectedPlayerId]
    this.chooseWinnerEvent.emit(this.result);
  }

  selectPlayerId(userId: number) {
    this.selectedPlayerId = userId;
  }

  redeemReward() {
    this.result.isRedeemed = true;
    this.lobbySocketService.redeemResult(this.lobby.id, this.lobby.game.id, this.result)
  }

  getNumberOfDiceOfWinner(): number {
    return this.lobby.game.players.find(p => p.userId === this.result.ids[0]).dices.filter(dice => dice.value === this.result.dice).length
  }

  getGameResultText(dice: number){
    this.gameResultText.get(dice)
  }

  chooseCards(diceValue: number, numberOfCards: number){
    this.dialog.open(ChooseCardComponent, {
      width: '500px',
      data: {
        lobby: this.lobby,
        diceValue,
        numberOfCards
      }
    }).afterClosed().subscribe(cardID => {
      if(cardID !== null){
        this.result.cardID = cardID
        this.redeemReward()
      }
    })
  }
  
  stealCards(diceValue: number, numberOfCards: number){
    this.dialog.open(StealCardComponent, {
      width: '500px',
      data: {
        lobby: this.lobby,
        numberOfCards
      }
    }).afterClosed().subscribe(cardID => {
      console.log(cardID);
      console.log(cardID !== null);
      if(cardID !== null){
        this.result.cardID = cardID
        this.redeemReward()
      }
    })
  }

  redeemProperties(){

  }

  getWonDollars(): number {
    return this.lobby.game.players.find(p => p.userId === this.result.ids[0]).dollarWon
  }
}