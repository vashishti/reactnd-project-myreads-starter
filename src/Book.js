import React from 'react'
import './App.css'

class Book extends React.Component {
	render() {
		const {book, onShelfChange} = this.props;
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
          	{
          		book.shelf === 'currentlyReading' ? (
	          		<select defaultValue="currentlyReading" onChange={(event) => onShelfChange(book, event.target.value)} >
	          			<option value="none" disabled>Move to...</option>
		              <option value="currentlyReading">Currently Reading</option>
		              <option value="wantToRead">Want to Read</option>
		              <option value="read">Read</option>
		              <option value="none">None</option>
		             </select>
          		) : (
          			book.shelf === 'wantToRead' ? (
          			<select defaultValue="wantToRead" onChange={(event) => onShelfChange(book, event.target.value)} >
		              <option value="none" disabled>Move to...</option>
		              <option value="currentlyReading">Currently Reading</option>
		              <option value="wantToRead">Want to Read</option>
		              <option value="read">Read</option>
		              <option value="none">None</option>
		            </select>
          			) : (
          				<select defaultValue="read" onChange={(event) => onShelfChange(book, event.target.value)} >
		              <option value="none" disabled>Move to...</option>
		              <option value="currentlyReading">Currently Reading</option>
		              <option value="wantToRead">Want to Read</option>
		              <option value="read">Read</option>
		              <option value="none">None</option>
		            </select>
          			)
          		)
          	}
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
		);
	}
}

export default Book