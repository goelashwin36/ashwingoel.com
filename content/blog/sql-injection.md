---
date: "2019-06-10T00:00:00+00:00"
publishdate: "2019-06-10+08:00"
lastmod: "2019-06-10+08:00"
draft: false
title: "A Beginner’s Guide to SQL Injection"
tags: ["Sql", "Security", "Sql Injection"]
# series: ["SQL Injection"]
categories: ["SQL Injection"]
img: "images/blog/sql-injection/Ashwin-Goel-Sql-Injection.jpeg"
toc: true
summary: "SQL injection is a web security vulnerability which allows an attacker to alter the SQL queries made to the database. This may lead to disclosure of sensitive datas to the attacker."
---

# SQL INJECTION

SQL injection is a web security vulnerability which allows an attacker to alter the SQL queries made to the database. This can be used to retrieve some sensitive information like database structure, tables, columns and their underlying data.

**_For Example:_**

Suppose an application uses the following query to fetch the login details of a person:

```mysql
SELECT USERNAME,PASSWORD from USERS where USERNAME='<username>' AND PASSWORD='<password>';
```

Here `username` and `password` is the input provided by the user.
Suppose an attacker gives the input as ```' OR '1'='1``` in both the fields.
Therefore, the SQL query will look like:

```mysql
SELECT USERNAME,PASSWORD from USERS where USERNAME='' OR '1'='1' AND PASSWORD='' OR '1'='1';
```

This query results in a true statement thus, the user gets logged in. This example depicts the most basic type of SQL injection.

SQL injection can be used anywhere to fetch any sensitive information from the Database.

Note: This was the most basic example and meant only for understanding purposes. You'll mostly not find any such cases in the real world.

You can use this cheat sheet to see how to make queries over different SQL database providers.
[SQL Injection Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

## How to detect the presence of SQL Injection?

In most of the cases SQL Injection can be detected easily by providing invalid parameters like `'`, `''` `a' or 1=1--`, `"a"" or 1=1--"`, ` or a = a`, `a' waitfor delay '0:0:10'--`, `1 waitfor delay '0:0:10'--`, `%26`, `' or username like '%` etc. and observe the changes in the behaviour of the application. You may try to analyse the length of the response from the server and also the time it takes to send the response. Payloads like: `'`, `a' or 1=1--` etc. might show changes in the response by the database server. But in case if there is no change we try to trigger time delays using payload like `a' waitfor delay '0:0:10'--` which might make the server delay for a specific time before sending a response.

After determining if the website is vulnerable to `SQL Injection` we can try to extract some sensitive information from the database.

Before that, we need to identify the `number of columns` the SQL Query returns. This is essential because if we try to extract unequal number of columns than what the query actually returns, then it will return an error.

We can determine the number of columns by using the `order by` command.

The `order by` command in `sql` is used to sort the fetched data in either ascending or descending order. On passing a `column number` to this command, it sorts the data based on that particular column number. Now if we provide an invalid column number then an `error` will be returned by sql. This can help us in knowing the number of columns a query returns.

**_For Example:_**

```url
www.onlineshopping.com/products.php?pid=8 order by 1 -- //
www.onlineshopping.com/products.php?pid=8 order by 2 -- //

// If the parameter is a string then you need to add a ' after it.

www.onlineshopping.com/products.php?usr=b' order by 3 -- //
www.onlineshopping.com/products.php?usr=a' order by 4 -- //
```

The significance of `-- ` is that it's a comment indicator in SQL which makes the rest of the query a comment. Now to preserve the `space` after `--` we add any character after that so that `space` doesn't get ignored in the `Http request`. We might also use `#`, `/* */` for comments depending on the SQL database provider.

Continue this process till you encounter an error. Suppose you encounter an error while using the payload `order by 5` and but not while using `order by 4` which means that the query returns `4` columns.

## How to exploit using SQL Injection

Once you know that application is vulnerable to SQL Injection and you have identified the number of columns, we try to find necessary information about the database like- `DB name`, `DB user name`, `DB version`, `table names`, `coulumn names` of the required table etc.

## Types of SQL Injection

1. **Error based**: This type of SQL Injection relies on the `error messages` being thrown by the database server which might provide us some useful information regarding the database structure.
2. **Union based**: This techique uses the SQL `UNION` operator to combine the results of two `SELECT` queries and return a single table. It allows an attacker to extract information from other tables by appending the results to the original query made to the database.
3. **Blind Injection**: It happens when the application is vulnerable to `SQL Injection` but the results of the `SQL query` are not returned in the `HTTP response`. In this case we query the database for any true/false statement and see the changes for both true and false condition. It is of two types:
   1. **Content-based**: In this technique the database server is queried with any conditional statement and the `response` from the server is analysed for any difference while sending a `true` condition and a `false` condition.
   2. **Time-based**: This technique relies on injecting an SQL Query that makes the database wait for a specific time based on the specified condition. The time taken by the server to send back a response determines if the query is true/false.
4. **Out-of-band Injection**(uncommon): This is not a very common type of `SQL Injection` as it depends on the features being enabled on the database server. It relies on the database server's capability to make a web request like `HTTP`, `DNS`, `ftp` to send data to the attacker.

## Resources

1. 'SQL Map' is an open source tool which `automates` the process of `detecting` and `exploiting` SQL Injection Vulnerabilities.
   [SQLmap](http://sqlmap.org/)

2. This repository has got some cool resources on `SQL Injection`. There are some cheat sheets and a lot of useful payloads which can be used depending on the use case.
   [SQL Resources](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)

We shall see in depth about the exploitation part and types of SQL Injection in the next Blog.
