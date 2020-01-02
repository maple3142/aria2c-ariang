#!/bin/bash
mkdir -p downloads

if [[ -n $RCLONE_CONFIG && -n $RCLONE_DESTINATION ]]; then
	echo "Rclone config detected"
	echo -e "[DRIVE]\n$RCLONE_CONFIG" > rclone.conf
	echo "on-download-complete=./on-complete.sh" >> aria2c.conf
	chmod +x on-complete.sh
fi

sed -i "s/SECRET/$ARIA2C_SECRET/" aria2c.conf
aria2c --conf-path=aria2c.conf&
yarn start
