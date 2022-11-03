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
  selector: 'app-encoder',
  templateUrl: './encoder.component.html',
  styleUrls: ['./encoder.component.css']
})
export class EncoderComponent {
  public inputText!: string;
  public outputText!: string;

  constructor() {
  }

  public enkodieren(): void{
    this.transformation();
  }

  private trimBlanks(str: string): string{
    let start = 0;
    let end = str.length - 1;
    while(start < str.length && str[start] === " "){
      start++;
    }
    while(end >= 0 && str[end] === " "){
      end--;
    }

    let result = "";
    // a   b
    //a   b
    for(let i = start; i <= end; i++){
        result += str[i];
    }
    return result;
  }

  private deleteConscBlanksBetWords(str: string): string{
    let count = 0;
    let result = "";
    for (let i = 0; i < str.length; i++){
      if(str[i] === " "){
        count++;
      }
      else{
        if(count >= 1){
          result += " ";
          result += str[i];
          count = 0;
        }
        else{
          result += str[i];
        }
      }
    }
    return result;
  }

  private plainTextToMorse(str: string): string{
    // const index = a.charCodeAt(0) - 'A'.charCodeAt(0);
    let index = 0;
    let result = "";

    for(let i = 0; i < str.length; i++){
      if(str[i] === " "){
        result += " / ";
      }
      else{
        index = str[i].charCodeAt(0) - 'A'.charCodeAt(0);
        result += morseCode[index];
      }
    }
    return result;
  }

  private isValid(str: string): boolean{
    for(let i = 0; i < str.length; i++){
      if(str[i] !== " "){
        if(str[i].charCodeAt(0) < 'A'.charCodeAt(0) || str[i].charCodeAt(0) > 'Z'.charCodeAt(0)){
          return false;
        }
      }
    }
    return true;
  }

  private transformation(){
    if(!this.isValid(this.inputText)){
      alert("Darf nur Großbuchstaben von A-Z und Blanks beinhalten.");
      return;
    }
    let result = this.trimBlanks(this.inputText);
    result = this.deleteConscBlanksBetWords(result);
    result = this.plainTextToMorse(result);
    this.outputText = result.toString();
  }
}
