import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  takeCardAnimation: boolean = false;
  game: Game;
  currentCard : string='';
  

  constructor() { 
    this.game = new Game();
  }

  ngOnInit(): void {
    this.newGame();
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
      
  
      setTimeout(() =>{
        this.game.playedCards.push(this.currentCard);
        this.takeCardAnimation = false;
      },1000)
    }
   
  }

}
