import { describe, it, expect, beforeEach } from 'vitest';
import { LibraryCollection } from '../src/LibraryCollection';

describe('LibraryCollection', () => {
  let library: LibraryCollection;

  beforeEach(() => {
    library = new LibraryCollection();
  });

  // addBook
  it('добавляет новую книгу и возвращает id', () => {
    const id = library.addBook('Война и мир', 'Лев Толстой');
    expect(typeof id).toBe('string');
    expect(library.getBooksCount()).toBe(1);
  });

  it('не добавляет книгу с одинаковым названием', () => {
    library.addBook('Война и мир', 'Лев Толстой');
    const result = library.addBook('Война и мир', 'Другой автор');
    expect(result).toBeInstanceOf(Error);
    expect(library.getBooksCount()).toBe(1);
  });

  // removeBook
  it('удаляет книгу по id', () => {
    const id = library.addBook(
      'Преступление и наказание',
      'Ф.М. Достоевский'
    ) as string;
    library.removeBook(id);
    expect(library.getBooksCount()).toBe(0);
  });

  it('удаление несуществующей книги не влияет на коллекцию', () => {
    library.addBook('Идиот', 'Ф.М. Достоевский');
    library.removeBook('fake-id');
    expect(library.getBooksCount()).toBe(1);
  });

  // getBookInfo
  it('возвращает информацию о существующей книге', () => {
    const id = library.addBook('Анна Каренина', 'Лев Толстой') as string;
    const info = library.getBookInfo(id);
    expect(info).toEqual({ title: 'Анна Каренина', author: 'Лев Толстой' });
  });

  it('возвращает null для несуществующей книги', () => {
    const info = library.getBookInfo('fake-id');
    expect(info).toBeNull();
  });
  
  // getAllBooks
  it('возвращает список всех книг', () => {
    const id1 = library.addBook('Капитанская дочка', 'А.С. Пушкин') as string;
    const id2 = library.addBook(
      'Преступление и наказание',
      'Ф.М. Достоевский'
    ) as string;

    const books = library.getAllBooks();

    expect(books.length).toBe(2);
    expect(books).toEqual(
      expect.arrayContaining([
        { id: id1, title: 'Капитанская дочка', author: 'А.С. Пушкин' },
        {
          id: id2,
          title: 'Преступление и наказание',
          author: 'Ф.М. Достоевский',
        },
      ])
    );
  });

  it('список обновляется после удаления книги', () => {
    const id = library.addBook('Мастер и Маргарита', 'М.А. Булгаков') as string;
    library.removeBook(id);
    const books = library.getAllBooks();
    expect(books.length).toBe(0);
  });

  // getBooksCount
  it('корректно возвращает количество книг', () => {
    expect(library.getBooksCount()).toBe(0);
    library.addBook('Война и мир', 'Лев Толстой');
    expect(library.getBooksCount()).toBe(1);
    library.addBook('Преступление и наказание', 'Ф.М. Достоевский');
    expect(library.getBooksCount()).toBe(2);
  });
});
