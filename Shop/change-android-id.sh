oldid=$1
newid=$2
javadir="android/app/src/main/java"
newdir=$javadir;
olddir=$javadir
while IFS='.' read -ra folder; do
      for i in "${folder[@]}"; do
          echo $i;
          olddir="$olddir/$i"
      done
 done <<< "$oldid"

while IFS='.' read -ra folder; do
      for i in "${folder[@]}"; do
          echo $i;
          newdir="$newdir/$i"
          mkdir $newdir
      done
 done <<< "$newid"
 rm -r $newdir
 echo "cava"
echo "$olddir to $newdir"
echo "cavile?"
./findreplace.sh $oldid $newid 
 mv $olddir $newdir
 