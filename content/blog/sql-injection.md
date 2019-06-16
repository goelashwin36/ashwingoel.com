---
date: "2019-06-10T00:00:00+00:00"
publishdate: "2019-06-10+08:00"
lastmod: "2019-06-10+08:00"
draft: false
title: "SQL Injection"
tags: ["sql", "security", "sql injection"]
# series: ["SQL Injection"]
categories: ["SQL Injection"]
# img: "images/blog/sql.jpg"
img: ""
toc: true
summary: "SQL injection is a web security vulnerability which allows an attacker to alter the SQL queries made to the database. This may lead to disclosure of sensitive datas to the attacker."
---

# SQL INJECTION

SQL injection is a web security vulnerability which allows an attacker to alter the SQL queries made to the database. This may lead to disclosure of sensitive data to the attacker.

**_For Example:_**

Suppose an application uses the following query to fetch the login details of a person.

```mysql
SELECT USERNAME,PASSWORD from USERS where USERNAME='<username>' AND PASSWORD='<password>';
```

Here `username` and `password` is the input provided by the user.
Suppose an attacker gives the input as ```' OR '1'='1``` in both the fields.
Therefore, the SQL query will look like:

```mysql
SELECT USERNAME,PASSWORD from USERS where USERNAME='' OR '1'='1' AND PASSWORD='' OR '1'='1';
```

Note: This was the most basic example and meant only for understanding purposes. You'll mostly not find any such cases in the real world.

This query results in a true statement thus, the user will get logged in. This example depicts the most basic type of SQL injection.

SQL injection can be used anywhere to fetch any sensitive information from the Database.

[SQL Injection Cheat Sheet](https://portswigger.net/web-security/sql-injection/cheat-sheet)

## How to detect the presence of SQL Injection?

In most of the cases SQL Injection can be detected easily by providing invalid parameters like `'`, `''` `a' or 1=1--`, `"a"" or 1=1--"`, ` or a = a`, `a' waitfor delay '0:0:10'--`, `1 waitfor delay '0:0:10'--`, `%26`, `' or username like '%` etc. and observe the changes in the behaviour of the application. You may try to analyse the length of the response from the server and also the time it takes to send the response.

Now, we know that the website is vulnerable to SQL Injection and we need to extract sensitive information from the database.

This guy has got some really cool resources on `SQL Injection`. Do check it out.
[https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)

Before that, we need to identify the `number of columns` the SQL Query return.s This is essential because if we try to extract different number of columns then it will return an error.

We can determine the number of columns by simply using `order by` command.

**_For Example:_**

```url
www.onlineshopping.com/products.php?pid=8 order by 1 -- //
www.onlineshopping.com/products.php?pid=8 order by 2 -- //
// If the parameter is a string then you need to add a ' after it.
www.onlineshopping.com/products.php?usr=b' order by 3 -- //
www.onlineshopping.com/products.php?usr=a' order by 4 -- //
```

The significance of `-- ` is that it's a comment indicator in SQL which makes the rest of the query a comment. Now to preserve the `space` after `--` we add any character after that so that `space` doesn't get deleted in the the `Http request`.

Continue this process till error is not returned. Suppose you find an error at `5` which means that the query returns `4` columns.

## How to exploit using SQL Injection

Once you know that application is vulnerable to SQL Injection and you have identified the number of columns, we try to find basic information about the database like- `DB name`, `DB user name`, `DB version`, `table names`, `coulumn names` of the required table etc.

## Types of SQL Injection

1. Error based
2. Union based
3. Blind Injection: content-based/time-based
4. Out-of-band Injection(uncommon)

## Resources

1. This is an open source tool which `automates` the process of `detecting` and `exploiting` SQL Injection Vulnerabilities.
   [SQLmap](http://sqlmap.org/)

2. This guy has got some really cool resources on `SQL Injection`. Do check it out.
   [SQL Resources](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/SQL%20Injection)


We shall see in depth about the exploitation part and types of SQL Injection in the next Blog.
