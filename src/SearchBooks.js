import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }
    state = {
        query: '',
        queriedBooks: []
    }

    queryBooks = query => {
        if (query) {
            let queryResults = [];

            BooksAPI.search(query).then(response => {
                if (response.length) {
                    queryResults = response.map(result => {
                        result.shelf = this.checkIfShelfSelected(result);
                        return result;
                    });
                    this.setState({
                        queriedBooks: queryResults
                    });
                } else {
                    // in case we get back no results then clear out the array in set state
                    this.setState({
                        queriedBooks: []
                    });
                }
            });
        } else {
            // in case we there was nothing specified in query then clear out the array in set state
            this.setState({
                queriedBooks: []
            });
        }
        // Preserve the user search entry in state
        this.setState({
            query: query.trim()
        });

    };

    checkIfShelfSelected(result) {
        //If book had already been selected in the past set the shelf property to status book is in
        // else set to none
        let hasShelf = this.props.books.filter(book => book.id === result.id);
        return hasShelf.length ? hasShelf[0].shelf : "none";
    }

    render() {
        const { query, queriedBooks } = this.state

        return (
            <div>
                <div className="app">
                    <div className="search-books-bar">
                        <Link className='close-search' to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            {/* NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                You can find these search terms here:
                                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                                However, remember that the BooksAPI.search method DOES search by title or author
                             */}
                               <input
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                // onChange={(event) => this.updateQuery(event.target.value)}
                                onChange={(event) => this.queryBooks(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <div className="list-books-content">
                            <ol className="books-grid">
                                {queriedBooks.length > 0 && queriedBooks.map((books) => (
                                    <li key={books.id}>
                                        <Book books={ books } onUpdateBook={ this.props.onUpdateBook }/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBooks