import blueGrey from 'material-ui/colors/blueGrey';
import CssBaseline from 'material-ui/CssBaseline';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from '../containers/Home';
import Zone from '../containers/Zone';
import * as locales from '../locales';
import Header from './Header';
import NoMatch from './NoMatch';

const compareLocations = (...locations) => {
  const { length: len } = locations;
  for (let i = 1; i < len; i += 1) {
    const locationA = locations[i - 1];
    const locationB = locations[i];
    if (
      locationA.pathname !== locationB.pathname ||
      locationA.search !== locationB.search
    ) {
      return false;
    }
  }
  return true;
};

export const styles = {
  footer: {
    backgroundColor: blueGrey[100],
    margin: '75px 0 0',
    padding: '40px 10px 30px',
    '& a': {
      color: blueGrey[600],
      textDecoration: 'none',
      '&:hover': {
        color: blueGrey[400],
      },
    },
  },
};

@injectIntl
@withRouter
@withStyles(styles)
export default class App extends Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    intl: intlShape.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string,
    }).isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !compareLocations(this.props.location, nextProps.location);
  }

  componentDidUpdate(prevProps) {
    if (!compareLocations(prevProps.location, this.props.location)) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { classes, intl, location } = this.props;

    return (
      <Fragment>
        <Helmet defaultTitle="Eorzea Weather" htmlAttributes={{ lang: intl.locale }} titleTemplate="%s - Eorzea Weather">
          <meta charSet="UTF-8" />
          <meta content="initial-scale=1,width=device-width" name="viewport" />
          <link href="/favicon.ico" rel="icon" />
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
          <link href={location.pathname} hrefLang="x-default" rel="alternate" />
          {Object.keys(locales).filter(v => v !== intl.locale).map(v => (
            <link href={`${location.pathname}?locale=${v}`} hrefLang={v} key={`lang-${v}`} rel="alternate" />
          ))}
        </Helmet>
        <CssBaseline />
        <Header />
        <Switch>
          <Route component={Home} exact path="/" />
          <Route component={Zone} path="/zones/:zoneId" />
          <Route component={NoMatch} />
        </Switch>
        <footer className={classes.footer}>
          <Typography align="center" variant="body1">Copyright &copy; 2018 <a href="mailto:flowercartelet@gmail.com">Lily Cartelet</a></Typography>
        </footer>
      </Fragment>
    );
  }
}
