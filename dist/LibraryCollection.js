"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibraryCollection = void 0;
class LibraryCollection {
    books = [];
    constructor() { }
    generateId() {
        return Math.random().toString(36).substring(2, 9);
    }
    addBook(title, author) {
        const exists = this.books.find((b) => (b.title === title));
        if (exists) {
            return new Error(`Книга "${title}" уже существует в коллекции`);
        }
        const newBook = {
            id: this.generateId(),
            title,
            author,
        };
        this.books.push(newBook);
        return newBook.id;
    }
    removeBook(id) {
        this.books = this.books.filter((b) => b.id !== id);
    }
    getBookInfo(id) {
        const book = this.books.find((b) => b.id === id);
        return book ? { title: book.title, author: book.author } : null;
    }
    getAllBooks() {
        return [...this.books];
    }
    getBooksCount() {
        return this.books.length;
    }
}
exports.LibraryCollection = LibraryCollection;
