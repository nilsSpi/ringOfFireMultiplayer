import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation: boolean = false;
  game: Game;
  currentCard : string='';
  

  constructor(private firestore: AngularFirestore,public dialog: MatDialog) { 
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
    this.firestore
    .collection('games')
    .valueChanges()
    .subscribe((game)=>{
      console.log("game update:",game);
    });
  }
  newGame(): void {
    this.game = new Game();
    console.log(this.game);
  }
  takeCard() {
    if (!this.takeCardAnimation){
      this.currentCard = <string>this.game.stack.pop();
      console.log(this.currentCard);
      this.takeCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer=this.game.currentPlayer%this.game.players.length;

      
  
      setTimeout(() =>{
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      },1000)
    }
   
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name:string) => {
      if(name && name.length>0){
         this.game.players.push(name);
      }
     
     
    });
  }

}


