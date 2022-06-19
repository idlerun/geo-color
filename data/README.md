exported from http://download.geonames.org/export/zip/
US.zip

Extracted fields of interest

```
cat US.txt| sed -e "s/\t/,/g"  | cut -d"," -f2,3,5,6,10,11 | grep -v "APO " | grep -v "FPO " > us.csv
```

Converted to JSON

```
ts-node generate.ts > ../src/geo/county-geo.json
```
