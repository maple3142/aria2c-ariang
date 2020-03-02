#!/bin/bash
filePath=$3
relativePath=${filepath#./downloads/}
topPath=./downloads/${relativePath%%/*} # It will be the path of folder when it has multiple files, otherwise it will be the same as file path.

LIGHT_GREEN_FONT_PREFIX="\033[1;32m"
FONT_COLOR_SUFFIX="\033[0m"
INFO="[${LIGHT_GREEN_FONT_PREFIX}INFO${FONT_COLOR_SUFFIX}]"

echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Download error or stop, start deleting files..."

if [ $2 -eq 0 ]; then
    exit 0
elif [ -e "${filePath}.aria2" ]; then
    rm -vf "${filePath}.aria2" "${filePath}"
elif [ -e "${topPath}.aria2" ]; then
    rm -vrf "${topPath}.aria2" "${topPath}"
fi
find "${topPath}" ! -path "${topPath}" -depth -type d -empty -exec rm -vrf {} \;

echo -e "$(date +"%m/%d %H:%M:%S") ${INFO} Download error or stop, start deleting files finish"
