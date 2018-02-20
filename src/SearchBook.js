import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';

class SearchBook extends React.Component {
	
	static propTypes = {
		books: PropTypes.array.isRequired,
		onShelfChange: PropTypes.func.isRequired
	}
	
	state = {
		query: '',
		rawBooks: []
	}

	updateQuery = (query) => {

		const shelfBooks = this.props.books;
		this.setState({ query: query });
		
		if(query) {
			BooksAPI.search(query).then((rawBooks) => {
				if(rawBooks.length > 1) {
					for (var rawBookIndex in rawBooks) {
						for (var shelfBookIndex in shelfBooks) {
							if (shelfBooks[shelfBookIndex].id === rawBooks[rawBookIndex].id) {
								rawBooks[rawBookIndex].shelf = shelfBooks[shelfBookIndex].shelf;
							}
						}
					}
					this.setState({ rawBooks });
				}
			});
		}
		else {
			
			this.setState({ rawBooks: [] })
		}
	}
	
	render() {
		
		// const shelfBooks = this.props.books;
		const onShelfChange = this.props.onShelfChange;
		const {query, rawBooks} =  this.state;

		rawBooks.sort(sortBy('title'));
		return (
			<div>
				<div className="search-books">
		            <div className="search-books-bar">
		              	<Link 
		              	className="close-search" 
		              	to='/'
		              	>Close</Link>
		              	<div className="search-books-input-wrapper">
		                	<input 
		                		type="text" 
		                		placeholder="Search by title or author"
		                		value={query}
								onChange={(event)=>(this.updateQuery(event.target.value))}
		                	/>
		            	</div>
		            </div>
		            <div className="search-books-results">
		             	<ol className="books-grid">
		             	{
		             		rawBooks.map((book) => (
		            		<li key={book.id}>
		                		<Book book={book} onShelfChange={onShelfChange} />
		              		</li>
		          		))}
		              	</ol>
		            </div>
	          	</div>
        	</div>
		);
	}
}

export default SearchBook