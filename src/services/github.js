// GitHub API Service
// Fetches real repositories from GitHub profile

const GITHUB_USERNAME = 'HH2631';
const GITHUB_API_BASE = 'https://api.github.com';

let repositoriesCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getGitHubRepositories = async () => {
  // Check cache first
  if (repositoriesCache && cacheTimestamp && 
      Date.now() - cacheTimestamp < CACHE_DURATION) {
    return repositoriesCache;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const repositories = await response.json();
    
    // Filter out forked repositories and get only public ones
    const publicRepos = repositories.filter(repo => 
      !repo.fork && !repo.private && !repo.archived
    );
    
    // Transform to our project format
    const projects = publicRepos.map(repo => ({
      id: repo.id,
      Title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      Description: repo.description || `A ${repo.language || 'software'} project`,
      Img: "/Photo.png", // Default image, you can customize based on repo
      Link: repo.html_url,
      TechStack: repo.language ? [repo.language] : ['Code'],
      Features: [
        `⭐ ${repo.stargazers_count} stars`,
        `🍴 ${repo.forks_count} forks`,
        `📅 Updated ${new Date(repo.updated_at).toLocaleDateString()}`,
        repo.topics?.length > 0 ? `🏷️ Topics: ${repo.topics.join(', ')}` : null
      ].filter(Boolean),
      github_data: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        topics: repo.topics || [],
        size: repo.size,
        default_branch: repo.default_branch,
        has_issues: repo.has_issues,
        has_projects: repo.has_projects,
        has_wiki: repo.has_wiki
      }
    }));
    
    // Cache the results
    repositoriesCache = projects;
    cacheTimestamp = Date.now();
    
    return projects;
    
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    
    // Return empty array if API fails
    return [];
  }
};

// Get user profile information
export const getGitHubProfile = async () => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};

// Get repository details with more info
export const getRepositoryDetails = async (repoName) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching repository ${repoName}:`, error);
    return null;
  }
};

// Get repository languages
export const getRepositoryLanguages = async (repoName) => {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoName}/languages`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching languages for ${repoName}:`, error);
    return {};
  }
};

// Helper function to get programming language icon
export const getLanguageIcon = (language) => {
  const icons = {
    'JavaScript': 'javascript.svg',
    'TypeScript': 'typescript.svg',
    'React': 'reactjs.svg',
    'HTML': 'html.svg',
    'CSS': 'css.svg',
    'Python': 'python.svg',
    'Java': 'java.svg',
    'C++': 'cpp.svg',
    'C': 'c.svg',
    'Go': 'go.svg',
    'Rust': 'rust.svg',
    'PHP': 'php.svg',
    'Ruby': 'ruby.svg',
    'Swift': 'swift.svg',
    'Kotlin': 'kotlin.svg',
    'Dart': 'dart.svg',
    'Shell': 'shell.svg',
    'Dockerfile': 'docker.svg',
    'Vue': 'vue.svg',
    'Svelte': 'svelte.svg'
  };
  
  return icons[language] || 'code.svg';
};

export { GITHUB_USERNAME }; 