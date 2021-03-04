---
title : Vue Bootstrap List Group
layout: post
thumbnail: https://via.placeholder.com/150.png?text=Component
---

## Example

```html
<b-list-group action flush>
    <b-list-item active>list item</b-list-item>
    <b-list-item variant="danger">list item</b-list-item>
    <b-list-item>list item</b-list-item>
    <b-list-item>list item</b-list-item>
    <b-list-item disabled>list item</b-list-item>
</b-list-group>
``` 

## Components 
### b-list-group
Container of the list group
#### props
* flush : "list-group-flush".
* action : createa div container element instead of ul.
### b-list-item
#### props
* disabled
* active
* variant
* href : for action a element
