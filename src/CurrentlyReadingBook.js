import React from 'react'
import './App.css'
import Book from './Book'

class CurrentlyReadingBook extends React.Component {
	render() {
		const onShelfChange = this.props.onShelfChange;
		const books = this.props.books.filter((book) => book.shelf === "currentlyReading");
		
		return (
			<div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
            	{books.map((book) => (
            		<li key={book.id}>
                	<Book book={book} onShelfChange={onShelfChange} />
              	</li>
          		))}
            </ol>
          </div>
      </div>
		);
	}
}

export default CurrentlyReadingBook