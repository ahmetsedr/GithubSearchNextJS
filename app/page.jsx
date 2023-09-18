"use client"

import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [state, setState] = useState({
    repos: [],
    user: '',
    search: '',
    loading: false,
  });

  const handleSearch = async () => {
    const { user, search } = state;

    if (!user) {
      // Kullanıcı adı boşsa uyarı ver
      alert('Lütfen bir kullanıcı adı girin.');
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      let response;
      if (search) {
        // Repo adı belirtilmişse belirtilen repo adına benzeyen repoları getir
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const result = await response.json();
        const filteredRepos = result.filter((repo) =>
          repo.name.toLowerCase().includes(search.toLowerCase())
        );
        setState((prevState) => ({ ...prevState, repos: filteredRepos, loading: false }));
      } else {
        // Repo adı belirtilmemişse tüm repoları getir
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const result = await response.json();
        setState((prevState) => ({ ...prevState, repos: result, loading: false }));
      }
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const { repos, user, search, loading } = state;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <input
          type="text"
          name="user"
          value={user}
          onChange={handleInputChange}
          placeholder="GitHub Username"
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="search"
          value={search}
          onChange={handleInputChange}
          placeholder="Search Repository (Leave empty to show all)"
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </div>
      <div>
        {loading ? (
          <div className="text-2xl text-gray-600">Loading...</div>
        ) : repos.length ? (
          repos.map((repo) => (
            <Link
            key={repo.id}
            href={`https://github.com/${user}/${repo.name}`}
          >
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out m-7 text-center px-10">
              <h1 className="text-xl font-semibold mt-4 text-gray-800">{repo.name}</h1>
              <p className="text-sm text-gray-500">Language: {repo.language}</p>
              <p className="text-sm text-gray-500">Description: {repo.description}</p>
            </div>
          </Link>
          ))
        ) : (
          <div className="text-2xl text-gray-600">No repositories found.</div>
        )}
      </div>
    </main>
  );
}
