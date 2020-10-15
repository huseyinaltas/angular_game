import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { loginInfo } from '../loginInfo';


@Injectable({ providedIn: 'root' })
export class GameValidation{


  constructor(private http: HttpClient) { }

  ngOnInit() {

  }



	 returnResult(setNum:number, guessNum:number){

		var setNumS= setNum+"";
		var guessNumS= guessNum+"";

	    if(this.checkIfFiveDigits(guessNumS)==false && this.checkSameDigits(guessNumS)==false) {
			return "Please enter 5 unique digits number";
		}

	    else if(this.checkIfFiveDigits(guessNumS)==false) {
			return "Please enter 5 digits number";
		}

		else if(this.checkSameDigits(guessNumS)==false) {
			return "Please don't enter same digits in guess";
		}

		else {
			return this.givePlusNigative(setNumS, guessNumS);

		}


	}



checkSameDigits(str:string) {

		for(var i=0; i<str.length; i++) {
			for (var j = 0; j < str.length; j++) {
				if(str.charAt(i)==str.charAt(j) && i!=j) {
					return false;
				}
			}

		}
		return true;

	}

	checkIfFiveDigits(str:string) {

		if(str.length==5) {
			return true;
		}

		else {
		return false;
		}

	}

	givePlusNigative(setNum:string, guessNum:string) {
		var result = "";
		var resultOrdered = "";

		for(var i=0; i<setNum.length; i++) {
			for (var j = 0; j < guessNum.length; j++) {
				if(setNum.charAt(i)==guessNum.charAt(j) && i!=j) {
					result = result+"- ";
				}
				else if(setNum.charAt(i)==guessNum.charAt(j) && i==j) {
					result = result+"+ ";
				}
			}

		}
		if(result=="") {
			return "";
		}
		for (var i = 0; i < result.length; i++) {
			if(result.charAt(i)=='+') {
				resultOrdered = result.charAt(i)+resultOrdered;
			}
			else if(result.charAt(i)=='-') {
				resultOrdered = resultOrdered+result.charAt(i);
			}

		}


		return resultOrdered;

	}










}
