import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class SearchBooks extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
    }
    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }


    handleChange = (e) => {
        this.setState({selectValue:e.target.value});
    }

    render() {
        const { books} = this.props
        const { query } = this.state

        let showingBooks
        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            console.log({books})
            showingBooks = books.filter(({title, authors})=> (match.test(title) || authors.some(author => match.test(author))))

        } else {
            showingBooks = books
        }
        showingBooks.sort(sortBy('name'))

        return (
            <div>
                <div className="app">
                    <div className="search-books-bar">
                        <Link className='close-search' to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                               <input
                                type="text"
                                placeholder="Search by title or author"
                                value={query}
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        <div className="list-books-content">
                            <ol className="books-grid">
                                {showingBooks.map((books) => (
                                    <li key={books.id}>
                                        <Book books={ books }/>
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