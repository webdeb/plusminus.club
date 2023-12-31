import gitUrlParse from "git-url-parse";

export const getGitIssueUrl = ({
  repository = "https://github.com/webdeb/plusminus.club",
  title,
  labels,
}) => {
  const repo = gitUrlParse(repository);
  if (!repo) throw new Error("Invalid `docsRepositoryBase` URL!");

  if (repo.resource.includes("gitlab")) {
    return `${repo.protocol}://${repo.resource}/${repo.owner}/${
      repo.name
    }/-/issues/new?issue[title]=${encodeURIComponent(title)}`;
  }
  if (repo.resource.includes("github")) {
    return `${repo.protocol}://${repo.resource}/${repo.owner}/${
      repo.name
    }/issues/new?title=${encodeURIComponent(title)}&labels=${labels || ""}`;
  }
  return "#";
};
