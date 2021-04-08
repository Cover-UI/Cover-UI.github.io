---
layout: post
title: JQuery Menu is released!
thumbnail: https://cover.js.org/images/JQuery-menu-thumbnail.png
---

JQuery Menu is a JQuery Plugin to create a mobile-first responsive menu.

## CDN

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Cover-UI/jquery-menu@main/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/Cover-UI/jquery-menu@main/app.js"></script>
```

## Usage

```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Cover-UI/jquery-menu@main/dist/style.min.css">
<script src="https://cdn.jsdelivr.net/gh/Cover-UI/jquery-menu@main/app.js"></script>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">

<header>
    <nav class="sd-nav-menu">
        <div class="sd-menu-header">
            <div class="sd-desktop-menu">
    
            </div>
            <button class="sd-menu-toggle">
                <i class="material-icons">menu</i>
            </button>
        </div>
        <div class="sd-mobile-menu">
        </div>
    </nav>
</header>



<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script>
    let list = [
        {
            title: "Home",
            url: "/"
        },
        {
            title: "About",
            url: "/about"
        },
        {
            title: "Projects",
            url: "/projects"
        },
        {
            title: "_Themes",
            url: "/themes"
        },
        {
            title: "__Blogger",
            url: "/blogger"
        },
        {
            title: "__Blogger",
            url: "/blogger"
        },
        {
            title: "_Templates",
            url: "/templates"
        },
        {
            title: "Contact",
            url: "/contact"
        }
    ];
    jQuery(document).ready(function(){
      let $ = jQuery;
      $(".sd-desktop-menu").addMenu(list);
      $(".sd-mobile-menu").addMenu(list);
      $().mobileMenuInit();
    });
</script>
```
