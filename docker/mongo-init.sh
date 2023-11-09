mongo <<EOF

db = db.getSiblingDB('mywcag4all')
db.createUser({
  user: '$mywcag4all2023',
  pwd: '$MYWCAG4ALL_PASSWORD',
  roles: [{ role: 'readWrite', db: 'mywcag4all' }],
});


EOF