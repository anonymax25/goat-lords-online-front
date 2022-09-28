import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { Lobby } from '../../models/lobby.model';
import { Player } from '../../models/player';
import { Result } from '../../models/result';
import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LobbyService {
  

  constructor(private http: HttpClient,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      ) { }

  create(): Observable<Lobby> {

    let headers = new HttpHeaders();
    if(this.authenticationService.isLogged()){
      headers = headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    }

    return this.http.post<Lobby>(environment.apiUrl + 'lobby', {}, {headers})
  }

  get(code: string): Observable<Lobby> {

    let headers = new HttpHeaders();
    if(this.authenticationService.isLogged()){
      headers = headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    }

    return this.http.get<Lobby>(`${environment.apiUrl}lobby/${code}`, {headers})
  }

  joinUser(lobby: Lobby, userId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    return this.http.put<Lobby>(`${environment.apiUrl}lobby/${lobby.code}/join/${userId}`, null,{headers})
  }

  quitUser(lobby: Lobby, userId: number) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    return this.http.put<Lobby>(`${environment.apiUrl}lobby/${lobby.code}/quit/${userId}`, null,{headers})
  }
  
  destroy(lobby: Lobby) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${this.authenticationService.getToken()}`)
    return this.http.delete(`${environment.apiUrl}lobby/${lobby.code}`, {headers})
  }

  computeIsUserReady(lobby: Lobby, user: User) {
    const readyStatus = lobby.readyStatus.find(item => item.uid == user.id)
    if (!readyStatus)
      return null
    return readyStatus.isReady
  }

  getOtherPlayers(lobby: Lobby): Player[]{
    return lobby.game.players.filter(player => player.userId !== this.authenticationService.getIdFromToken() && lobby.users.map(user => user.id).includes(player.userId))
  }
  
  getOwner(lobby: Lobby): Player{
    return lobby.game.players.find(player => player.userId === lobby.ownerId)
  }
  isOwner(lobby: Lobby): boolean{
    return this.authenticationService.getIdFromToken() === lobby.ownerId
  }

  getSherif(lobby: Lobby): User{
    return lobby.users.find(user => lobby.game.sherifUserid === user.id) || this.userService.getEmptyUser()
  }

  getPlayer(lobby: Lobby): Player{
    return lobby.game.players.find(player => player.userId === this.authenticationService.getIdFromToken())
  }

  isWinner(result: Result): boolean {
    return result.ids[0] === this.authenticationService.getIdFromToken()
  }
  
  playerToUser(lobby: Lobby, player: Player): User {
    return lobby.users.find(user => user.id === player.userId)
  }
}

export enum GameStatusDisplay {
  'DICE_ROLLING' = 'Roll your dices',
  'RESULTS' = 'Results'
}

export class ChooseWinner {
  constructor(public result: Result, public resultDice: string){}
}