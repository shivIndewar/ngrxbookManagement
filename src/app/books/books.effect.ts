import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as bookActions from './book.actions';
import { BookService } from "./book.service";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class BookEffects{

    //This is an ngrx effect that responds to 'AddBook' actions.
    addBook$= createEffect(()=>this.actiions$.pipe(
        //listen for actions of type 'AddBook' 
        ofType(bookActions.AddBook),
        //for each 'AddBook' action, call 'addBook' on the book service 
        //mergeMap allows multiple concurrent 'addBook' calls
        mergeMap((action)=>this.bookService.addBook(action).pipe(
            //if the addBook call is successful, dispatch 'AddBookSuccess' action with the book data
            map(book=>bookActions.AddBookSuccess(book)),
            //if the 'addBook' call fails, dispatch 'AddBookFailed' action with the error
            catchError((error)=> of(bookActions.AddBookFailed({error})))
        ))
    ));

    constructor(private actiions$ : Actions, private bookService : BookService){

    }
}