import algoliasearch from 'algoliasearch';
import { Snippet } from 'react-instantsearch-dom';
import { InstantSearch, SearchBox, Hits, Highlight } from 'react-instantsearch-dom';
import constants from '../styles/constants'

const searchClient = algoliasearch('XM133ZTQ4M', '492228cc413ae93a87eee5940daa2c2d');
const Hit = ({ hit }) => (
  <>
    <a href={`http://datapracticum.gatsbyjs.io${hit.slug}`} style={{ color: constants.blackMain, textDecoration: 'none' }}>
      <h3>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h3>
      <p>
        <Snippet attribute='excerpt' hit={hit} tagName='mark' />
      </p>
    </a >
    <br />
  </>
);
const App = () => (
  <InstantSearch searchClient={searchClient} indexName="PAGES_INDEX">
    <SearchBox />
    <Hits hitComponent={Hit} />

  </InstantSearch>
);

export default App
