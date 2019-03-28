import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import SearchBar from "./components/search_bar";
import ComicList from "./components/comic_list";
import ComicDetail from "./components/comic_detail";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comics: [],
      selectedComic: null
    };

    this.comicSearch("hulk");
  }

  comicSearch(term) {
    fetch(`http://localhost:3001/api/character?name=${term}`)
      .then(response => {
        return response.json();
      })
      .then(results => {
        this.setState({
          comics: results.data.results,
          selectedComic: results.data.results[0],
          generalInfo: results
        });
      });
  }

  render() {
    const comicSearch = _.debounce(term => {
      this.comicSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={comicSearch} />
        <ComicDetail comic={this.state.selectedComic} />
        <ComicList
          onComicSelect={selectedComic => this.setState({ selectedComic })}
          comics={this.state.comics}
        />
      </div>
    );
  }
}

export default App;
