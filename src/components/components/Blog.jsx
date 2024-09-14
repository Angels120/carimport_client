import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { getblogs,getblog } from '../../store/actions/commonActions';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {Helmet} from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import TextTruncate from 'react-text-truncate'
import { apiBaseUrl } from '../../store/helpers/common';
class Blog extends Component {
    constructor(props){
        super(props);
        this.state = {
            blogs:'',
            blogspage:false,
            blog:'',
            blogpage:false
        }
    }
    componentDidMount(){
        var slug = this.props.match.params.slug;
        if(slug){
            this.props.dispatch(getblog(slug));
            this.setState({blogpage:true})
        }else{
            this.props.dispatch(getblogs());
            this.setState({blogspage:true})
        }
    }
    componentWillReceiveProps(nextProps){
        // console.log('bloggggggggs'+nextProps.blogs)
        this.setState({
            blogs:nextProps.blogs,
            blog:nextProps.blog
        })
        // alert(nextProps.blog)
    }
    render() {
        const {blogs,blogpage,blogspage,blog} = this.state;
        // console.log(JSON.stringify(blog))
        return (
            <> 
                <Helmet>
                    <title>Blog &#8211; UK Car Imports</title>
                    <meta name="description" content="Read our useful posts - How to buy cheeper used car✅ How Brexit will affect the Irish car market✅ - UK Car Imports" />
                </Helmet>
                <main id="main" className="site-main blog_page" role="main">
    
                {
                    blogpage
                    ?
                        this.props.blogloading
                        ?
                            <div className="alltourticksloader">
                                <img className="loader_img" src="/assets/images/straight-loader.gif" />
                            </div>
                        :
                            <div className="entry-content blog-post">
                            <div className="w3-container w3-round w3-light-gray w3-border w3-medium w3-padding-large">
                                
                                {
                                    blog
                                    ?
                                        <>
                                            <div className="w3-container w3-row w3-padding-top single">
                                            <h2 className="post-title w3-text-black">{blog.blog_heading}</h2>
                                            </div>
                                            <div className="w3-container w3-row w3-padding-top single">
                                                {ReactHtmlParser(blog.blog_description)}
                                            </div>
                                            {blog.blog_image && (
                                                <div className="w3-container w3-row w3-padding-top single">
                                                    <img 
                                                        src={`${apiBaseUrl}/blogimages/${blog.blog_image}`} 
                                                        style={{ height: "70px", paddingRight: "10px" }} 
                                                    /> 
                                                </div>
                                            )}
                                            <div className="w3-container w3-row w3-padding-large">
                                                <div className="w3-col s7 m8 l9">&nbsp;</div>
                                                <div className="w3-col s5 m4 l3 w3-center w3-padding-top text-right">
                                                    <div className="w3-container w3-row">
                                                        <i>
                                                            <time>{blog.blog_date}</time>
                                                        </i>
                                                    </div>
                                                    <div className="w3-container w3-row">
                                                        By <strong><span className="author">{blog.Author}</span></strong>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </>
                                    :   
                                        ''
                                }           
                                </div>
                        </div>
                    :
                        ''

                }
                {
                    blogspage
                    ?
                        this.props.blogsloading
                        ?
                            <div className="alltourticksloader">
                                <img className="loader_img" src="/assets/images/straight-loader.gif" />
                            </div>
                        :
                            <>
                            <h1 className="entry-title">Blog</h1>
                            {
                                blogs.length > 0
                                ?
                                    blogs.map((blog) => (
                                        <div className="w3-container w3-padding-0">
                                            <div className="w3-container w3-round w3-light-gray w3-border w3-padding-large w3-margin">

                                                <a href={encodeURI(`/blog/${blog.blog_url}`).replace(/[!'()*]/g, escape)} className="w3-row w3-center">

                                                    <h2 className="post-title w3-text-black">{blog.blog_heading}</h2>
                                                </a>
                                                <div className="blog-post w3-container w3-row w3-padding listing">
                                                    {ReactHtmlParser(blog.blog_description)}
                                                </div>
                                                {blog.blog_image && (
                                                    <div className="w3-container w3-row w3-padding-top single">
                                                        <div className="w3-container w3-row w3-padding-top single">
                                                            <img 
                                                            src={`${apiBaseUrl}/blogimages/${blog.blog_image}`} 
                                                            style={{ height: "70px", paddingRight: "10px" }} 
                                                            /> 
                                                        </div>
                                                    </div>
                                                )}
                                                
                                                <div className="w3-container w3-row w3-padding-large">
                                                    <div className="w3-col s6 m4 l3 w3-padding-top">
                                                    <div className="w3-container w3-row w3-padding-0">
                                                        <i>
                                                        <time>{blog.blog_date}</time>
                                                        </i>
                                                    </div>
                                                    <div className="w3-container w3-row">
                                                        By <strong><span className="author">{blog.Author}</span></strong>
                                                    </div>
                                                    </div>
                                                    <div className="w3-col s1 m5 l7">&nbsp;</div>
                                                    <div className="w3-col s5 m3 l2 w3-center w3-padding-top">
                                                    <a href={encodeURI(`/blog/${blog.blog_url}`).replace(/[!'()*]/g, escape)} className="w3-btn theme-color-secondary w3-round w3-ripple w3-right w3-padding-small">Read post</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    ))
                                :
                                    ''
                            }
                        </>
                        
                    :
                        ""
                }
                </main>
    		</>
        )
    }
}

// export default withRouter(Blog);
const mapStateToProps = (state) => ({
    blogs: state.common.blogs,
    blogsloading: state.common.blogsloading,
    blog: state.common.blog,
    blogloading: state.common.blogloading,
})
export default connect(mapStateToProps)(Blog);
