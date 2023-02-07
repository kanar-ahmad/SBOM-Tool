from typing import List


class Project:
    """
    Model class that represents a project

    """
    def __init__(self, id: int = None, name: str = None, projects: List['Project'] = None):
        self.id = id
        self.name = name
        self.projects = projects or []


class Organization:
    """
    Model class that represents an organization entity

    """
    def __init__(self, id: int = None, name: str = None, projects: List[Project] = None):
        self.id = id
        self.name = name
        self.projects = projects or []

    @property
    def get_id(self) -> int:
        return self.id

    @property
    def name(self) -> str:
        return self.name

    @name.setter
    def name(self, name: str) -> None:
        self.name = name

    @property
    def get_projects(self) -> List[Project]:
        return self.projects

    @property
    def add_project(self, project: Project) -> None:
        self.projects.append(project)

    @property
    def delete_project(self, id: int) -> None:
        ...

    def __repr__(self) -> str:
        return f'<Organization id={self.id} name={self.name}>'


