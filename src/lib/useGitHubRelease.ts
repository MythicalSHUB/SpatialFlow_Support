import { useState, useEffect } from 'react';
import { SPATIALFLOW_CONFIG } from '../data/projectDetails';

export interface ReleaseInfo {
  version: string;
  releaseUrl: string;
  name: string;
  isLatest: boolean;
}

export function useGitHubRelease(): ReleaseInfo {
  const [release, setRelease] = useState<ReleaseInfo>({
    version: SPATIALFLOW_CONFIG.version,
    releaseUrl: SPATIALFLOW_CONFIG.links.githubReleases,
    name: 'Gigachad Update',
    isLatest: true,
  });

  useEffect(() => {
    // Check session cache to avoid hitting GitHub API rate limit
    const cached = sessionStorage.getItem('sf_github_release');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed?.version) {
          setRelease(parsed);
          return;
        }
      } catch (_) {}
    }

    const controller = new AbortController();
    fetch('https://api.github.com/repos/MythicalShub/SpatialFlow/releases/latest', {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github.v3+json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Release fetch failed');
        return res.json();
      })
      .then((data) => {
        if (data?.tag_name) {
          const info: ReleaseInfo = {
            version: data.tag_name,
            releaseUrl: data.html_url || SPATIALFLOW_CONFIG.links.githubReleases,
            name: data.name || '',
            isLatest: true,
          };
          setRelease(info);
          sessionStorage.setItem('sf_github_release', JSON.stringify(info));
        }
      })
      .catch(() => {
        // Fallback gracefully to SPATIALFLOW_CONFIG.version
      });

    return () => controller.abort();
  }, []);

  return release;
}
