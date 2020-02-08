FROM node:12-buster

WORKDIR /root

COPY . .

RUN bash setup.sh

ENV PATH="/root/rclone-v1.51.0-linux-amd64:$PATH"

ENV PATH="/root/aria2-1.35.0-linux-gnu-64bit-build1:$PATH"

CMD bash /root/start.sh
