import React from 'react';
import { useRouteMatch } from 'react-router-dom';

function handleResponse(response) {
  if (response.status !== 200) {
    throw Error(response.statusText);
  }
  return response.json();
}

function fetchAndRedirect(slug) {
  const requestOptions = { headers: { 'Content-Type': 'application/json' } };

  fetch(`${process.env.REACT_APP_API_HOST}/api/urls/${slug}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      window.location.href = data.url;
    });

  return 'The URL you\'re looking for cannot be found';
}

export default function Redirect() {
  const { params } = useRouteMatch('/:slug');

  return (
    <div className="sm:text-center">
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
        Short URLs. Big Results.
      </h2>
      <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-200">
        {fetchAndRedirect(params.slug)}
      </p>
    </div>
  );
}
