import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentlyReadingBook from './CurrentlyReadingBook'
import WantToReadBook from './WantToReadBook'
import ReadBook from './ReadBook'
import { Link } from 'react-router-dom'
import SearchBook from './SearchBook'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: [],
    isLoading: true
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books, isLoading: false })
    })
  }

  onShelfChange = (updatedBook, shelf) => {
    let oldBooks = this.state.books;
    if (updatedBook.hasOwnProperty(shelf)) {
        oldBooks.forEach((oldBook) => {
        if(oldBook.id === updatedBook.id) {
          oldBook.shelf = shelf;
        }
      }) 
    }
    else {
        updatedBook.shelf = shelf;
        oldBooks.push(updatedBook);
    }

    this.setState({ 
          books: oldBooks
    })
    BooksAPI.update(updatedBook, shelf);
  }

  render() {
    const {books, isLoading} =  this.state;

    return (
      isLoading ? (<p className="is-loading-title" >Loading...</p>)
      :(
            <div className="app">
                <Route 
                    exact path='/'
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                              <div>
                                <CurrentlyReadingBook books={books} onShelfChange={this.onShelfChange} />
                                <WantToReadBook books={books} onShelfChange={this.onShelfChange} />
                                <ReadBook books={books} onShelfChange={this.onShelfChange} />
                              </div>
                            </div>
                            <div className="open-search">
                              <Link 
                                to='/search'
                              >Add a book</Link>
                            </div>
                      </div>
                    )}
                />
                <Route 
                    path='/search'
                    render={() => (
                        <SearchBook
                            books={books}
                            onShelfChange={this.onShelfChange}
                        />
                    )}
                />
            </div>
        )
    )
  }
}

export default BooksApp
