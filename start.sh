mkdir -p downloads
sed -i "s/SECRET/$ARIA2C_SECRET/" aria2c.conf
aria2c --conf-path=aria2c.conf
yarn start

if [[ -z "$RCLONE_CONFIG" && -z "$RCLONE_MOUNT_PATH" ]]; then
	echo -e "[DRIVE]\n$RCLONE_CONFIG" > rclone.conf
	rclone mount "DRIVE:$RCLONE_MOUNT_PATH" downloads --vfs-cache-mode writes
fi
