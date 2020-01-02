#!/bin/bash
mkdir -p downloads

if [[ -n $RCLONE_CONFIG && -n $RCLONE_DESTINATION ]]; then
	echo "Rclone config detected"
	echo -e "[DRIVE]\n$RCLONE_CONFIG" > rclone.conf
	echo "on-download-complete=./on-complete.sh" >> aria2c.conf
	chmod +x on-complete.sh
fi

tracker_list() {
	curl -Ns https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt | awk '$1' | tr '\n' ',' | cat
}
echo "bt-tracker=$tracker_list" >> aria2c.conf
echo "rpc-secret=$ARIA2C_SECRET" >> aria2c.conf
aria2c --conf-path=aria2c.conf&
yarn start
