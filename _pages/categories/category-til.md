---
title: "TIL"
layout: archive
permalink: categories/today_i_learned
author_profile: true
sidebar_main: true
---


{% assign posts = site.categories.til %}
{% for post in posts %} {% include archive-single2.html type=page.entries_layout %} {% endfor %}