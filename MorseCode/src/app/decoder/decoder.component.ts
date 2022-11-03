import { Component, OnInit } from '@angular/core';

const morseCode = [
  /* A */ '.-',
  /* B */ '-...',
  /* C */ '-.-.',
  /* D */ '-..',
  /* E */ '.',
  /* F */ '..-.',
  /* G */ '--.',
  /* H */ '....',
  /* I */ '..',
  /* J */ '.---',
  /* K */ '-.-',
  /* L */ '.-..',
  /* M */ '--',
  /* N */ '-.',
  /* O */ '---',
  /* P */ '.--.',
  /* Q */ '--.-',
  /* R */ '.-.',
  /* S */ '...',
  /* T */ '-',
  /* U */ '..-',
  /* V */ '...-',
  /* W */ '.--',
  /* X */ '-..-',
  /* Y */ '-.--',
  /* Z */ '--..',
];


@Component({
  selector: 'app-decoder',
  templateUrl: './decoder.component.html',
  styleUrls: ['./decoder.component.css']
})
export class DecoderComponent  {
  // Fehlerausgabe
  public inputText!: string;
  public outputText!: string;
  public validInput = false;

  constructor() {
  }

  public decodieren(): void{
    this.transformation();
  }

  public decodierterText(): string{
    return this.outputText;
  }
  private removeSpacesBeginnEnd(str: string): string{
    let result = "";

    let countBeginn =0;
    let countEnd =str.length-1;

    while(countBeginn < str.length && (str[countBeginn] === " " || str[countBeginn] === "/")){
      countBeginn++;
    }
    while(countEnd >= 0 && (str[countEnd] === " " || str[countEnd] === "/")){
      countEnd--;
    }

    for(let i = countBeginn; i <= countEnd; i++){
        result += str[i];
    }

    return result;
  }

  private removeSpacesCenter(str:string):string{
    // .-. ...- ..-- / --.
    let result = "";
    let count = 0;
    for(let i = 0; i < str.length; i++){
      if(str[i] === " " || str[i] === "/"){
        count++;
      }
      else{
        if(count >= 3){
          result += " / ";
          result += str[i];
        }
        else if(count === 1){
          result += " ";
          result += str[i];
        }
        else{
          result += str[i];
        }

        count = 0;
      }
    }
    return result;
  }

  private morseTextToPlaneText(str: string): string{
    //  ...- .--- /
    const letters = str.split(' ');
    // " / "
    // "a / b / c / / "
    // ["a","b","c",""]
    let result = "";
    for (let i = 0; i < letters.length; i++){
      if(letters[i] === "/"){
        result += " ";
      }
      else{
        let index = this.getMorseCodeIndex(letters[i]);
        let remAscii = 'A'.charCodeAt(0) + index;
        result += String.fromCharCode(remAscii);
      }
    }
    return result;
  }

  private getMorseCodeIndex(str: string){
        for(let j = 0; j < morseCode.length; j++){
          if(str === morseCode[j]){
            return j;
          }
        }
        return -1;
  }

  private isValid(str: string): boolean {
    str = this.removeSpacesBeginnEnd(str);
    str = this.removeSpacesCenter(str);
    const letters = str.split(' ');
    for (let i = 0; i < letters.length; i++){
      if(letters[i] !== "/"){
        if(this.getMorseCodeIndex(letters[i]) == -1){
          return false;
        }
      }
    }

    return true;
  }

  public inputTextChanged(eingabe: string): void{
    this.validInput = this.isValid(eingabe);
  }

  private transformation(){
    console.log(this.inputText);
    let result = this.removeSpacesBeginnEnd(this.inputText);
    console.log(result);
    result = this.removeSpacesCenter(result);
    console.log(result);
    result = this.morseTextToPlaneText(result);
    console.log(result);
    this.outputText = result;
  }


}
