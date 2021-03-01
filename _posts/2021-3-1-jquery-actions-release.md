---
layout: post
title: jQuery Actions is released!
thumbnail: https://jquery.com/jquery-wp-content/themes/jquery/images/logo-jquery.png
excerpt_separator: <!--more-->
---

**jQuery Actions** plugin is a **jQuery** plugin for adding action and listeners of this actions on **jQuery**. You can use that for creating callback chain or ordered tasks.

## Installation
```html
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/Cover-UI/jquery-actions@main/app.js"></script>
```


## Usage Example
```html
    <!-- index.html -->
    <div class="app"></div>
```
```js
    // app.js

    $().addAction("rates",function(t,r){
        return r.rates.TRY;
    });

    $().onActionBefore("rates",async function(t){
        var api = false;

        await fetch("https://api.exchangeratesapi.io/latest").then(x => x.json()).then(a => {api = a});
        return api
    });

    $().onActionAfter("rates",function(t,r){
        t.text(r);
    });

    $(".app").doAction("rates");
```

## Functions
### `addAction`
Registers an action with callback. 
```js
    $().addAction("action_name",callback);
```

### `doAction`
Runs an action with before, during and after callbacks. 
```js
    $().doAction("action_name");
```

### `onActionBefore`
Registers before callback of an action.
```js
    $().onActionBefore("action_name",callback);
```

### `onActionAfter`
Registers after callback of an action.
```js
    $().onActionAfter("action_name",callback);
```

### `isAction`
Check an action is registered or not.
```js
    $().isAction("action_name");
```
