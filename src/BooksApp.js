import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import './App.css'
import ShelfBooks from './ShelfBooks'

class BooksApp extends React.Component {

  state = {
    books: []
  };

  /**
   * Use getAll API to fetch all books and store in books
   * Done in life cycle event
   */
  componentDidMount() {
      this.getBooksOnShelf()
  }

  findBookInList = id => {
    return this.state.books.findIndex(book => book.id === id);
  };

  getBooksOnShelf() {
    BooksAPI.getAll().then(books => {
        this.setState({ books })
    });
  }

  onUpdateBook = (book, shelf) => {
    const bookIdx = this.findBookInList(book.id);
    if (bookIdx !== -1) {
      this.setState(state => {
          //Update the shelf id corresponding to selection user made
          state.books[bookIdx].shelf = shelf;
          return state;
      });
    }

    // Update the book list using api and then refresh the UI to updated list
    BooksAPI.update(book, shelf ).then(updatedBook => {
     this.getBooksOnShelf()
    })
  }

  render() {
    return (
        <div>
            <Route exact path='/' render={() => (
                <ShelfBooks
                    books={ this.state.books }
                    onUpdateBook={ this.onUpdateBook }
                />
            )}/>
            <Route path='/search' render={({ history }) => (
                <SearchBooks
                    books={ this.state.books }
                    onUpdateBook={ this.onUpdateBook }
                />
            )}/>
        </div>
    )
  }
}

export default BooksApp
