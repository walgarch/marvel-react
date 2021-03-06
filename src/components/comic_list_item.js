import React from "react";

const ComicListItem = ({ comic, onComicSelect }) => {
  const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;

  return (
    <li onClick={() => onComicSelect(comic)} className="list-group-item">
      <div className="comic-list media">
        <div className="media-left">
          <img className="media-object" src={imageUrl} />
        </div>
        <div className="media-body">
          <h5 className="media-heading">{comic.title}</h5>
        </div>
      </div>
    </li>
  );
};

export default ComicListItem;
