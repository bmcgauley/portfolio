# GitHub Integration Ideas for Portfolio

## Features to Implement

1. **GitHub Contribution Graph**
   - Display the GitHub contribution graph ("green squares") to show coding activity
   - Use GitHub API to fetch contribution data
   - Implement a visual similar to GitHub's activity heatmap

2. **Repository Sync**
   - Automatically fetch and display public GitHub repositories as projects
   - Pull repository data like:
     - Name
     - Description
     - Languages used
     - Star count
     - Last activity date
   - Allow filtering repositories that should be excluded

3. **Project Folder Structure**
   - Ensure each project (including auto-synced GitHub projects) has a proper folder under `/public/images/projects/{project-folder-name}`
   - Auto-create these folders when a new project is added either manually or via GitHub sync
   - Provide README files in each directory explaining how to add images

## Implementation Notes

### GitHub API Integration

```typescript
// Example code for fetching GitHub repositories
async function fetchGitHubRepositories(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
  return await response.json();
}

// Example code for fetching contribution data
async function fetchGitHubContributions(username: string) {
  // Note: This requires either GitHub GraphQL API or alternative solutions
  // as GitHub REST API doesn't provide the contribution graph data directly
}
```

### Repository to Project Mapping

```typescript
function convertRepoToProject(repo): Project {
  return {
    id: `github-${repo.id}`,
    title: repo.name,
    description: repo.description || 'A GitHub project',
    imageUrl: '/images/profile/torch_high+res.fw.webp', // Default placeholder
    folderName: repo.name.toLowerCase().replace(/\s+/g, '-'),
    tags: repo.topics || [],
    demoUrl: repo.homepage || '',
    githubUrl: repo.html_url,
    featured: false, // By default
    lastUpdated: repo.updated_at
  };
}
```

## Resources

- [GitHub REST API Documentation](https://docs.github.com/en/rest)
- [GitHub GraphQL API Documentation](https://docs.github.com/en/graphql)
- React libraries for GitHub contribution graphs:
  - [react-github-calendar](https://www.npmjs.com/package/react-github-calendar)
  - [github-calendar](https://github.com/IonicaBizau/github-calendar)
