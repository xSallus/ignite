export type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
};

export type Repositories = Repository[];

export type RepoCardProps = {
  repository: Repository;
};
