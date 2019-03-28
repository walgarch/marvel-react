import React from "react";

const ComicDetail = ({ comic }) => {
  if (!comic) {
    return <div>Loading...</div>;
  }

  const comicId = comic.digitalId;
  const url = comic.urls[0].url;

  return (
    <div className="comic-detail col-md-8">
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={url} />
      </div>
      <div className="details">
        <div>{comic.title}</div>
        <div>{comic.description}</div>
      </div>
    </div>
  );
};

export default ComicDetail;
