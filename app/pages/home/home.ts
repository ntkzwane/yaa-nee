import {NavController, Page, Events, Storage, LocalStorage,} from 'ionic-angular';
import {CardsPage} from "../cards/cards";

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  SAVE_WORDS = 'save.words';
  localStorage : Storage = new Storage(LocalStorage);
  words : { text : string, selected : boolean }[];

  constructor(public nav: NavController, public events : Events) {
    this.initEvent();
  }

  startGame() : void {
    const params = this.words.filter(word => word.selected).map(word => word.text);
    this.nav.push(CardsPage, { words: params });
  }

  canStartGame() : boolean {
    return this.words !== undefined &&
      this.words.length > 0 &&
      this.words.filter(word => word.selected).length > 0;
  }

  removeWord(index : number) : void {
    const cardToRemove = this.words[index];
    this.words = this.words.filter((card) => {
      return card !== cardToRemove;
    });

    this.events.publish(this.SAVE_WORDS);
  }

  addWord(input) : void {
    const text : string = input.value;
    if (text.indexOf(',')) { // this is a list of isht
      const words = text.split(',')
        .map(word => word.trim())
        .filter(word => word !== '')
        .map(word => ({ text: word, selected: false }));
      this.words = this.words.concat(words);
    } else { // just a word fam
      this.words.push({ text, selected: false });
    }

    input.value = '';
    this.events.publish(this.SAVE_WORDS);
  }

  toggleSelected(index : number) : void {
    this.words[index].selected = !this.words[index].selected;
    this.events.publish(this.SAVE_WORDS);
  }

  initEvent() : void {
    this.events.subscribe(this.SAVE_WORDS, () => {
      this.localStorage.setJson(this.SAVE_WORDS, this.words);
    });
  }

  onPageWillEnter() : any {
    this.localStorage.getJson(this.SAVE_WORDS).then(words => this.words = words);
    return undefined;
  }
}
