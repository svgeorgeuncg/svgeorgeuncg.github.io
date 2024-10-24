/** 
 * Fetch GitHub Repositories for a given username 
 * @param {string} username - GitHub username to fetch repositories for 
 */
async function fetchRepositories(username) {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);
    const repos = await response.json();
    displayRepos(repos);
  }
  
  /**
   * Display Repositories in the Gallery
   * @param {Array} repos - Array of repository objects
   */
  function displayRepos(repos) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';  // Clear previous content
    
    repos.forEach(async repo => {
      const repoCard = document.createElement('div');
      repoCard.classList.add('repo-card');
  
      // Repository Name
      const repoLink = document.createElement('a');
      repoLink.href = repo.html_url;
      repoLink.textContent = repo.name;
      repoCard.appendChild(repoLink);
  
      // Repository Description
      const description = document.createElement('p');
      description.textContent = repo.description || 'No description available.';
      repoCard.appendChild(description);
  
      // Additional Details
      const details = document.createElement('div');
      details.classList.add('repo-details');
      details.innerHTML = `
        <span>Created: ${new Date(repo.created_at).toLocaleDateString()}</span>
        <span>Updated: ${new Date(repo.updated_at).toLocaleDateString()}</span>
        <span>Watchers: ${repo.watchers_count}</span>
      `;
      
      // Fetch commits and languages for each repository
      const commitsResponse = await fetch(repo.commits_url.replace('{/sha}', ''));
      const commits = await commitsResponse.json();
      details.innerHTML += `<span>Commits: ${commits.length}</span>`;
      
      const languagesResponse = await fetch(repo.languages_url);
      const languages = await languagesResponse.json();
      const languagesList = Object.keys(languages).join(', ');
      details.innerHTML += `<span>Languages: ${languagesList || 'None'}</span>`;
      
      repoCard.appendChild(details);
      gallery.appendChild(repoCard);
    });
  }
  
  // Event Listener for Search Button
  document.getElementById('search-btn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    fetchRepositories(username);
  });
  
  // Default to load your own GitHub profile
  fetchRepositories('your-github-username');
  