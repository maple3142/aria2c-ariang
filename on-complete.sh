#!/bin/bash
echo "aria2 parameters: $1 $2 $3"
rclone -v --config="rclone.conf" copy downloads "DRIVE:$RCLONE_DESTINATION" --exclude="*.aria2" 2>&1
