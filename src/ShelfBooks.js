import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types'

class ShelfBooks extends React.Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { books} = this.props
        var wantToRead = [], read = [], currentlyReading = [];

        books.forEach(function (book) {
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
                                            <Book books={ books } onUpdateBook={ this.props.onUpdateBook }/>
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
                                            <Book books={ books } onUpdateBook={ this.props.onUpdateBook }/>
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
                                            <Book books={ books } onUpdateBook={ this.props.onUpdateBook }/>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <Link to="/search" className="open-search-a">Search Books
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShelfBooks
