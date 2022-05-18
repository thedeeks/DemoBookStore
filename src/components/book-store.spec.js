import { BookStore } from './components/book-store.vue';
import { mount, shallowMount } from '@vue/test-utils';

const _books = [
    {
        "id": 10,
        "bookName": "1984",
        "author": "George Orwell"      
    },
    {
        "id": 20,
        "bookName": "Dune",
        "author": "Frank Herbert"      
    },
    {
        "id": 30,
        "bookName": "The Ultimate Hitchhiker's Guide To The Galaxy",
        "author": "Douglas Adams"      
    }
];

describe("The Book Store", function() {

    it("should have a list of 3 books", () => {

        const shallowWrapper = shallowMount(BookStore, { propsData: {

            books: _books
        }});

        expect(shallowWrapper.findAll(".book-list")).toHaveLength(3);
    });

    
});


describe("The Book Methods", function() {

    beforeEach(() => {
        BookStore.books = _books;
    });


    it("should add a book", () => {


        expect(BookStore.addBook({
            "id": 40,
            "bookName": "The Lord Of The Rings",
            "author": "J.R.R. Tolkien"      
        })).toHaveLength(4);
    });

    it("should delete a book", () => {

        expect(BookStore.deleteBook(30)).toHaveLength(2);
    });
});
