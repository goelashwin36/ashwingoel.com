---
date: "2019-05-25T00:00:00+00:00"
publishdate: "2019-05-25+08:00"
lastmod: "2018-08-13+08:00"
draft: true
title: "Types Of SQL Injection"
tags: ["sql", "security", "sql injection"]
# series: ["SQL Injection"]
categories: ["SQL Injection"]
# img: "images/blog/sql.jpg"
img: ""
toc: true
summary: "This blog features the different kind of SQL Injection attacks in detail."
---

### ERROR BASED SQL INJECTION

This is type of SQL Injection which depends upon the error messages thrown by the appliation.

**_For Example:_**

Assume, this links browses a product on an online shopping website: `www.onlineshopping.com/products.php?pid=8`

Now, if the url is modified to `www.onlineshopping.com/products.php?pid=8'` and it shows an error: `SQL syntax error` then we can infer that the page is connected with the database and is vulnerable to SQL Injection.

This happened because `'` helped in breaking the query and essentially lead to a syntax error.

```sql
Initial: SELECT * from PRODUCTS where PID='<pid>';
Final: SELECT * from PRODUCTS where PID=''';
```

Now, we know that the website is vulnerable to SQL Injection and we need to extract sensitive information from the database. 
Before that, we need to identify the `number of columns` the query return. This is necessary because if we try to extract different number of columns then it will return an error.

We can determine the number of columns simply using order by command.

**_For Example:_**

```url
www.onlineshopping.com/products.php?pid=8' order by 1 -- //
www.onlineshopping.com/products.php?pid=8' order by 2 -- //
www.onlineshopping.com/products.php?pid=8' order by 3 -- //
www.onlineshopping.com/products.php?pid=8' order by 4 -- //
```

The significance of `-- ` is that it's a comment indicator in SQL which makes the rest of the query a comment and it doesn't get executed. Now to preserve the `space` after `--` we add any character after that so that `space` doesn't get deleted in the the `Http request`.

Continue this process till error is not returned. Behind the scene the following query executes:

```
SELECT * from PRODUCTS where PID='1' order by <ColumnNumber> -- // '
```

If the number of columns returned are equal to `ColumnNumber` then error is not returned.

<!-- TODO: Understand this concept and explain again. -->

Now, since we have identified the number of columns, we are good to go.
