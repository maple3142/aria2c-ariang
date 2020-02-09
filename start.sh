#!/bin/bash

if [[ -n $RCLONE_CONF && -n $RCLONE_DESTINATION ]]; then
	echo "Rclone config detected"
    mkdir -p .config/rclone
	echo -e "[DRIVE]\n$RCLONE_CONF" > .config/rclone/rclone.conf
	sed -i "/name=/c\name='DRIVE'" autoupload.sh
	sed -i "/folder=/c\folder='$RCLONE_DESTINATION'" autoupload.sh
	DOWNLOAD_COMPLETE='autoupload.sh'
fi

sed -i "/rpc-secret=/c\rpc-secret=$ARIA2C_SECRET" aria2.conf
sed -i "/downloadpath=/c\downloadpath='downloads'" ./*.sh
chmod +x ./*.sh

aria2c \
    --conf-path=aria2.conf \
    --dir=downloads \
    --rpc-listen-port=6800 \
    --listen-port=6888 \
    --dht-listen-port=6888 \
    --input-file=aria2.session \
    --save-session=aria2.session \
    --dht-file-path=dht.dat \
    --dht-file-path6=dht6.dat \
    --enable-dht6=true \
    --disable-ipv6=false \
    --on-download-stop=$PWD/delete.sh \
    --on-download-complete=$PWD/${DOWNLOAD_COMPLETE:-'delete.aria2.sh'} &

yarn start
