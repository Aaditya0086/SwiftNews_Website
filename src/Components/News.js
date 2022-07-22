import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



const capitalizeFirstLetter= (string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const News =(props)=> {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title = `${capitalizeFirstLetter(props.category)} - SwiftNews`;



  // constructor(props) {
  //   super(props);
  //   //console.log("hello this is constructor");
    
  // }

  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    // console.log("parsedData");
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
    //eslint-disable-next-line
  }, []);
    
  

  // const handlePreviousClick = async()=>{
  //   // console.log("Prev");
  //   setPage(page + 1)
  //   updateNews();
  // }

  // const handleForwardClick = async()=>{
  //   setPage(page - 1)
  //   updateNews();

  // }

 
  const fetchMoreData= async() => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log("parsedData");
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };

    //console.log("render");
    return (
      <div>
          <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>
            SwiftNews - Top {capitalizeFirstLetter(props.category)}{" "}
            Headlines
          </h1>
          {loading && <Spinner/>}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
          >
            <div className="container">
            <div className="row">
              {articles.map((element) => {
                // console.log(element);
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 40) : ""}
                      description={element.description? element.description.slice(0, 85): ""}
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button disabled = {page<=1} className="btn btn-primary" onClick={handlePreviousClick}>&larr;Previous</button>
            <button disabled={(page + 1 > Math.ceil(totalResults/(props.pageSize)))} className="btn btn-primary" onClick={handleForwardClick}>Next&rarr;</button>
          </div> */}
      </div>
    );
  
}

export default News;



News.defaultProps = {
  country: "in",
  pageSize: 10,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};