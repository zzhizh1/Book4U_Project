import React from "react";
import { withRouter } from "react-router-dom";
import "../style/Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNavbar from "./PageNavbar";
// import GenreButton from "./GenreButton";
// import DashboardMovieRow from "./DashboardMovieRow";
import StarIcon from "../assets/images/star.png";
import Logo from "../assets/images/book.png";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      bookName: "",
      search: [],
      books: [],
      bookDecade: []
    };

    this.showTop = this.showTop.bind(this);
    this.showTopInDecade = this.showTopInDecade.bind(this);
  }

  componentDidMount() {
    this.showTop();
    this.showTopInDecade();
  }

  handleChange(e) {
    this.setState({
      bookName: e.target.value,
    });
  }

  // Search
  submitBook = () => {
    this.props.history.push(`/search?k=${this.state.bookName}`);
  };

  // React function that is called when the page load.
  /* Set this.state.movies to a list of <DashboardMovieRow />'s. */
  showTop() {
    fetch("http://localhost:8081/top10", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((booksList) => {
        this.setState({
          books: booksList,
        });
      })
      .catch((err) => console.log(err));
  }

  showTopInDecade() {
    fetch("http://localhost:8081/topDecade", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((decadesList) => {
        this.setState({
          bookDecade: decadesList,
        });
      })
      .catch((err) => console.log(err));
  } 

    // Go to the book's subpage/info page
  goToSubpage(ISBN) {
    this.props.history.push({
      pathname : '/subpage',
      state :{
        //ISBN: the ISBN of the book that user just clicked
        ISBN:ISBN
      }
    });
  }

  render() {
    return (
      <div className="Dashboard">
        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container mt-5">
          {/* Search */}
          <div className="search">
          <div className="img" id="logo">
            <img src={Logo} className="logo-img" id="img"/>
          </div>
            <div className="input-group mb-5" id="searchbar">
              <input
                id="searchbar"
                type="text"
                className="form-control"
                placeholder="Enter title, author, publisher,..."
                aria-describedby="button-addon2"
                onChange={(e) => this.handleChange(e)}
              />
              <div className="input-group-append">
                <button
                  className="btn bg-light text-black"
                  type="button"
                  id="button-addon2"
                  onClick={this.submitBook}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          <br></br>
          {/* Left column */}
          <div className="list-wrap">
            <div className="list pr-1">
              <div className="list-box px-3 pt-3" id= "dash">
                <h5 className="list-title mb-3">≡ Top 10 Ratings Books</h5>

                {this.state.books.map((element, index) => {
                  return (
                    <div className="list-row pt-2" key={index}>
                      <div className="list-col cover-col">
                        <img className="cover" src={element.image_url_l} onClick={()=>this.goToSubpage(element.ISBN)}/>
                      </div>
                      <div className="list-col content-col">
                        <h6>{element.title}</h6>
                        <p className="text-black-50">{element.author}</p>
                      </div>
                      <div className="list-col rating-col">
                        <img src={StarIcon} />
                        <h6>{element.rating}</h6>
                      </div>
                      
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right column */}
            <div className="list pl-1">
              <div className="list-box px-3 pt-3" id= "dash">
                <h5 className="list-title mb-3">≡ Best Books of the Decade</h5>

                {this.state.bookDecade.map((element, index) => {
                  return (
                    <div className="list-row pt-2" key={index}>
                      <div className="list-col cover-col">
                        <img className="cover" src={element.image_url_l} onClick={()=>this.goToSubpage(element.ISBN)}/>
                      </div>
                      <div className="list-col content-col">
                       <p className="text-black-50">{element.decade}</p>
                      </div>
                      <div className="list-col content-col">
                        <h6>{element.title}</h6>
                        <p className="text-black-50">{element.author}</p>
                      </div>
                      <div className="list-col rating-col">
                        <img src={StarIcon} />
                        <h6>{element.rating}</h6>
                      </div>
                    </div>
                  );
                })}
                </div>                       
              </div>
            </div>
          </div>
          <div className="footer mt-5"></div>
        </div>
    );
  }
}
export default withRouter(Dashboard);
