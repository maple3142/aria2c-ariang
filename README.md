# Heroku aria2c

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

> Do not overuse it, or your account might be banned by Heroku.

## Optionally sync downloaded file to your cloud drive with Rclone

1. Setup Rclone locally by following offical instructions: https://rclone.org/docs/
2. Find your `rclone.conf` file, it should look like this:

```conf
[private]
type = drive
client_id = 563697918299-ofs4hlmn0u7pr724rmkjtvdq30pjt252.apps.googleusercontent.com
client_secret = M7Z9V9WRF3LuzKaATCdCb3Oc
scope = drive
token = {"access_token":"ya29.a0AfH6SMAFnRhDXQsYoWr7KJVSgql6kVDJGv5puS_F3ENyHJpolQI9OG-pczSfVIfLsVeNiioGruvQdYZA4Cr7KGeK_BlD9veUgfoa9WRdSp0VG_7HJK7v_1FSTTyuud8qTeRORgLNGfxyYtXTw_Yb53EoIH9e6fm-duk","token_type":"Bearer","refresh_token":"1//0gM3912wVqAzWCgYIARAAGBASNwF-L9Irwc6VrynocRSEJjbK0sluVIhHBLxRYtcpygnV3w7zaBPe3CSUKeqHw_Q1yUQfG8YAZm8","expiry":"2020-06-02T00:02:38.8106032+05:30"}

others entries...
```

3. Find the drive you want to use, and copy its `type = ...` to  `... token = ...` section.
4. Replace all linebreaks with `\n`
5. Deploy with the button above, and paste that text in `RCLONE_CONFIG`
6. Set `download` to a path you want to store your downloaded files.

## FAQ

### It automatically stop after 30 minutes, and files were lost.

It is because Heroku's free dyno will idle when there is no incoming request within 30 minutes, and your files will be deleted too, this is why you might want to use Rclone.

### Can I delete files?

No. Just wait for its idling, and your files will be deleted.

### You said it will idle automatically, so I can't download large files?

It will generate fake requests when there are downloading or uploading tasks, so it won't idle when your files aren't completed.

### I don't know how to setup Rclone, can you help me?

No. I thought the instructions above are enough.
