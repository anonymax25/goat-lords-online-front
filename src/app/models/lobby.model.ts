import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { GameEvent } from './game-event';
import { Game } from './game.model';
import { ReadyStatus } from './readyStatus';
import { User } from './user.model';

export class Lobby {
    id: number
    created_at: Date
    name: string
    code: string
    ownerId: number
    is_private: boolean
    isGameStarted: boolean
    game: Game
    users: User[]
    messages: Message[]
    readyStatus: ReadyStatus[]
    events: GameEvent[]
}