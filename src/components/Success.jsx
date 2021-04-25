import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipboardCopyIcon, CheckIcon } from '@heroicons/react/solid';

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = { copied: false };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ copied: true });
    setTimeout(() => this.setState({ copied: false }), 1000);
  }

  buttonIcon() {
    const { copied } = this.state;

    if (copied) {
      return <CheckIcon className="w-5 h-5" aria-hidden="true" />;
    }

    return <ClipboardCopyIcon className="w-5 h-5" aria-hidden="true" />;
  }

  copyedText() {
    const { shortUrl } = this.props;
    return shortUrl;
  }

  render() {
    const { shortUrl } = this.props;

    return (
      <div className="relative">
        <div className="sm:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Short URLs. Big Results.
          </h2>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-200">
            Together we&apos;ve done it! The blocks have been chained. The URLs tinyfied.
          </p>
        </div>
        <div className="mt-12 sm:mx-auto sm:max-w-full sm:flex">
          <div className="flex justify-center flex-1 min-w-0">
            <div>
              <a href={shortUrl} className="text-xl font-bold text-right text-white">{shortUrl}</a>
            </div>
            <div className="ml-6">
              <CopyToClipboard text={this.copyedText()}>
                <button
                  onClick={this.handleClick}
                  type="button"
                  className="flex items-center justify-center w-8 h-8 text-black bg-white rounded-full hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {this.buttonIcon()}
                </button>
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Success.propTypes = {
  shortUrl: PropTypes.string.isRequired,
};
