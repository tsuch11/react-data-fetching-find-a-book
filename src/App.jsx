// ── App ──────────────────────────────────────────────────────────────
// Book search page — fetches results from Google Books API as user types
// แก้ไขได้: input placeholder, styling classes

import { useState, useEffect } from "react";
import "./App.css";

const GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes";

const App = () => {
	// ── Hooks ────────────────────────────────────────────────────────
	const [query, setQuery] = useState("");
	const [books, setBooks] = useState([]);

	useEffect(() => {
		if (!query) {
			setBooks([]);
			return;
		}

		let isCancelled = false;

		const fetchBooks = async () => {
			try {
				const response = await fetch(`${GOOGLE_BOOKS_API}?q=${encodeURIComponent(query)}`);
				const data = await response.json();

				if (!isCancelled) {
					setBooks(data.items || []);
				}
			} catch (error) {
				console.error("fetchBooks failed:", error);
			}
		};

		fetchBooks();

		return () => {
			isCancelled = true;
		};
	}, [query]);

	// ── Handlers ─────────────────────────────────────────────────────
	const handleChange = (event) => setQuery(event.target.value);

	// ── Render ───────────────────────────────────────────────────────
	return (
		<div className="App">
			<h1>Find a Book</h1>
			<input type="text" value={query} onChange={handleChange} />
			<ul>
				{books.map((book) => (
					<li key={book.id}>{book.volumeInfo.title}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
