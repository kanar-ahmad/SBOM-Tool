

class Source:
    """
    Model class that represents a source for the components.

    """
    def __init__(self, name: str = None, source_type: str = None, extension: str = None, path: str = None, content: str = None):
        self.name = name
        self.source_type = source_type
        self.extension = extension
        self.path = path
        self.content = content

    @property
    def get_name(self) -> str:
        return self.name

    @property
    def get_source_type(self) -> str:
        return self.source_type

    @property
    def get_extension(self) -> str:
        return self.extension

    @property
    def get_path(self) -> str:
        return self.path

    @property
    def get_content(self) -> str:
        return self.content

    def __repr__(self) -> str:
        return f'<Commit name={self.name}, source type={self.source_type}, extension={self.extension}, path={self.path}>'


