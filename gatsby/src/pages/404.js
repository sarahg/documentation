import React from 'react';
import { Link, graphql } from 'gatsby';
import SearchResults from '../components/searchResults';
import Helmet from "react-helmet"
import Layout from '../layout/layout';
import SEO from "../layout/seo"
import SVG404 from  '../../../source/images/404_dark.svg'

class NotFoundPage extends React.Component {
  render() {
    const { pathname } = this.props.location
    const badTitle = pathname.replace(/\//g, '')
    const searchPath = pathname.replace(/\//g, ' ').replace(/-/g, ' ')
    window.location = `#addsearch=${searchPath}`

    return (
      <Layout>
        <SEO
          title="404"
          description="Zoinks! You've hit a URl that doesn't exist. Let's try a search:"
        />
        <div style={{ marginTop: '-20px' }} className="container">
          <div className=" doc-content-well">
            <div className="mb-70">
              <img className="notfound" src={SVG404} />
              <h2>Sorry, there's no page at <code>{badTitle}</code>.</h2>
              <h3>You can try one of the links below, or go <Link to="/"> back to all docs</Link>?</h3>

              <div className="addsearch-container">
                  <Helmet>
                  <script
                  dangerouslySetInnerHTML={{
                      __html: `
                          function parseParamsFromUrl() {
                          var queryString = window.location.replace(\//g, '');
                              queryString = queryString.substring(11);
                              queryString = queryString.split("+").join(" ");
                          return queryString;
                          }
                          var urlParams = parseParamsFromUrl();
                          document.getElementById('piodocsearch').setAttribute('value', urlParams);
                      `
                  }}
                  />

                  </Helmet>

                  <div id="addsearch-results"></div>

                  <script
                  dangerouslySetInnerHTML={{
                      __html: `
                      window.addsearch_settings = {
                          display_url: true,
                          display_resultscount: true,
                          display_date: true,
                          display_sortby: true,
                          display_category: true,
                          automatic_match_all_query: true
                      }
                      `
                  }}
                  />
              </div>


            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default NotFoundPage

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
