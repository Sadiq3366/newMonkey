import React, {useEffect, useState} from 'react';
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
   const firstbiglatter = (strings)=>{
       return  strings.charAt(0).toUpperCase() + strings.slice(1);
    }
    const [artical, setArtical] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalresult, setTotalresult] = useState(0)
    //document.title = `${firstbiglatter(this.props.Category)} - NewsMonkey`;

    useEffect(() => {
        updatenews();
    }, []);

    const updatenews = async ()=>{
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.Category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsData = await data.json();
        props.setProgress(50);
        setArtical(parsData.articles);
        setTotalresult(parsData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    const handleprevClick = async() =>{
        setPage(page - 1);
        updatenews();
    }
   const handleNextClick = async () =>{
        setPage(page + 1);
        updatenews();
    }
   const fetchmoredata = async ()=>{
        props.setProgress(10);
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.Category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(30);
        let data = await fetch(url);
        let parsData = await data.json();
        props.setProgress(50);
       setArtical(artical.concat(parsData.articles));
       setTotalresult(parsData.totalResults);
       setLoading(false);

        props.setProgress(100);
    }
    return (
        <div>
            {/*{ this.state.loading && <Spinner/> }*/}
            <h1 className="text-center">NewsMonkey - Top {firstbiglatter(props.Category)} Headlines</h1>
            <InfiniteScroll
                next={fetchmoredata}
                hasMore={artical.length!== totalresult}
                dataLength={artical.length}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {artical.map((element) => {
                            return <div className="col-md-4">
                                <NewsItem key={element.url} title={element.title ? element.title : ""}
                                          description={element.description ? element.description : ""}
                                          imageUrl={element.urlToImage ? element.urlToImage : "https://www.hindustantimes.com/ht-img/img/2024/05/31/550x309/PTI05-31-2024-000005B-0_1717121635284_1717121670216.jpg"}
                                          newsUrl={element.url ? element.url : ""} author={element.author} date={element.publishedAt} source={element.source.name}/>
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
            {/*<div className="container d-flex justify-content-between">*/}
            {/*    <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprevClick}> &larr; Previous</button>*/}
            {/*    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/9)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>*/}
            {/*</div>*/}
        </div>
    );
}

News.defaultProps={
    country : 'in',
    Category:'general',
    pageSize: 6
}
News.propTypes = {
    country: PropTypes.string,
    Category: PropTypes.string,
    pageSize: PropTypes.number
}

export default News;
