import { BrowserModule, Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from "@angular/material/tooltip";
import { GameFinderComponent } from './components/game-finder/game-finder.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { ConfirmComponent } from './components/layout/confirm/confirm.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LobbyListComponent } from './components/lobby-list/lobby-list.component';
import { SnackbarService } from './shared/snackbar/snackbar.service';
import { ChatComponent } from './components/lobby/chat/chat.component';
import { LobbyInfoComponent } from './components/lobby/lobby-info/lobby-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LobbyWaitingComponent } from './components/lobby/lobby-waiting/lobby-waiting.component';
import { MatDividerModule } from '@angular/material/divider';
import { GameComponent } from './components/lobby/game/game.component';
import { DiceComponent } from './components/lobby/game/dice/dice.component';
import { LegalComponent } from './components/legal/legal.component';
import { RulesComponent } from './components/rules/rules.component';
import { SpinnerSmallComponent } from './components/items/spinner-small/spinner-small.component';
import { ServerErrorInterceptor } from './shared/helpers/server-error.interceptor';
import { WinnerComponent } from './components/lobby/game/winner/winner.component';
import {MatMenuModule} from '@angular/material/menu';
import { GameEventsComponent } from './components/lobby/game-events/game-events.component';
import { ChooseCardComponent } from './components/lobby/game/choose-card/choose-card.component';
import { StealCardComponent } from './components/lobby/game/steal-card/steal-card.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    GameFinderComponent,
    ProfileComponent,
    AboutComponent,
    LobbyComponent,
    ConfirmComponent,
    LobbyListComponent,
    ChatComponent,
    LobbyInfoComponent,
    LobbyWaitingComponent,
    GameComponent,
    DiceComponent,
    LegalComponent,
    RulesComponent,
    SpinnerSmallComponent,
    WinnerComponent,
    GameEventsComponent,
    ChooseCardComponent,
    StealCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatTooltipModule,
    ClipboardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatMenuModule
  ],
  providers: [
    SnackbarService,
    Title
  ],
  entryComponents: [
    LoginComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
