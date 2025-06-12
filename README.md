# OpenAPI Backend for providing ICAR ADE compliant cattle data

This is an [OpenAPI Backend Express server](https://www.npmjs.com/package/openapi-backend) that serves cattle data in [ICAR Animal Data Exchange JSON Standard format](https://github.com/adewg/ICAR) v1.4. This repository contributes to the development of the Digital Product Passport of cattle in the Digi4Live project.

Currently, only one endpoint is implemented, ```/locations/{location-scheme}/{location-id}/milking-visits``` from the ICAR ADE milk URL scheme. Additionally, a demo database prepopulated with relevant, real cattle data is provided.

## Getting started

### 1. Install dependencies 
```bash
npm install
```

### 2. Run server
You can use the scripts defined in package.json to run the backend server only.

```bash
npm run build
npm run start
```

Or use Docker compose to start both the backend server and a generated mockup milking system database.
```bash
npm run build
docker compose build
docker compose up
```

### 3. Make data requests using browser
See all OpenAPI endpoints in ```http://localhost:9000/api-docs/```.

Or query a single endpoint, e.g. ```http://localhost:9000/locations/fi.farmid/example farm/milking-visits```.


# Where the magic happens

Operation handlers in ```src/paths``` take care of serving the server's endpoints. There's one operation handler for each endpoint. They manage the task of querying the requested farm's database for the requested data, receiving the database response and converting it to ICAR ADE JSON Standard format.

For example, ```stc/paths/get-milking-visits.ts``` converts an array of records like this:
```ts
// A milking visit record received from database
// in format specified in milkDBrecord.d.ts
{
  totalitems: 4887,
  'quartermilkings.RR.icarquartercharacteristics.BLOOD.value': 'false',
  'quartermilkings.LR.icarquartercharacteristics.BLOOD.value': 'false',
  'quartermilkings.RF.icarquartercharacteristics.BLOOD.value': 'false',
  'quartermilkings.LF.icarquartercharacteristics.BLOOD.value': 'false',
  'quartermilkings.RR.icarquartercharacteristics.AVGCOND.value': 4.11899995803833,
  'quartermilkings.LR.icarquartercharacteristics.AVGCOND.value': 4.053999900817871,
  'quartermilkings.RF.icarquartercharacteristics.AVGCOND.value': 4.138000011444092,
  'quartermilkings.LF.icarquartercharacteristics.AVGCOND.value': 4.169000148773193,
  'quartermilkings.RR.quartermilkingweight.value': 2.6700000762939453,
  'quartermilkings.LR.quartermilkingweight.value': 2.7100000381469727,
  'quartermilkings.RF.quartermilkingweight.value': 2.549999952316284,
  'quartermilkings.LF.quartermilkingweight.value': 2.5399999618530273,
  'milkingremarks.milkingincomplete': 'false',
  'milkcharacteristics.characteristic.BLOOD.value': 'false',
  'milkcharacteristics.characteristic.AVGCOND.value': 4118,
  'milkcharacteristics.characteristic.SCC.value': 180,
  'animalmilkingsample.validsamplefillingindicator': 0,
  'animalmilkingsample.bottleidentifier': null,
  'animalmilkingsample.bottleposition': null,
  'animalmilkingsample.racknumber': null,
  'animalMilkingSample.bottleIdentifierType': '??',
  milkingdeviceid: 15,
  milkingcomplete: 'true',
  'milkingmilkweight.value': 10.470000267028809,
  milkingtype: 'Automated',
  'milkingvisitduration.value': null,
  'milkingduration.value': 197,
  milkingstartingdatetime: 2022-12-03T02:31:34.000Z,
  'animal.id': 'FI000013587939',
  eventdatetime: 2022-12-03T02:39:54.717Z,
  id: 54198
}
```

into an ICAR ADE v1.4 compliant json response:
```ts
// ICAR ADE JSON Standard format
// specified in ICAR-ADE-1/url-schemes/milkURLScheme.json
{
  view: {
    totalItems: 4887,
    totalPages: 98,
    pageSize: 50,
    first: '/locations/fi.farmid/example%20farm/milking-visits?currentPage=0&pageSize=50',
    next: '/locations/fi.farmid/example%20farm/milking-visits?currentPage=1&pageSize=50',
    last: '/locations/fi.farmid/example%20farm/milking-visits?currentPage=97&pageSize=50'
  },
  member: [
    {
      resourceType: '??',
      meta: { source: 'localhost' },
      location: { id: 'example farm', scheme: 'fi.farmid' },
      id: 54198,
      animal: { id: 'FI000013587939', scheme: undefined },
      milkingDuration: { value: 197 },
      milkingType: 'Automated',
      milkingMilkWeight: { unitCode: 'KGM', value: 10.470000267028809 },
      milkingComplete: true,
      milkingDeviceId: 15,
      quarterMilkings: [
        {
          icarQuarterId: 'LF',
          quarterMilkingWeight: { unitCode: 'KGM', value: 2.5399999618530273 },
          icarQuarterCharacteristics: [
            { characteristic: 'BLOOD', value: 'false' },
            { characteristic: 'AVGCOND', value: 4.169000148773193, unit: 'mS/cm' }
          ]
        },
        {
          icarQuarterId: 'RF',
          quarterMilkingWeight: { unitCode: 'KGM', value: 2.549999952316284 },
          icarQuarterCharacteristics: [
            { characteristic: 'BLOOD', value: 'false' },
            { characteristic: 'AVGCOND', value: 4.138000011444092, unit: 'mS/cm' }
          ]
        },
        {
          icarQuarterId: 'LR',
          quarterMilkingWeight: { unitCode: 'KGM', value: 2.7100000381469727 },
          icarQuarterCharacteristics: [
            { characteristic: 'BLOOD', value: 'false' },
            { characteristic: 'AVGCOND', value: 4.053999900817871, unit: 'mS/cm' }
          ]
        },
        {
          icarQuarterId: 'RR',
          quarterMilkingWeight: { unitCode: 'KGM', value: 2.6700000762939453 },
          icarQuarterCharacteristics: [
            { characteristic: 'BLOOD', value: 'false' },
            { characteristic: 'AVGCOND', value: 4.11899995803833, unit: 'mS/cm' }
          ]
        }
      ],
      milkCharacteristics: [
        { characteristic: 'SCC', value: 180, unit: 'x1000 cells/ml' },
        { characteristic: 'BLOOD', value: 'false' },
        { characteristic: 'AVGCOND', value: 4118, unit: 'mS/cm' }
      ]
    },
    {
      ...
    }
  ]
}
```

# Development

## Add more cattle farms and databases
In file ```./config/locations.yaml```, define cattle farms and databases that can be queried.

## Add more database types
When adding new database types in ```./config/locations.yaml```, the backend server needs to know how this database type should be queried. Use ```./config/sqlQueries.yaml``` to specify the corresponding database client and SQL queries for each (implemented) operation id listed in the URL scheme.

Make sure that each SQL query result contains specified keys and values. For example, ```get-milking-visits``` operation handler expects records of type ```src/types/milkDBrecord.d.ts```.

When introducing a new database client to ```./config/sqlQueries.yaml```, update also the operation handler correspondingly to convert the new query result into the appropriate type. See e.g. ```src/paths/get-milking-visits.ts: getMilkingVisits()```.

## Change to another URL scheme
If you want to change to another URL scheme and develop endpoints for it, first generate TypeScript types based on the selected scheme. For example, ```./src/types/milkURLScheme.d.ts``` file was created by running:

```bash
openapi typegen ./ICAR-ADE-1/url-schemes/milkURLScheme.json --validate --dereference --backend > ./types/milkURLScheme.d.ts

# If command 'openapi' not found, run
npm install -g openapicmd
```

Also, replace ```URL_SCHEME_FILEPATH``` with the selected URL scheme in ```.env```.

Develop operation handlers for endpoints declared in the selected URL scheme, and register them to the OpenAPIBackend in ```src/index.ts```.

## Tip 1: When changes seem to have no effect

Backend server: Remember to build before running:
```bash
npm run build
docker compose build
docker compose up
```

Postgres server: Recreate and populate the database:
```bash
docker compose down postgres
docker compose build postgres
docker compose up
```

If these measures are not helpful, sometimes it's good to start from scratch by clearing Docker cache and rebuilding the image and container.
```bash
docker ps -a
# Identify the container that needs to be deleted
docker container rm <CONTAINER ID>

docker image list
# Identify the image that needs to be deleted
docker image rm <IMAGE ID>

docker image prune
docker volume prune
docker builder prune

npm run build
docker compose build
docker compose up
```

## Tip 2: Error message "Address already in use"
When postgres container fails to bind IPv4 address "0.0.0.0" because it's already in use:
```bash
# Check which process is using the same port
sudo ss -lptn 'sport = :5432'
# Kill it
sudo kill <pid>
```