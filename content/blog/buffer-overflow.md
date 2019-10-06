---
date: "2019-07-22T00:00:00+00:00"
publishdate: "2019-07-22+08:00"
lastmod: "2019-07-22+08:00"
draft: false
title: "Buffer Overflow"
tags: ["Buffer", "security", "Buffer Overflow"]
categories: ["Buffer Overflow"]
img: "images/blog/buffer-overflow/Ashwin-Goel-b0.png"
toc: true
summary: "Buffer Overflow occurs when more data is written to a specific length of memory such that adjacent memory addresses are overwritten."
---

## Buffer

A `Buffer` is temporary storage usually present in the physical memory used to hold data.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b1.png" style=" max-height: 500px;">

Consider the most useless program ever made shown on the left image where a character buffer of length 5 is defined. In a big cluster of memory, a small memory of 5 bytes would be assigned to the buffer which looks like the image on the right.

## Buffer Overflow

A `Buffer Overflow` occurs when more data is written to a specific length of memory such that adjacent memory addresses are overwritten.

**_DEMO(Controlling Local Variables):_**

Let's take an example of a basic authentication app which asks for a password and returns `Authenticated!` if the password is correct.

Without really knowing how the app works, let's enter a random password.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b2-1.png" style=" max-height: 500px;  ">

It says `Authentical Declined` since the password wasn't correct. To test `buffer overflow`, we need to enter large random data.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b2-2.png" style=" max-height: 500px;  ">

You must be wondering why it got authenticated and why there is a `Segmentation Fault!`. Let's see a more detailed version of the app.
<img src="/images/blog/buffer-overflow/Ashwin-Goel-b3-1.png" style=" max-height: 500px;">

As you can see, there are three variables: `auth`, `sys_pass`, and `usr_pass`.
The `auth` variable determines if the user is authenticated or not depending on the value(initially 0). The `usr_pass` stores the password that the user enters and the `sys_pass` variable is what the correct password is.

How the app works is if the  `usr_pass` variable is equal to `sys_pass` then the `auth` variable becomes `1`. If the `auth` variable is not `0`, then the user is authenticated.

You may also see how the variables are stored in memory. Since the address is in `hexadecimal` and there is a difference of 1 therefore, `usr_pass` and `sys_pass` variables are buffers of length 16.

To test for Buffer Overflow, a long password is entered as shown.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b3-2.png" style=" max-height: 500px;">

As you can see the password entered in `usr_pass` variable overflows the `sys_pass` variable and then the `auth` variable.

***Note***: C functions like `strcpy()`, `strcmp()`, `strcat()` do not check the length of the variable and can overwrite later memory addresses which is what precisely buffer overflow is.

Refer to the code below for better understanding.

```cpp
#include <stdio.h>

int main(void) {

    int auth = 0;
    char sys_pass[16] = "Secret";
    char usr_pass[16];

    printf("Enter password: ");
    scanf("%s", usr_pass);

    if (strcmp(sys_pass, usr_pass) == 0) {
        authorized = 1;
    }

    printf("usr_pass: %s\n", usr_pass);
    printf("sys_pass: %s\n", sys_pass);
    printf("auth: %d\n", authorized);
    printf("sys_pass   addr: %p\n", (void *)sys_pass);
    printf("auth       addr: %p\n", (void *)&authorized);

    if (auth) {
        printf("Authenticated!\n");
    }
    else{
        printf("Authentication declined!\n");
        }
}

```

***Note***: This might be the most unrealistic example and only meant for understanding purposes. You may not see such situations in real life.

Let's dive a little deeper into the concepts now.

## Important Concepts

