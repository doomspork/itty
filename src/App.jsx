import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Form from './components/Form';
import Success from './components/Success';
import Redirect from './components/Redirect';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { shortUrl: null };

    this.onSuccess = this.onSuccess.bind(this);
  }

  onSuccess(slug) {
    this.setState({ shortUrl: `${process.env.REACT_APP_DOMAIN}/${slug}` });
  }

  render() {
    const { shortUrl } = this.state;
    let component;

    if (shortUrl == null) {
      component = <Form onSuccess={this.onSuccess} />;
    } else {
      component = <Success shortUrl={shortUrl} />;
    }

    return (
      <div className="py-16 bg-white sm:py-24">
        <div className="relative sm:py-16">
          <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative px-6 py-10 overflow-hidden shadow-xl bg-brand-blue rounded-2xl sm:px-12 sm:py-20">
              <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                <svg
                  className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    className="text-brand-blue text-opacity-40"
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    className="text-brand-blue text-opacity-40"
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/">
                    {component}
                  </Route>
                  <Route path="/:slug" component={Redirect} />
                </Switch>
              </BrowserRouter>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
