oldtext="${1}";
newtext="${2}";
grep -rl $oldtext android --exclude-dir=.git | xargs sed -i "s/${oldtext}/${newtext}/g";