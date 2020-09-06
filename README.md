# Heroku aria2c

## Deploying

### Requirement

* [Docker](https://www.docker.com/)
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
* [git](https://git-scm.com/)
* Ability to use terminal

### Steps

1. Run `heroku login` to login, then `heroku container:login` too.
2. Clone this repository and enter it. (PS: Please run `git config --global core.autocrlf false` before `git clone` if you are using Windows.)
3. Run `heroku apps:create APP_NAME` to create it.
4. Run `heroku config:set -a APP_NAME ARIA2C_SECRET=ARIA2_SECRET` and `heroku config:set -a APP_NAME HEROKU_APP_NAME=APP_NAME`.
5. Run `heroku container:push web -a APP_NAME` and `heroku container:release web -a APP_NAME`.
6. Run `heroku open -a APP_NAME` and it will open your browser to deployed instance. 

### Optional: Sync downloaded file to your cloud drive using Rclone

1. Setup Rclone locally by following offical instructions: https://rclone.org/docs/
2. Find your `rclone.conf` file, it should look like this:

```conf
[DRIVENAME]
type = WHATEVER
client_id = WHATEVER
client_secret = WHATEVER
scope = WHATEVER
token = WHATEVER

others entries...
```

3. Find the drive you want to use, and copy its `type = ...` to  `... token = ...` section.
4. Replace all linebreaks with `\n`.
5. Run `heroku config:set -a APP_NAME RCLONE_CONFIG=THAT_TEXT`.
6. Run `heroku config:set -a APP_NAME RCLONE_DESTINATION=DOWNLOAD_DESTINATION`, `DOWNLOAD_DESTINATION` is a path starting with `/`.

## FAQ

### It automatically stop after 30 minutes, and files were lost.

It is because Heroku's free dyno will idle when there is no incoming request within 30 minutes, and your files will be deleted too, this is why you might want to use Rclone.

### Can I delete files?

No. Just wait for its idling, and your files will be deleted.

### You said it will idle automatically, so I can't download large files?

It will generate fake requests when there are downloading or uploading tasks, so it won't idle when your files aren't completed.
