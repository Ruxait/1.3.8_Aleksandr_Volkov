type BookInfo = { id: string; title: string; author: string };

export class LibraryCollection {
  private books: BookInfo[] = [];

  private generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  addBook(title: string, author: string): string | Error {
    const exists = this.books.find((b) => (b.title = title));
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

  removeBook(id: string): void {
    this.books = this.books.filter((b) => b.id !== id);
  }

  getBookInfo(id: string): { title: string; author: string } | null {
    const book = this.books.find((b) => b.id === id);
    return book ? { title: book.title, author: book.author } : null;
  }

  getAllBooks(): Array<{ id: string; title: string; author: string }> {
    return [...this.books];
  }

  getBooksCount(): number {
    return this.books.length;
  }
}
