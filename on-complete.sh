#!/bin/bash
rclone -v --config="rclone.conf" copy $3 "DRIVE:$RCLONE_DESTINATION" 2>&1
