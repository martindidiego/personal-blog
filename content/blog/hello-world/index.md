---
title: Test Post
date: "2019-06-01"
description: This is a test post description.
---

This is a test post.

Here's a code snippet:

```tsx
import * as React from "react"
const printName = (name: string): string => {
  // highlight-next-line
  return `Hello ${name}!`
}

const Greeting: React.FC<{name: string}> = {name} => (
  <>
    <h1>{printName(name)}</h1>
  </>
)
```
