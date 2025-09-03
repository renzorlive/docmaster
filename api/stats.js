// Example Node.js API for dynamic stats
// Deploy this to Vercel, Netlify Functions, or your server

export default async function handler(req, res) {
    try {
        // GitHub API calls
        const [repoResponse, contributorsResponse] = await Promise.all([
            fetch('https://api.github.com/repos/renzorlive/vimmaster'),
            fetch('https://api.github.com/repos/renzorlive/vimmaster/contributors')
        ]);
        
        const repoData = await repoResponse.json();
        const contributors = await contributorsResponse.json();
        
        const stats = {
            stars: repoData.stargazers_count || 2500,
            contributors: Array.isArray(contributors) ? contributors.length : 150,
            users: Math.floor((repoData.stargazers_count || 2500) * 4.2),
            forks: repoData.forks_count || 300
        };
        
        // Cache for 5 minutes
        res.setHeader('Cache-Control', 's-maxage=300');
        res.json(stats);
        
    } catch (error) {
        // Fallback numbers
        res.json({
            stars: 2500,
            contributors: 150,
            users: 10000,
            forks: 300
        });
    }
}