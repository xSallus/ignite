import { RepoCardProps } from "@types";

function RepoCard({ repository }: RepoCardProps) {
    const {name, description, url} = repository;

    return (
        <li>
            <p>{name}</p>
            <span>{description}</span>
            <a href={url}>Clique para acessar o repositorio</a>
        </li>
    );
}

export { RepoCard };
