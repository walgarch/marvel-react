import React from "react";
import ComicListItem from "./comic_list_item";

const ComicList = props => {
  const comicItems = props.comics.map(comic => {
    return (
      <ComicListItem
        onComicSelect={props.onComicSelect}
        key={comic.digitalId}
        comic={comic}
      />
    );
  });

  return <ul className="col-md-4 list-group">{comicItems}</ul>;
};

export default ComicList;
