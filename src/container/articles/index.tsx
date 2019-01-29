import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import API from '../../shared/api';
import { addArticle } from '../../store/actions';
import Nav from '../nav';
import './article.css';
import ArticlePage from './article.page';

interface IArticles {
  articles: any[];
}

interface IDispatchFromProps {
  articleActionDispatch: (payload: IArticles) => void;
}

interface IArticlePropTypes extends IDispatchFromProps {}

interface IStateTypes {
  articles: any[];
}

class Article extends Component<IArticlePropTypes, IStateTypes> {
  public state = {
    articles: [],
  };

  public componentDidMount = async () => {
    await this.getArticles();
  };

  public getArticles = async () => {
    try {
      const response = await API.get('?results=20&format=json&inc=name,gender,location,email,phone,cell,dob,id,picture');
      const payload: IArticles = { articles: response.data.results }; // CREATE PAYLOAD TO SEND
      this.props.articleActionDispatch(payload); // STORE ALL ARTICLES IN STORE
      this.setState({ articles: response.data.results });
      return;
    } catch (error) {
      console.log('article error ', error);
    }
  };

  public render() {
    return (
      <>
        <Nav />
        <ArticlePage articles={this.state.articles} />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch): IDispatchFromProps => ({
  articleActionDispatch: (payload: IArticles) => dispatch(addArticle(payload)), // THIS FUNCTION WILL BE AVAILABLE IN PROPS
});

export default connect<null, IDispatchFromProps, void>(
  null,
  mapDispatchToProps,
)(Article);
