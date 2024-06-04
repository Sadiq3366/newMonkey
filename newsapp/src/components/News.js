import React, {Component, useState} from 'react';
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

class News extends Component {
    static defaultProps={
        country : 'in',
        Category:'general',
        pageSize: 6
    }
    static propTypes = {
        country: PropTypes.string,
        Category: PropTypes.string,
        pageSize: PropTypes.number
    }

    firstbiglatter = (strings)=>{
       return  strings.charAt(0).toUpperCase() + strings.slice(1);
    }
    constructor(props) {
        super(props);
        this.state ={
            articles : [],
            loading : false,
            page : 1,
            totalResults: 0
        }
        document.title = `${this.firstbiglatter(this.props.Category)} - NewsMonkey`;
    }

    async componentDidMount() {
        this.updatenews();
    }

    async updatenews (){
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.Category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: parsData.articles,
            totalResults:parsData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    handleprevClick = async() =>{
        this.setState({page: this.state.page - 1});
        this.updatenews();
    }
    handleNextClick = async () =>{
        this.setState({page: this.state.page + 1});
        this.updatenews();
    }
    fetchmoredata = async ()=>{
        this.props.setProgress(10);
        this.setState({page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.Category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({loading: true});
        this.props.setProgress(30);
        let data = await fetch(url);
        let parsData = await data.json();
        this.props.setProgress(50);
        this.setState({
            articles: this.state.articles.concat(parsData.articles),
            totalResults:parsData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }
    render() {
        return (
            <div>
                {/*{ this.state.loading && <Spinner/> }*/}
                <h1 className="text-center">NewsMonkey - Top {this.firstbiglatter(this.props.Category)} Headlines</h1>
                <InfiniteScroll
                    next={this.fetchmoredata}
                    hasMore={this.state.articles.length!== this.state.totalResults}
                    dataLength={this.state.articles.length}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
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
}

export default News;
