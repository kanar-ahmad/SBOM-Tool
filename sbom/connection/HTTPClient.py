import requests
import random

# List of proxies to rotate through
proxies = [
    {"http": "http://proxy1:8080"},
    {"http": "http://proxy2:8080"},
    {"http": "http://proxy3:8080"}
]

# List of user agents to rotate through
user_agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"
]

# Set the timeout for connecting and reading
timeout = 5

# Choose a random proxy and user agent
proxy = random.choice(proxies)
user_agent = random.choice(user_agents)

# Set the headers for the request
headers = {
    "User-Agent": user_agent
}

# Make the request to LinkedIn
try:
    response = requests.get("https://www.***.com/", proxies=proxy, headers=headers, timeout=timeout)
    response.raise_for_status()
    print(response.text)
except requests.exceptions.RequestException as e:
    print(e)
