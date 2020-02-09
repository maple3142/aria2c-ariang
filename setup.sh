#!/bin/bash

# Install rclone static binary
wget -q https://downloads.rclone.org/v1.51.0/rclone-v1.51.0-linux-amd64.zip
unzip -q rclone-v1.51.0-linux-amd64.zip
export PATH=$PWD/rclone-v1.51.0-linux-amd64:$PATH

# Install aria2c static binary
wget -q https://github.com/q3aql/aria2-static-builds/releases/download/v1.35.0/aria2-1.35.0-linux-gnu-64bit-build1.tar.bz2
tar xf aria2-1.35.0-linux-gnu-64bit-build1.tar.bz2
export PATH=$PWD/aria2-1.35.0-linux-gnu-64bit-build1:$PATH

# Create download folder
mkdir -p downloads

# Download P3TERX/aria2.conf
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/aria2.conf
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/autoupload.sh
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/delete.aria2.sh
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/delete.sh
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/dht.dat
curl -fsSLO https://raw.githubusercontent.com/P3TERX/aria2.conf/master/dht6.dat
touch aria2.session

# Tracker
curl -fsSL git.io/tracker.sh | bash
