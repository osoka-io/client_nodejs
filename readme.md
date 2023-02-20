# Osoka.io API client

Osoka.io is the universal UGC-video factory that's provide simple widgets that collects and 
sort customers voices for your own application.

## Quick start

Install library by your favorite package manager
```shell
npm install @osoka.io/client
```
or by yarn 
```shell
yarn add @osoka.io/client
```

Client is implemented by repository pattern. You must create Client instance that will generate all necessary auth tokens for you.

```typescript
const client = new OsokaClient(clientId, secret);
```
You can find your clientId at [the profile page](https://app.osoka.io/manage/profile). Secrets can be managed at [the api secrets page](https://app.osoka.io/manage/profile/secrets).

We are highly recommend not to store any secrets in your source code.

To manage any entity in the Osoka.io API use simple CRUD controllers which represent that entity.

```typescript
const widgetController = new WidgetController(client);

const widgetList = await widgetController.list(); // request first 20 widgets
```