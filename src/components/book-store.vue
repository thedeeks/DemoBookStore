<template>
    <div class="content-container">
        <div class="section content-title-group">
            <h2 class="title">Book Collection</h2>
            
            <div class="">
                <div class="">
                    <header class="card-header">
                        <!-- Book header and the Add Button-->
                        <p class="card-header-title">Books <a @click="onAddClick()" id="addLink">Add +</a></p>
                    </header>
                    <br />
                    <!-- List of Books -->
                    <ul class="list is-hoverable">
                        <li class="book-list" v-for="book in books" :key="book.id">
                            <a
                             class="list-item"
                             @click="onSelectClick(book)"
                             :class="{ 'is-active': selectedBook === book}"
                             ><span> {{book.bookName}}</span>                             
                            </a> | 
                            <a @click="deleteBook(book.id)">Delete</a> | 
                            <a @click="onEditClick(book)">Edit</a>                          
                        </li>
                    </ul>
                </div>
            </div>
            <br/>
            <!-- Book Information -->
            <div class="" v-if="selectedBook">
                <div class="">
                    <div class="card-header">
                        <p class="card-header-title"> {{selectedBook.bookName}}, {{selectedBook.author}}</p>
                    </div>
                </div>
            </div>
            <!-- Edit Book -->
            <div class="" v-if="editBook">
                <div>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label" for="name">Name</label>
                                <input class="input" id="name" v-model="editBook.bookName" />
                            </div>
                            <div class="field">
                                <label class="label" for="author">Author</label>
                                <input class="input" id="author" v-model="editBook.author" />
                            </div>
                            <div class="field">
                                <input type="button" @click="editBook = undefined" value="Cancel"/> | 
                                <input type="button" @click="saveBook(editBook)" value="Save"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Add New Book -->
            <div class="" v-if="displayNewBookForm">
                <div>
                    <div class="card-content">
                        <div class="content">
                            <div class="field">
                                <label class="label" for="name">Name</label>
                                <input class="input" id="name" v-model="newBook.bookName" />
                            </div>
                            <div class="field">
                                <label class="label" for="author">Author</label>
                                <input class="input" id="author" v-model="newBook.author" />
                            </div>
                            <div class="field">
                                <input type="button" @click="displayNewBookForm = false" value="Cancel"/> | 
                                <input type="button" @click="addBook(newBook)" value="Add"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Message Notification -->
            <div class="notification is-info" v-show="message">{{ message }}</div>
        </div>
    </div>
</template>


<script>

    export default {
        //Component Name
        name: 'BookStore',
        data() {
            //DataModel
            return {
                selectedBook: undefined,
                editBook: undefined,
                newBook: undefined,
                displayNewBookForm: false,
                message: "",
                books: []
            }
        },
        //Lifecycle hook
        async created() {
            //This would get data from a backend or an API
            this.books = await this.getBooks();
        },
        methods: {
            //When user selects a book
            onSelectClick(book) {
                this.message = '';
                this.selectedBook = book; 
                this.editBook = undefined; 
                this.newBook = undefined; 
                this.displayNewBookForm = false;
            },
            //When user clicks 'Edit'
            onEditClick(book) {
                this.message = '';
                this.editBook = book; 
                this.selectedBook = undefined; 
                this.newBook = undefined; 
                this.displayNewBookForm = false;
            },
            //When user clicks 'Add'
            onAddClick() {
                this.message = '';
                this.displayNewBookForm = true;
                this.editBook = undefined;
                this.newBook = {
                    id: 0,
                    bookName: "",
                    author: ""
                };
                this.selectedBook = undefined;
            },
            //When user clicks 'Delete'
            deleteBook(bookId) {
                for(var i = 0; i < this.books.length; i++) {
                    //Match the book.id and delete from the array
                    if(this.books[i].id == bookId) {
                        let name = this.books[i].bookName;
                        this.books.splice(i, 1);
                        this.message = `Deleted ${name} successfully.`;
                        this.selectedBook = undefined;
                        break;
                    }
                }
            },
            //Saving the edit changes 
            saveBook(editBook) {
                for(var i = 0; i < this.books.length; i++) {
                    if(this.books[i].id == editBook.id) {
                        this.books[i].bookName = editBook.bookName;
                        this.books[i].author = editBook.author;
                        this.message = "Update successful."
                        this.editBook = undefined;
                    }
                }
            },
            //Adding a new book
            addBook(newBook) {
                let length = this.books.length;
                let lastId = this.books[length-1].id;                
                newBook.id = lastId + 1;
                
                this.books.push(newBook);                
                this.displayNewBookForm = false;
                this.newBook = undefined;
                this.message = "New Book Added.";
            },
            async getBooks() { //Simulating an API call
                let bookArray =  [
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
                                },
                                {
                                    "id": 40,
                                    "bookName": "The Lord Of The Rings",
                                    "author": "J.R.R. Tolkien"      
                                }
                            ]
                //returning data in 100ms
                return new Promise(resolve => {
                    setTimeout(() => resolve(bookArray), 100);
                });
            }
        }
    };
    
</script>

<style scoped>
.section {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
}

#addLink {
    float: right;
    color: #fff;
}
</style>