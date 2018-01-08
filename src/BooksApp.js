import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import './App.css'
import Book from './Book'

class BooksApp extends React.Component {

  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  };

  /**
   * Use getAll API to fetch all books and store in books
   * Done in life cycle event
   */
  componentDidMount() {
      BooksAPI.getAll().then((books) => {
          console.log(books)
          this.setState({ books })
      })
  }

  render() {
    // const { books } = this.state.books

    var wantToRead = [], read = [], currentlyReading = [];

    this.state.books.forEach(function (book) {
        if (book.shelf === 'wantToRead') {
            wantToRead.push(book);
        } else if (book.shelf === 'read') {
            read.push(book);
        } else if (book.shelf === 'currentlyReading') {
            currentlyReading.push(book);
        }
    });

    return (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {currentlyReading.map((books) => (
                                <li key={books.id}>
                                    <Book books={ books }/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {wantToRead.map((books) => (
                                <li key={books.id}>
                                    <Book books={ books }/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {read.map((books) => (
                                <li key={books.id}>
                                    <Book books={ books }/>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <Route exact path='/' render={() => (
                <div>
                    <Link to="/search" className="open-search-a">Search Books
                    </Link>
                </div>
            )}/>
            <Route path='/search' render={({ history }) => (
                <SearchBooks
                    // books={(books) => {
                    //     this.state.books
                    //     history.push('/')
                    // }}
                    books = { this.state.books }
                />
            )}/>
        </div>
    </div>
    )
  }
}

export default BooksApp
