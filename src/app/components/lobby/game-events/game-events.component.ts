import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Lobby } from 'src/app/models/lobby.model';
import { LobbySocketService } from '../sockets/lobby-socket.service';
import * as moment from 'moment'

@Component({
  selector: 'app-game-events',
  templateUrl: './game-events.component.html',
  styleUrls: ['./game-events.component.scss']
})
export class GameEventsComponent implements OnInit {

  @Input('lobby') lobby: Lobby

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  
  constructor(private lobbySocketService: LobbySocketService) { }

  ngOnInit(): void {
    this.lobbySocketService.recieveEvent().subscribe(event => {
      this.lobby.events.push(event)
      this.scrollToChatBottom()
    })
    this.scrollToChatBottom()
  }

  formatDateEvent(date: Date){
    return moment(date).format('h:mm:ss');
  }  

  scrollToChatBottom(): void {
    try {
        setTimeout(() => {
          this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        }, 5)
    } catch(err) { 
      
    }                 
  }
}
