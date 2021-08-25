//jo temporary operations hai search,genre,pagination agar mai unko permanent ki tarah karu to mujhe baar baar network request karni 
//padti hai lekin yha mai apne currpage cgenere etc ke according serching kar sakdaa hu
import React, { Component } from 'react';
//import { getMovies } from './getMovies';
//used for network request
import axios from 'axios';
export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            currSearchText: '',
            currPage: 1,
            genres: [{ _id: 'abcd', name: 'All Genres' }],
            cGenre: 'All Genres'

        }
    }

    //network se request kari to component did mount me aake hi chalega app mera
    async componentDidMount() {
        console.log('Component DID Mount');
        let res = await axios.get('https://backend-react-movie.herokuapp.com/movies');
        let genreRes = await axios.get('https://backend-react-movie.herokuapp.com/genres');
        // console.log(res.data.movies);
        console.log(genreRes.data.genres);
        this.setState({
            movies: res.data.movies,
            //generes[all generes,(action,comedy,thriller)]
            //agar inka effect dekhne ke liye inko comment kar lo
            genres: [...this.state.genres, ...genreRes.data.genres]
            //genres: [...this.state.genres]
        })
    }
    handleChange = (e) => {
        let val = e.target.value;
        console.log(val);
        this.setState({
            currSearchText: val,

        })
    }
    onDelete = (id) => {
        let arr = this.state.movies.filter(function (movieObj) {
            return movieObj._id !== id;
        })
        // console.log(arr);
        this.setState({
            movies: arr
        });
    }
    sortByRatings = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if (className == 'fa fa-sort-asc') {
            //ascending order
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate
            })
        }
        else {
            //descending order
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }
    sortByStock = (e) => {
        let className = e.target.className;
        console.log(className);
        let sortedMovies = [];
        if (className == 'fa fa-sort-asc') {
            //ascending order
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjA.numberInStock - movieObjB.numberInStock
            })
        }
        else {
            //descending order
            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                return movieObjB.numberInStock - movieObjA.numberInStock
            })
        }
        this.setState({
            movies: sortedMovies
        })
    }
    handlePageChange = (pageNumber) => {
        this.setState({ currPage: pageNumber });
    }
    handleGenreChange = (genre) => {
        this.setState({
            cGenre: genre
        })
    }
    render() {
        console.log('render');
        let { movies, currSearchText, currPage, genres, cGenre } = this.state; //ES6 destructuring
        let limit = 4;
        let filteredArr = [];
        if (currSearchText === '') {
            filteredArr = movies;
        }
        else {
            filteredArr = movies.filter(function (movieObj) {
                let title = movieObj.title.toLowerCase();
                console.log(title);
                return title.includes(currSearchText.toLowerCase());
            })
        }
        //ye bhi temporary hai isliye pagination aur search box ke sath yha implement hua hai
        //maine th  se elements search kiya uske baad us table me bhi th se shuru hone wale thriller nikale
        if (cGenre != 'All Genres') {
            filteredArr = filteredArr.filter(function (movieObj) {
                return movieObj.genre.name == cGenre
            })
        }
        let numberofPage = Math.ceil(filteredArr.length / limit);
        let pageNumberArr = [];
        for (let i = 0; i < numberofPage; i++) {
            pageNumberArr.push(i + 1);
        }
        let si = (currPage - 1) * limit;
        let ei = si + limit;
        //isi filtered arr me mapping kri hai UI me return me
        filteredArr = filteredArr.slice(si, ei);
        return (

            //JSX
            //return to sirf ek hi element return karta hai agar hum return kar rahe hai ek se jyada to fragment <> me wrap karna padega
            <>
                {/*jab html ke alawa koi code likhte hai to curly braces me wrap karna padta hai*/}
                {/*niche wala ek loder hai bootstrap ka*/}
                {/*ye 0 tab hoga jab first time render hua hoga aur component did mount call nhi hua hoga to loader dikha do nhi to table dikha do*/}
                {this.state.movies.length == 0 ? <div className="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div> :
                    <div className='container'>
                        <div className='row'>
                            <div className='col-3'>
                                <ul className="list-group">
                                    {
                                        genres.map((genreObj) => (
                                            <li onClick={() => this.handleGenreChange(genreObj.name)} key={genreObj._id} className='list-group-item'>
                                                {genreObj.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                                {/*this.state.cGenere isliye nhi hai kyuki upar destructuring se elements nikal liya hai*/}
                                <h5>Current Genre : {cGenre}</h5>
                            </div>
                            <div className='col-9'>
                                <input type='search' value={this.state.currSearchText} onChange={this.handleChange} ></input>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Genre</th>
                                            <th scope="col">
                                                <i onClick={this.sortByStock} className="fa fa-sort-asc" aria-hidden="true"></i>
                                                Stock
                                                <i onClick={this.sortByStock} className="fa fa-sort-desc" aria-hidden="true"></i>
                                            </th>
                                            <th scope="col">
                                                <i onClick={this.sortByRatings} className="fa fa-sort-asc" aria-hidden="true"></i>
                                                Rate
                                                <i onClick={this.sortByRatings} className="fa fa-sort-desc" aria-hidden="true"></i>
                                            </th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filteredArr.map((movieObj) => {
                                                return (
                                                    <tr key={movieObj._id} >
                                                        <td></td>
                                                        <td>{movieObj.title}</td>
                                                        <td>{movieObj.genre.name}</td>
                                                        <td>{movieObj.numberInStock}</td>
                                                        <td>{movieObj.dailyRentalRate}</td>
                                                        <td><button onClick={() => {
                                                            this.onDelete(movieObj._id)
                                                        }} type="button" className="btn btn-danger">Delete</button></td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        {
                                            pageNumberArr.map((pageNumber) => {
                                                let classStyle = pageNumber == currPage ? 'page-item active' : 'page-item';
                                                return (
                                                    <li key={pageNumber} onClick={() => this.handlePageChange(pageNumber)}
                                                        className={classStyle}><span className="page-link">{pageNumber}</span></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

{/* <li className="page-item"><a class="page-link" href="#">1</a></li>
    <li className="page-item active" aria-current="page">
      <a className="page-link" href="#">2</a>
    </li>
    <li className="page-item"><a class="page-link" href="#">3</a></li> */}
























//import React, { Component } from 'react'
//jab normal export hai to curly braces me(destructuring) likhna padta hai(normal export ek file me multiple ho sakde ne to ham ye karke btate hai ki 
//hame kona object export karana hai lekin default export to ek file se ek hi hota hai) 
//import { getMovies } from './getMovies';
//export default class Movies extends Component {
//    constructor() {
        //parent class ke constructor ko call karta rahta hai super
//        super();
//        this.state = {
//            movies: getMovies(),
            //jab bhi search box me kuchh enter hota hai to uski nyi value state me jake store ho jati hai
//            currSearchText:'',
//            currPage: 1,
//        }
//    }
//    handleChange=(e)=>{
//        let val = e.target.value;
//        console.log(val);
//        this.setState({
//            currSearchText:val
//        })
//    }
//    onDelete=(id)=>{
        //nya array bnaya filter karke kyuki hum immutability ko prefer karte hai react me
//        let arr =this.state.movies.filter(function(movieObj){
//            return movieObj._id!=id;
//        })
        // console.log(arr);
        //state change hui to render function dubara chalega
//        this.setState({
 //           movies:arr
///        });
//    }

//    sortByRatings = (e) => {
//        let className = e.target.className;
//        console.log(className);
//        let sortedMovies = [];
//        if (className == 'fa fa-sort-asc') {
            //ascending order
//            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
//                return movieObjA.dailyRentalRate - movieObjB.dailyRentalRate
//            })
//        }
//        else {
            //descending order
//            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
//                return movieObjB.dailyRentalRate - movieObjA.dailyRentalRate
//            })
//        }
//        this.setState({
//            movies: sortedMovies
//        })
//    }
//    sortByStock = (e) => {
//        let className = e.target.className;
//        console.log(className);
//        let sortedMovies = [];
//        if (className == 'fa fa-sort-asc') {
            //ascending order
//            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                //in ascendingorder (a-b) yields a b if (a>b) else yields (b a)
//                return movieObjA.numberInStock - movieObjB.numberInStock
//            })
//        }
//        else {
            //descending order
//            sortedMovies = this.state.movies.sort(function (movieObjA, movieObjB) {
                //if(b-a > 0 than a b else b a)
//                return movieObjB.numberInStock - movieObjA.numberInStock
//            })
//        }
//        this.setState({
//            movies: sortedMovies
//        })
//    }

//    handlePageChange = (pageNumber) => {
//        this.setState({ currPage: pageNumber });
//    }

//    render() {
//        console.log('render');
        //hmara filter ka process temporary process hai to usko render me hi kar diya
//        let { movies, currSearchText, currPage } = this.state; //ES6 destructuring
//        let limit = 4;
        //maine movies ke array ko nhi chheda balki usme se filter karke apne liye array banaya filteredarray me aur usme store kar diya
//        let filteredArr = [];
        //agar user ne kuchh dala hi nhi hai to filteredarr movies array ke equal hona chahie matlab sari movie output kar leni chahiye
//        if(currSearchText=='')
//        {
//            filteredArr = movies;
//        }
//        else
//        {
//            filteredArr = movies.filter(function(movieObj) {
//                let title = movieObj.title.toLowerCase();
//                console.log(title);
//                return title.includes(currSearchText.toLowerCase());
//            })
//        }

        //if total 9 items and item limit on each page is 4 than number of pages of limit 4 to accomodate 9 items is ceil(9/4) = 3
//        let numberofPage = Math.ceil(filteredArr.length / limit);
//        let pageNumberArr = [];
        //so pagenumberArr is as (1,2,3)
//        for (let i = 0; i < numberofPage; i++) {
//            pageNumberArr.push(i + 1);
//        }
//        let si = (currPage - 1) * limit;
        //the formula of actual ei is dropped because slice function takes (1,n-1) elsements to take n elements instead of n-1 -1 is dropped
//        let ei = si + limit;
//        filteredArr = filteredArr.slice(si, ei);
//        return (
            //JSX
            //ye jo table me scroll aa jata hai use hatane me help karta hai
//            <div className='container'>
//</div>                <div className='row'>
//                    <div className='col-3'>
//                        Hello
//                    </div>
//                    <div className='col-9'>
                        {/*this.handleChange function definition ke through call hua hai lekin onDelete me function call hua hai handlechange function already arraw hai lekin onDelete me function call hua hai parameter pass karke to bahar wale function ko pta hi nhi chlega onDelete kya hai isliye bahar wale ko onDelete ke case me arraw banaya*/}
//                        <input type='search' value={this.state.currSearchText} onChange={this.handleChange} ></input>
//                        <table className="table">
//                            <thead>
//                                <tr>
//                                    <th scope="col">#</th>
//                                    <th scope="col">Title</th>
//                                    <th scope="col">Genre</th>
//                                    <th scope="col">
//                                        <i onClick={this.sortByStock} className="fa fa-sort-asc" aria-hidden="true"></i>
//                                        Stock
//                                        <i onClick={this.sortByStock} className="fa fa-sort-desc" aria-hidden="true"></i>
//                                        </th>
//                                    <th scope="col">
//                                        <i onClick={this.sortByRatings} className="fa fa-sort-asc" aria-hidden="true"></i>
//                                        Rate
//                                        <i onClick={this.sortByRatings} className="fa fa-sort-desc" aria-hidden="true"></i>
//                                        </th>
//                                    <th></th>
//                                </tr>
//                            </thead>
//                            <tbody>
//                               {
//                                    filteredArr.map((movieObj) => {
//                                        return (
                                            //key is given so that react may uniquly identify each 
                                            //row
//                                            <tr key={movieObj._id} >
//                                                <td></td>
//                                                <td>{movieObj.title}</td>
//                                                <td>{movieObj.genre.name}</td>
//                                                <td>{movieObj.numberInStock}</td>
//                                                <td>{movieObj.dailyRentalRate}</td>
                                                {/*onclick event ke upar function define kiya hai*/}
//                                                <td><button onClick={()=>{
                                                    //agar ye upar wala normal function hota to this undefined chala jata
//                                                    this.onDelete(movieObj._id)
//                                                }} type="button" className="btn btn-danger">Delete</button></td>
//                                            </tr>
//                                        )
//                                    })
//                                }
//                            </tbody>
//                        </table>
//                        <nav aria-label="...">
//                            <ul className="pagination">
//                                {
                                    //here at each page number 1,2 and 3 we map the selected page with active class(isse hi selected page ka color blue hota hai) else give it ordinary class
                                    //pageNumberArray ka ek ek index hame pageNumber hi dega
//                                    pageNumberArr.map((pageNumber) => {//aage javascript likha hai isliye {} brakets lgaya
                                          //currpage line number 85 se ES6 destructuring karke nikala hai
//                                        let classStyle = pageNumber == currPage ? 'page-item active' : 'page-item';
//                                        return (
                                            //if we click on first page render the items of first page 
//                                            <li key={pageNumber} onClick={() => this.handlePageChange(pageNumber)} className={classStyle}><span className="page-link">{pageNumber}</span></li>
//                                        )
//                                    })
//                                }
//                            </ul>
//                        </nav>
//                    </div>
//                </div>
//            </div>
//        )
//    }
//}
//agar maine render ke ander hi state change kiya to component rerender hoga aur firse render ke ander 
//ja ke state change ho jayega aise karke ek infinite loop ban jayega