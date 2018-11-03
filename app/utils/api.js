export const api = {
  getRepos(username: string) {
    const formattedUsername = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${formattedUsername} `;
    return fetch(url).then(res => res.json());
  },
  getBio(username: string) {
    const formattedUsername = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${formattedUsername}/repos`;
    return fetch(url).then(res => res.json());
  }
};
