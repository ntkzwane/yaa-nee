import {NavController, Page, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/cards/cards.html'
})
export class CardsPage {
  words : string[] = [];
  focusedWord : { word : string, index : number } = { word: '', index: 0 };

  constructor(private nav : NavController, private params : NavParams) {}

  next() : void {
    this.focusedWord.word = this.words[++this.focusedWord.index];
  }

  isEndGame() : boolean {
    return this.focusedWord.index == this.words.length;
  }

  /**
  * Shuffles array in place.
  * @param {Array} a items The array containing the items.
  */
  shuffle(a : any) : any[] {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
    return a;
  }

  initGame() : void {
    this.words = this.shuffle(this.params.get('words'));
    this.focusedWord = { word: this.words[0], index : 0 };
  }

  onPageWillEnter() : any {
    this.initGame();
    return undefined;
  }
}
