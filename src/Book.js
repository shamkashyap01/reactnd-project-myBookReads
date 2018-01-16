import React, { Component } from 'react';
import PropTypes from 'prop-types'


class Book extends Component {
    static propTypes = {
        books: PropTypes.object.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    render() {
        const { books} = this.props

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue={ books.shelf }
                                onChange={e => {
                                    this.props.onUpdateBook(books, e.target.value)}}
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ books.title }</div>
                {books.length > 0 && books.authors.map((author, index) => (
                    <div key={index} className="book-authors">{ author }</div>
                ))}
            </div>
        )
    }
}

export default Book