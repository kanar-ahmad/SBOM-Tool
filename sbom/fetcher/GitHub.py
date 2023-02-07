import requests
import base64
import json
from github import Github
from bs4 import BeautifulSoup


class GitHub:
    def __init__(self, repository,
                 login_or_token=None):
        self.repo = repository
        self.login_or_token = login_or_token

    def traverse_repo(self, sub_directory=None) -> list:
        result = []

        if not sub_directory:
            url = f"{self.repo}/contents"
        else:
            url = sub_directory

        print(url)
        response = requests.get(url)

        data = json.loads(response.text)

        for item in data:
            print(item)
            print("NAME AND TYPE: ", item["name"], item["type"])
            if item.get('type') == "file":
                file_url = item["url"]
                file_response = requests.get(file_url)
                file_data = json.loads(file_response.text)
                file_content = file_data["content"]

                # Decode the file content from base64
                if item.get('encoding') == 'base64':
                    file_content = file_content.encode('utf-8')
                    file_content = base64.b64decode(file_content)
                    file_content = file_content.decode('utf-8')

                    result.append(file_content)
            elif item.get('type') == "dir":
                self.traverse_repo(sub_directory=item.get('url'))

        return result

    def traverse_repo2(self, sub_directory=False):
        result = []

        if not sub_directory:
            url = f"https://github.com{self.repo}"
        else:
            url = sub_directory

        print(url)
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        for link in soup.find_all('a'):
            print(link.get('href'))
        exit(0)

        #for item in data:
        #    if item.get('type') == "file":
                #result.append(file_content)
            #elif item.get('type') == "dir":
            #    self.traverse_repo(sub_directory=item.get('url'))

        return result