### Division of Memory for a Running Process

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b4.png" style=" max-height: 500px;">
Source: [Link](https://kotharitechnotrick.wordpress.com/2013/12/26/memory-mapping-in-c/)

This is how the `memory` assigned to a `process` looks like. There are various sections like `stack`, `heap`, `Uninitialized data` etc. used for different purposes.

You may read more about the memory layout here: [Memory Layout of a Process.](https://www.thegeekstuff.com/2012/03/linux-processes-memory-layout/)

This blog focuses on `Buffer Overflow` in `Stack` so let's look at that.

1. **Stack**: A LIFO data structure extensively used by computers in Memory management etc.
2. There are a bunch of registers present in the memory amongst which we shall only be concerned about EIP, EBP, ESP.
3. **EBP**: It's a stack pointer which points to the base of the stack.
4. **ESP**: It's a stack pointer which points to the top of the stack.
<img src="/images/blog/buffer-overflow/Ashwin-Goel-b5.png" style=" max-height: 500px;">
5. **EIP**: It contains the address of the next instruction to be executed.
<img src="/images/blog/buffer-overflow/Ashwin-Goel-b6.png" style=" max-height: 500px;">

### Stack Layout

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b7.png" style=" max-height: 500px;">

The above image shows how a `stack` looks like. It might look intimidating but trust me, it isn't. Let's see some important points related to the stack

- A stack is filled from higher memory to lower memory.
- In a stack, all the variables are accessed relative to the EBP.
- In a program, every function has its own stack.
- Everything is referenced from the EBP register.
   <img src="/images/blog/buffer-overflow/Ashwin-Goel-b8.png" style=" max-height: 500px;"> Source: [Link](https://itandsecuritystuffs.wordpress.com/2014/03/18/understanding-buffer-overflows-attacks-part-1/)

- Above the EBP, `function parameters` are stored.

    _**For example:**_

   ```cpp
   void foo(int a, int b, int c){
      //Function body
   }
   ```
   Here `a`,`b` and `c` being the function parameters are stored above the EBP.

- All the `local variables` of a function are stored below the EBP.
- The `Old %ebp` is the value of the EBP of the previous function. Since after a function is executed, it has to return back to an older function; therefore, we need to store the values of both old EBP and EIP.
- ESP register stores address of the bottom of the stack.

    _**For example:**_

   ```cpp
   void foo(int a, int b, int c){
       int x;
       int y;
       int z;
   }
   ```

   Here `x`,`y`,`z` being local variables to the function are stored below the EBP.

## Exploiting Buffer Overflow

It's time to get into Buffer Overflow exploitation using stack.

Before that, let's try to understand how a stack is built for any function.

Taking an example below:

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b9.png" style=" max-height: 500px;">

The `stack` on the right is of the `function foo` as seen on the left image.

- Since `a`,`b` and `c` are `parameters` passed to the function, therefore, it is stored above the EBP. Also because the stack is filled from higher to lower memory and parameters are read from right to left, therefore, `c` is written first in the memory followed by `b` and `a`.
- `x`,`y` and `z` being the local variables are stored below the EBP.
- It is also required to store the `Old EIP` and `Old EBP` of the `function main` in the stack to know where to return after the function executes.

Now, as shown in the `previous demo`, you could see how Buffer Overflow took place using the local variables.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b10.png" style=" max-height: 500px;">
Source: [Link](https://www.securitysift.com/windows-exploit-development-part-2-intro-stack-overflow/)

Imagine a situation where you `overflow` the variables `x`,`y` and `z` in such a way that Old EIP is modified and stores the address of the memory where the `malicious code` is placed.

Refer to the below image for better understanding.

<img src="/images/blog/buffer-overflow/Ashwin-Goel-b11.png" style=" max-height: 500px;">

Assume a `buffer` of length 500 defined in a function. Now it is overflowed in such a way that it has some `random data`, followed by the `shellcode`(malicious code) and then the `Return address` which points to the shellcode.

So after the function gets executed, the instruction pointed by the `Return address` gets executed and this is how our shellcode gets executed.

This is pretty much how Buffer Overflow happens.

You must watch this video [Buffer Overflow Attack - Computerphile](https://www.youtube.com/watch?v=1S0aBV-Waeo) to get a more realistic idea of Buffer Overflow.
The `codes` used in the above video are present [here](https://gist.github.com/apolloclark/6cffb33f179cc9162d0a).

## Security Measures

- Use programming languages like Python, Java, Ruby in which `Dynamic Memory Allocation` takes place and, the language itself manages the memory for you.
- In languages like C, C++ before writing data to a buffer perform all the relevant checks and `input validation`.
- Before using any `external libraries`, check for `security vulnerabilities` in it.
- Use `source code analysis tools` for static analysis against vulnerabilities.
- Use `Non-executable Stack`: It means that even if a machine code is injected in the stack, it cannot be executed since that particular region of memory is non-executable. It is done by setting up `NX` bit.

***Note***: Even after these measures are taken it might be possible to exploit Buffer Overflow. Therefore, these are just layers of security which can help to prevent exploitation of Buffer Overflow.

## References

- [Smashing The Stack For Fun And Profit](https://insecure.org/stf/smashstack.html)
- [Buffer Overflow Exploits and Countermeasures](http://homes.sice.indiana.edu/yh33/Teaching/I433-2016/lec11-more-bo.pdf)
- [Buffer-Overflow Vulnerabilities and Attacks](http://www.cis.syr.edu/~wedu/Teaching/IntrCompSec/LectureNotes_New/Buffer_Overflow.pdf)

## Acknowledgement

This blog is based upon a [talk](https://null.co.in/events/603-bangalore-null-bangalore-meet-22-june-2019-null-bangalore-meet-22-june-2019-null-owasp-g4h-combined-monthly-meet) given by me at the [null](https://null.co.in) monthly meet on `22nd June 2019`. A big thanks to [Riddhi Shree](https://null.co.in/profile/9454-riddhi-shree) for helping me out with the talk and providing me with appropriate resources. Without her that talk might have not been as good as it was.