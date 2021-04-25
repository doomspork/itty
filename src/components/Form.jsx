import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { url: '', invalid: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { value } = event;
    const invalid = /(?<!https?):\/\//.test(value);
    this.setState({ url: value, invalid });
  }

  handleSubmit(event) {
    const { url } = this.state;
    const { onSuccess } = this.props;

    let finalUrl;

    if (/^https?:\/\//.test(url)) {
      finalUrl = url;
    } else {
      finalUrl = `http://${url}`;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ finalUrl }),
    };

    fetch(`${process.env.REACT_APP_API_HOST}/api/urls`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        onSuccess(data.slug);
      });

    event.preventDefault();
  }

  submitEnabled() {
    const { url, invalid } = this.state;

    return url !== '' && !invalid;
  }

  errorMessage() {
    const { invalid } = this.state;
    if (invalid) {
      return (
        <p className="mt-2 text-lg font-extrabold text-yellow-600">
          Only HTTP/HTTPS URLs are supported at this time.
        </p>
      );
    }

    return '';
  }

  render() {
    const { url } = this.state;

    return (
      <div className="relative">
        <div className="sm:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Short URLs. Big Results.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-200">
            Never before has it been so easy to create short urls.
            By combining newly declassified military technology with the latest
            developments in blockchain technology we&apos;re able to deliver
            revolutionary URL shortening capables never previously imagined.
          </p>
        </div>
        <form onSubmit={this.handleSubmit} className="mt-12 sm:mx-auto sm:max-w-full sm:flex">
          <div className="flex-1 min-w-0">
            <input
              id="url"
              type="text"
              className="block w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 border border-transparent rounded-md shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue"
              placeholder="https://example.com/averylongurlthatgoesnowherespecialbutisavalidurl"
              value={url}
              onChange={this.handleChange}
            />
            {this.errorMessage()}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-3">
            <input
              type="submit"
              value="Shorten!"
              className="block w-full px-5 py-3 font-bold text-black bg-white border border-transparent shadow text-large rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-blue sm:px-10"
            />
          </div>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};
