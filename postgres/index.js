const express = require('express')
const app = express()
const port = 3000
const pg = require('pg')

const username = 'postgres';
const host = process.env.DBHOST;
const database = process.env.DATABASE || 'postgres';
const password = process.env.PASSWORD || 'Password.123!';
const dbport = process.env.DBPORT || 5432;

const conString = `postgres://${username}:${password}@${host}:${dbport}/${database}`;

console.log({username, host, database, password, dbport, conString})

const client = new pg.Client(conString);
client.connect(function(err) {
  if (err){
    console.log("Error connecting to PG client", err);
    process.exit(1)
  };
});
// console.log("\nClient connection test passed!");
client.end()

app.get('/', async (req, res) => {
  try {
        const client = new pg.Client(conString);
        client.connect(function(err) {
          if (err)throw err;
        });
        console.log("Connected!");
        // data = await client.query("SELECT 'RESPONSE FROM POSTGRES' AS value")
        data = await client.query("SELECT datname FROM pg_database")
        console.log('DATA:', data.rows)
        res.send(data.rows)
        res.end()
        client.end()
    } catch (err) {
        console.log(err)
        res.end("NOT FROM POSTGRES")
        process.exit(1)
    }
})
app.listen(port, () => {
    console.log(`\nExample app listening on port ${port}`)
})

/*
docker run -e DBHOST=10.113.5.193 -p 3000:3000 --name=best-app --rm -td manavrajvanshinx/best-app
docker build -t manavrajvanshinx/best-app .
docker push manavrajvanshinx/best-app


kubectl port-forward pod/best-app 3000:3000
kubectl exec -i -t best-app --container best-app -- /bin/bash
kubectl logs best-app -c init-db

kubectl apply -f pod.yml
kubectl apply -f svc.yml
kubectl apply -f ep.yml
kubectl delete -f ep.yml
kubectl delete -f pod.yml
kubectl delete -f svc.yml
*/