# Use docker to deploy on your machine

1. Rename `.env.template` to `.env`, and fill the necessary fields.
2. Edit `docker-compose.yml`, where you can change exposed port (Default 80).
3. Go to project root, then run `docker-compose -d -f docker\docker-compose.yml up`.
4. Go to http://localhost:PORT/ , and try access AriaNg panel.
5. If that failed, go to AriaNg settings, and change the port.
