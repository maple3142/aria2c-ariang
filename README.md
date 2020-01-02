# Heroku aria2c

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Optionally sync downloaded file to your cloud drive with Rclone

1. Setup Rclone by following offical instructions: https://rclone.org/docs/
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
4. Replace all linebreaks with `\n`
5. Deploy with the button above, and paste that text in `RCLONE_CONFIG`
6. Set `RCLONE_DESTINATION` to a path you want to store your downloaded files.
