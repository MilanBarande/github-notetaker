// @flow
/* eslint-disable */
const formatUsername = (username: string) => username.toLowerCase().trim();
export const api = {
  getRepos(username: string) {
    const formattedUsername = formatUsername(username);
    const url = `https://api.github.com/users/${formattedUsername}/repos`;
    return fetch(url).then(res => res.json());
  },
  getBio(username: string) {
    const formattedUsername = formatUsername(username);
    const url = `https://api.github.com/users/${formattedUsername}`;
    return fetch(url).then(res => res.json());
  },
  getNotes(username: string) {
    const formattedUsername = formatUsername(username);
    const url = `https://github-saver-a283d.firebaseio.com/${formattedUsername}.json`;
    return fetch(url).then(res => res.json());
  },
  addNote(username: string, note: string) {
    const formattedUsername = formatUsername(username);
    const url = `https://github-saver-a283d.firebaseio.com/${formattedUsername}.json`;
    // .json lets you use the REST API of firebase
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then(res => res.json());
  }
};
