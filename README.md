
# Beeptalk Widget

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/) 
[![GitHub release](https://img.shields.io/badge/release-v0.0.1-orange)](https://github.com/beeptalk-app/chat-embedder/releases)


Official [Beeptalk](https://beeptalk.app) chat widget.


### Deployment

To include Beeptalk widget on your page, you need to include this script at the end of your `<body>`:

```html
<script src="https://cdn.jsdelivr.net/gh/beeptalk-app/widget@0.0.4/index.js"></script>
<script type="text/javascript">beeptalkInit();</script>
```


### Options documentation

You can pass options to beeptalkInit() function to use some extra features:

```js
  beeptalkInit({
    uuid
    path
    agent
  });
```

| Parameter | Type     | Required      | Description                |
| :-------- | :------- | :------------ | :------------------------- |
| `uuid` | `string` | No |  User unique id |
| `path` | `string` | No |  The path of the page (without the base url), eg. "/home" |
| `agent` | `SHA1 hash` | No |  The path of the page (without the base url), eg. "/home" |


