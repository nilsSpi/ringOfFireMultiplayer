import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation: boolean = false;
  game: Game;
  currentCard : string='';
  
  

  constructor(private firestore: AngularFirestore,public dialog: MatDialog, 
  private route : ActivatedRoute) { 
    this.game = new Game();
    this.firestore
    .collection('games')
    .add(this.game.toJSON())
  }

  ngOnInit(): void {
   // this.newGame();
    this.route.params.subscribe(params=> {
      console.log(params);

     this.firestore
    .collection('games')
    .doc(params['id'])
    .valueChanges()
    .subscribe((game : any)=>{
      console.log("game update:",game);
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.stack = game.stack;
      this.game.players = game.players;
    });
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


