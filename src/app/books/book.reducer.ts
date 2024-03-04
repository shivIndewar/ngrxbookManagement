import { createReducer, on } from "@ngrx/store";
import { AddBook, RemoveBook, AddBookSuccess, AddBookFailed } from "./book.actions";
import { Book } from "../models/book";

export const initialState : Book[]=[];
export const BookReducer = createReducer(
    initialState,
    on(AddBook, (state)=>{return state}),
    on(AddBookSuccess, (state,{id,name,author})=>[...state,{id,name,author}]),
    on(AddBookFailed, (state, {error}) =>{
        console.error(error);
        return state;
    }),

    on(RemoveBook, (state,{bookId})=>state.filter(book => book.id !== bookId))
    );    