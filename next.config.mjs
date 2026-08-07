const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

/**
 * GitHub Pages liefert Projekt-Seiten unter /<repo-name>/ aus
 * (https://<user>.github.io/<repo-name>/), deshalb bekommt der Build in der
 * Action automatisch den passenden basePath. Lokale Builds und ein späterer
 * Wechsel auf eine eigene Domain (dann NEXT_BASE_PATH="" setzen) bleiben
 * unbeeinflusst.
 */
const basePath =
  process.env.NEXT_BASE_PATH ?? (isGithubActions && repoName ? `/${repoName}` : "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
};

export default nextConfig;
